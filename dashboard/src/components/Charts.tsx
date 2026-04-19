import {
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts'

interface BarChartProps {
  data: { day: string; value: number }[]
}

export function PipelineBarChart({ data }: BarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <ReBarChart data={data} barSize={32}>
        <XAxis
          dataKey="day"
          axisLine={false}
          tickLine={false}
          tick={{ fill: '#7c766f', fontSize: 12, fontFamily: "'IBM Plex Mono', monospace" }}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fill: '#7c766f', fontSize: 12, fontFamily: "'IBM Plex Mono', monospace" }}
          tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}k`}
        />
        <Tooltip
          contentStyle={{
            background: 'rgba(24, 24, 25, 0.95)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 14,
            color: '#f7f1e7',
            fontSize: 13,
            fontFamily: "'Manrope', sans-serif",
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
            backdropFilter: 'blur(12px)',
          }}
          formatter={(value) => [`EUR ${Number(value).toLocaleString()}`, 'Pipeline Value']}
          cursor={{ fill: 'rgba(255, 255, 255, 0.03)' }}
        />
        <defs>
          <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffb159" />
            <stop offset="100%" stopColor="#ff7b17" stopOpacity={0.5} />
          </linearGradient>
        </defs>
        <Bar dataKey="value" fill="url(#barGradient)" radius={[8, 8, 0, 0]} />
      </ReBarChart>
    </ResponsiveContainer>
  )
}

interface DonutChartProps {
  data: { name: string; value: number; color: string }[]
}

export function StageDonutChart({ data }: DonutChartProps) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={90}
          dataKey="value"
          stroke="none"
          paddingAngle={3}
        >
          {data.map((entry, i) => (
            <Cell key={i} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            background: 'rgba(24, 24, 25, 0.95)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 14,
            color: '#f7f1e7',
            fontSize: 13,
            fontFamily: "'Manrope', sans-serif",
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
            backdropFilter: 'blur(12px)',
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}
