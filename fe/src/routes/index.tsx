import { createFileRoute } from "@tanstack/react-router";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
} from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Calculator } from "lucide-react";

export const Route = createFileRoute("/")({
  component: App,
});

interface Group {
  name: string;
  values: number[];
}

interface GroupSummary {
  name: string;
  n: number;
  rank_sum: number;
  mean_rank: number;
}

interface RankingDetail {
  value: number;
  group: string;
  rank: number;
}

interface KruskalWallisResult {
  n_total: number;
  df: number;
  h_statistic: number;
  chi_square_critical: number;
  p_value: number;
  reject_null: boolean;
  alpha: number;
  groups_summary: GroupSummary[];
  ranking_details: RankingDetail[];
  conclusion: string;
}

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <KruskalWallisPage />
      </div>
    </QueryClientProvider>
  );
}

function KruskalWallisPage() {
  const [groups, setGroups] = useState<Group[]>([
    { name: "Nhóm 1", values: [] },
    { name: "Nhóm 2", values: [] },
    { name: "Nhóm 3", values: [] },
  ]);
  const [alpha, setAlpha] = useState(0.05);
  const [inputValues, setInputValues] = useState<Record<number, string>>({});

  const mutation = useMutation({
    mutationFn: async (data: { groups: Group[]; alpha: number }) => {
      const response = await fetch("http://77.42.41.13:8000/kruskal-wallis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Lỗi khi gọi API");
      return response.json() as Promise<KruskalWallisResult>;
    },
  });

  const addGroup = () => {
    setGroups([...groups, { name: `Nhóm ${groups.length + 1}`, values: [] }]);
  };

  const removeGroup = (index: number) => {
    if (groups.length > 3) {
      setGroups(groups.filter((_, i) => i !== index));
    }
  };

  const updateGroupName = (index: number, name: string) => {
    const newGroups = [...groups];
    newGroups[index].name = name;
    setGroups(newGroups);
  };

  const updateGroupValues = (index: number, valuesStr: string) => {
    setInputValues({ ...inputValues, [index]: valuesStr });
    const values = valuesStr
      .split(",")
      .map((v) => parseFloat(v.trim()))
      .filter((v) => !isNaN(v));
    const newGroups = [...groups];
    newGroups[index].values = values;
    setGroups(newGroups);
  };

  const handleSubmit = () => {
    const validGroups = groups.filter((g) => g.values.length > 0);
    if (validGroups.length < 3) {
      alert("Cần ít nhất 3 nhóm có dữ liệu");
      return;
    }
    mutation.mutate({ groups: validGroups, alpha });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-8">
          Kiểm định Kruskal-Wallis
        </h1>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Nhập dữ liệu</CardTitle>
            <CardDescription>
              Nhập tên nhóm và các giá trị quan sát (cách nhau bằng dấu phẩy)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {groups.map((group, index) => (
              <div
                key={index}
                className="flex gap-3 items-center justify-center"
              >
                <div className="w-40">
                  <Label htmlFor={`name-${index}`}>Tên nhóm</Label>
                  <Input
                    id={`name-${index}`}
                    value={group.name}
                    onChange={(e) => updateGroupName(index, e.target.value)}
                    placeholder="Tên nhóm"
                  />
                </div>
                <div className="flex-1">
                  <Label htmlFor={`values-${index}`}>Giá trị</Label>
                  <Input
                    id={`values-${index}`}
                    value={inputValues[index] ?? ""}
                    onChange={(e) => updateGroupValues(index, e.target.value)}
                    placeholder="VD: 25, 30, 45, 50"
                  />
                </div>
                <Button
                  variant="destructive"
                  size="icon"
                  className=""
                  onClick={() => removeGroup(index)}
                  disabled={groups.length <= 3}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}

            <div className="flex gap-3 items-end">
              <div className="w-32">
                <Label htmlFor="alpha">Mức ý nghĩa (α)</Label>
                <Input
                  id="alpha"
                  type="number"
                  step="0.01"
                  min="0.01"
                  max="0.5"
                  value={alpha}
                  onChange={(e) => setAlpha(parseFloat(e.target.value) || 0.05)}
                />
              </div>
              <Button variant="outline" onClick={addGroup}>
                <Plus className="h-4 w-4 mr-2" />
                Thêm nhóm
              </Button>
              <Button onClick={handleSubmit} disabled={mutation.isPending}>
                <Calculator className="h-4 w-4 mr-2" />
                {mutation.isPending ? "Đang tính..." : "Tính toán"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {mutation.isError && (
          <Card className="mb-6 border-red-500">
            <CardContent className="pt-6">
              <p className="text-red-500">Lỗi: {mutation.error.message}</p>
            </CardContent>
          </Card>
        )}

        {mutation.data && <ResultDisplay result={mutation.data} />}
      </div>
    </div>
  );
}

function ResultDisplay({ result }: { result: KruskalWallisResult }) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            Kết quả kiểm định
            <Badge variant={result.reject_null ? "destructive" : "secondary"}>
              {result.reject_null ? "Bác bỏ H₀" : "Không bác bỏ H₀"}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="text-center p-3 bg-gray-100 rounded">
              <p className="text-sm text-gray-600">Tiêu chuẩn kiểm định H</p>
              <p className="text-xl font-bold">
                {result.h_statistic.toFixed(4)}
              </p>
            </div>
            <div className="text-center p-3 bg-gray-100 rounded">
              <p className="text-sm text-gray-600">
                Giá trị tới hạn (pp khi-bình phương)
              </p>
              <p className="text-xl font-bold">
                {result.chi_square_critical.toFixed(4)}
              </p>
            </div>
            <div className="text-center p-3 bg-gray-100 rounded">
              <p className="text-sm text-gray-600">p-value</p>
              <p className="text-xl font-bold">{result.p_value.toFixed(5)}</p>
            </div>
            <div className="text-center p-3 bg-gray-100 rounded">
              <p className="text-sm text-gray-600">Bậc tự do</p>
              <p className="text-xl font-bold">{result.df}</p>
            </div>
          </div>
          <p className="text-center font-medium p-3 bg-blue-50 rounded">
            {result.reject_null
              ? "Có sự khác biệt có ý nghĩa thống kê giữa các nhóm"
              : "Không có sự khác biệt có ý nghĩa thống kê giữa các nhóm"}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tóm tắt theo nhóm</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nhóm</TableHead>
                <TableHead className="text-right">Số quan sát (n)</TableHead>
                <TableHead className="text-right">Tổng hạng</TableHead>
                <TableHead className="text-right">Hạng trung bình</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {result.groups_summary.map((group) => (
                <TableRow key={group.name}>
                  <TableCell className="font-medium">{group.name}</TableCell>
                  <TableCell className="text-right">{group.n}</TableCell>
                  <TableCell className="text-right">{group.rank_sum}</TableCell>
                  <TableCell className="text-right">
                    {group.mean_rank.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Chi tiết xếp hạng</CardTitle>
          <CardDescription>
            Tổng số quan sát: {result.n_total} | α = {result.alpha}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-right">Hạng</TableHead>
                <TableHead className="text-right">Giá trị</TableHead>
                <TableHead>Nhóm</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {result.ranking_details.map((detail, i) => (
                <TableRow key={i}>
                  <TableCell className="text-right">{detail.rank}</TableCell>
                  <TableCell className="text-right">{detail.value}</TableCell>
                  <TableCell>{detail.group}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
