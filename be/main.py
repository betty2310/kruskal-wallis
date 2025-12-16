from fastapi import FastAPI
from pydantic import BaseModel
from scipy import stats
from scipy.stats import chi2, rankdata
import numpy as np
from fastapi.middleware.cors import CORSMiddleware

origins = [
    "http://localhost",
    "http://localhost:3000",
    "https://yourdomain.com",
]

app = FastAPI(title="Kruskal-Wallis Test API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class GroupData(BaseModel):
    name: str
    values: list[float]


class KruskalWallisRequest(BaseModel):
    groups: list[GroupData]
    alpha: float = 0.05


class GroupSummary(BaseModel):
    name: str
    n: int
    rank_sum: float
    mean_rank: float


class RankingDetail(BaseModel):
    value: float
    group: str
    rank: float


class KruskalWallisResponse(BaseModel):
    n_total: int
    df: int
    h_statistic: float
    chi_square_critical: float
    p_value: float
    reject_null: bool
    alpha: float
    groups_summary: list[GroupSummary]
    ranking_details: list[RankingDetail]
    conclusion: str


@app.get("/")
def read_root():
    return {"message": "Kruskal-Wallis Test API"}


@app.post("/kruskal-wallis", response_model=KruskalWallisResponse)
def kruskal_wallis(request: KruskalWallisRequest):
    groups_data = [np.array(g.values) for g in request.groups]
    group_names = [g.name for g in request.groups]

    stat, p_value = stats.kruskal(*groups_data)

    all_values = []
    all_groups = []
    for g in request.groups:
        for v in g.values:
            all_values.append(v)
            all_groups.append(g.name)

    ranks = rankdata(all_values, method="average")

    ranking_details = [
        RankingDetail(value=v, group=g, rank=r)
        for v, g, r in sorted(zip(all_values, all_groups, ranks), key=lambda x: x[2])
    ]

    groups_summary = []
    rank_idx = 0
    for g in request.groups:
        n = len(g.values)
        group_ranks = []
        for v in g.values:
            idx = all_values.index(v)
            group_ranks.append(ranks[idx])
        rank_sum = sum(group_ranks)
        mean_rank = rank_sum / n
        groups_summary.append(
            GroupSummary(name=g.name, n=n, rank_sum=rank_sum, mean_rank=mean_rank)
        )

    n_total = len(all_values)
    k = len(request.groups)
    df = k - 1
    chi_square_critical = chi2.ppf(1 - request.alpha, df)
    reject_null = stat > chi_square_critical

    if reject_null:
        conclusion = "Reject H0: Significant difference exists between groups"
    else:
        conclusion = "Fail to reject H0: No significant difference between groups"

    return KruskalWallisResponse(
        n_total=n_total,
        df=df,
        h_statistic=round(stat, 4),
        chi_square_critical=round(chi_square_critical, 4),
        p_value=round(p_value, 6),
        reject_null=reject_null,
        alpha=request.alpha,
        groups_summary=groups_summary,
        ranking_details=ranking_details,
        conclusion=conclusion,
    )
