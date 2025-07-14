import { useEffect, useMemo, useState } from 'react';
import { Activity, Cpu, HardDrive, MemoryStick, Minus, Square, X } from 'lucide-react';

function useStaticData() {
  return {
    cpuModel: 'Intel Core i5',
    totalMemoryGB: 16,
    totalStorage: 520
  };
}

type Stat = {
  cpuUsage: number;
  ramUsage: number;
  storageUsage: number;
  timestamp: number;
};

function useStatistics(points: number) {
  const [stats, setStats] = useState<Stat[]>([]);
  
  useEffect(() => {
    const generateStats = () => {
      const newStats = Array.from({ length: points }, (_, i) => ({
        cpuUsage: Math.random() * 100,
        ramUsage: Math.random() * 100,
        storageUsage: Math.random() * 100,
        timestamp: Date.now() - (points - i) * 1000
      }));
      setStats(newStats);
    };
    
    generateStats();
    const interval = setInterval(generateStats, 1000);
    return () => clearInterval(interval);
  }, [points]);
  
  return stats;
}

function Chart({
  selectedView,
  data,
  maxDataPoints,
}: {
  selectedView: View;
  data: number[];
  maxDataPoints: number;
}) {
  const maxValue = Math.max(...data, 1);
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 200;
    const y = 60 - (value / 100) * 60;
    return `${x},${y}`;
  }).join(' ');

  const getGradientId = () => {
    switch (selectedView) {
      case 'CPU': return 'cpuGradient';
      case 'RAM': return 'ramGradient';
      case 'STORAGE': return 'storageGradient';
      default: return 'defaultGradient';
    }
  };

  const getStrokeColor = () => {
    switch (selectedView) {
      case 'CPU': return '#3b82f6';
      case 'RAM': return '#10b981';
      case 'STORAGE': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  return (
    <div className="chart-container">
      <svg width="200" height="60" className="chart-svg">
        <defs>
          <linearGradient id="cpuGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3"/>
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.05"/>
          </linearGradient>
          <linearGradient id="ramGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.3"/>
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.05"/>
          </linearGradient>
          <linearGradient id="storageGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.3"/>
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.05"/>
          </linearGradient>
        </defs>
        
        {data.length > 1 && (
          <>
            <path
              d={`M0,60 ${points} 200,60 Z`}
              fill={`url(#${getGradientId()})`}
            />
            <polyline
              points={points}
              fill="none"
              stroke={getStrokeColor()}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </>
        )}
      </svg>
    </div>
  );
}

type View = 'CPU' | 'RAM' | 'STORAGE';

interface StaticData {
  cpuModel: string;
  totalMemoryGB: number;
  totalStorage: number;
}

function App() {
  const staticData = useStaticData();
  const statistics = useStatistics(10);
  const [activeView, setActiveView] = useState<View>('CPU');
  
  const cpuUsages = useMemo(
    () => statistics.map((stat) => stat.cpuUsage),
    [statistics]
  );
  const ramUsages = useMemo(
    () => statistics.map((stat) => stat.ramUsage),
    [statistics]
  );
  const storageUsages = useMemo(
    () => statistics.map((stat) => stat.storageUsage),
    [statistics]
  );
  
  const activeUsages = useMemo(() => {
    switch (activeView) {
      case 'CPU':
        return cpuUsages;
      case 'RAM':
        return ramUsages;
      case 'STORAGE':
        return storageUsages;
    }
  }, [activeView, cpuUsages, ramUsages, storageUsages]);

  const getCurrentUsage = () => {
    const latest = activeUsages[activeUsages.length - 1] || 0;
    return Math.round(latest);
  };

  const getIcon = (view: View) => {
    switch (view) {
      case 'CPU': return <Cpu size={20} />;
      case 'RAM': return <MemoryStick size={20} />;
      case 'STORAGE': return <HardDrive size={20} />;
    }
  };

  return (
    <div className="app">
      <Header />
      
      <div className="main-container">
        {/* Sidebar */}
        <div className="sidebar">
          <div className="sidebar-header">
            <Activity className="sidebar-icon" size={24} />
            <h2>System Monitor</h2>
          </div>
          
          <div className="metrics-grid">
            <SelectOption
              onClick={() => setActiveView('CPU')}
              title="CPU"
              view="CPU"
              subTitle={staticData?.cpuModel ?? 'Loading...'}
              data={cpuUsages}
              isActive={activeView === 'CPU'}
              icon={<Cpu size={18} />}
            />
            <SelectOption
              onClick={() => setActiveView('RAM')}
              title="RAM"
              view="RAM"
              subTitle={`${staticData?.totalMemoryGB ?? 0} GB Total`}
              data={ramUsages}
              isActive={activeView === 'RAM'}
              icon={<MemoryStick size={18} />}
            />
            <SelectOption
              onClick={() => setActiveView('STORAGE')}
              title="Storage"
              view="STORAGE"
              subTitle={`${staticData?.totalStorage ?? 0} GB Total`}
              data={storageUsages}
              isActive={activeView === 'STORAGE'}
              icon={<HardDrive size={18} />}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content">
          <div className="main-header">
            <div className="metric-title">
              {getIcon(activeView)}
              <span>{activeView}</span>
            </div>
            <div className="usage-display">
              <span className="usage-value">{getCurrentUsage()}%</span>
              <span className="usage-label">Current Usage</span>
            </div>
          </div>
          
          <div className="chart-main">
            <Chart
              selectedView={activeView}
              data={activeUsages}
              maxDataPoints={10}
            />
          </div>
          
          <div className="stats-footer">
            <div className="stat-item">
              <span className="stat-label">Average</span>
              <span className="stat-value">
                {Math.round(activeUsages.reduce((a, b) => a + b, 0) / activeUsages.length || 0)}%
              </span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Peak</span>
              <span className="stat-value">{Math.round(Math.max(...activeUsages, 0))}%</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Low</span>
              <span className="stat-value">{Math.round(Math.min(...activeUsages, 0))}%</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .app {
          min-height: 100vh;
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          color: white;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          overflow: hidden;
        }

        .header {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          height: 32px;
          background: rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(10px);
          padding: 0 8px;
          gap: 8px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          -webkit-app-region: drag;
        }

        .window-control {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
          -webkit-app-region: no-drag;
        }

        .window-control:hover {
          transform: scale(1.1);
        }

        .close {
          background: #ff5f57;
        }

        .close:hover {
          background: #ff3b30;
        }

        .minimize {
          background: #ffbd2e;
        }

        .minimize:hover {
          background: #ff9500;
        }

        .maximize {
          background: #28ca42;
        }

        .maximize:hover {
          background: #30d158;
        }

        .main-container {
          display: flex;
          height: calc(100vh - 32px);
        }

        .sidebar {
          width: 320px;
          background: rgba(15, 23, 42, 0.8);
          backdrop-filter: blur(20px);
          border-right: 1px solid rgba(255, 255, 255, 0.1);
          padding: 24px;
          overflow-y: auto;
        }

        .sidebar-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 32px;
          padding-bottom: 16px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .sidebar-icon {
          color: #3b82f6;
        }

        .sidebar-header h2 {
          margin: 0;
          font-size: 20px;
          font-weight: 600;
          background: linear-gradient(135deg, #3b82f6, #10b981);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .metrics-grid {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .select-option {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 20px;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
          position: relative;
          overflow: hidden;
        }

        .select-option:hover {
          transform: translateY(-2px);
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.2);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        }

        .select-option.active {
          background: rgba(59, 130, 246, 0.1);
          border-color: #3b82f6;
        }

        .select-option.active.ram {
          background: rgba(16, 185, 129, 0.1);
          border-color: #10b981;
        }

        .select-option.active.storage {
          background: rgba(245, 158, 11, 0.1);
          border-color: #f59e0b;
        }

        .option-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
        }

        .option-title {
          font-size: 16px;
          font-weight: 600;
          color: white;
        }

        .option-subtitle {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.6);
          margin-bottom: 16px;
          line-height: 1.4;
        }

        .chart-container {
          width: 100%;
          height: 60px;
          position: relative;
        }

        .chart-svg {
          width: 100%;
          height: 100%;
        }

        .main-content {
          flex: 1;
          padding: 40px;
          display: flex;
          flex-direction: column;
        }

        .main-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 32px;
        }

        .metric-title {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 24px;
          font-weight: 700;
          color: white;
        }

        .usage-display {
          text-align: right;
        }

        .usage-value {
          display: block;
          font-size: 48px;
          font-weight: 700;
          line-height: 1;
          background: linear-gradient(135deg, #3b82f6, #10b981);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .usage-label {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.6);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .chart-main {
          flex: 1;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 24px;
          padding: 40px;
          margin-bottom: 24px;
          position: relative;
          overflow: hidden;
        }

        .chart-main::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 70%);
          pointer-events: none;
        }

        .chart-main .chart-container {
          height: 100%;
          position: relative;
          z-index: 1;
        }

        .chart-main .chart-svg {
          width: 100%;
          height: 100%;
        }

        .stats-footer {
          display: flex;
          gap: 32px;
          padding: 24px 0;
        }

        .stat-item {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .stat-label {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.6);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 4px;
        }

        .stat-value {
          font-size: 20px;
          font-weight: 600;
          color: white;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .select-option.active::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, currentColor, transparent);
          animation: pulse 2s infinite;
        }
      `}</style>
    </div>
  );
}

function SelectOption(props: {
  title: string;
  view: View;
  subTitle: string;
  data: number[];
  onClick: () => void;
  isActive: boolean;
  icon: React.ReactNode;
}) {
  const getActiveClass = () => {
    if (!props.isActive) return '';
    return props.view.toLowerCase();
  };

  return (
    <button 
      className={`select-option ${props.isActive ? `active ${getActiveClass()}` : ''}`}
      onClick={props.onClick}
    >
      <div className="option-header">
        {props.icon}
        <span className="option-title">{props.title}</span>
      </div>
      <div className="option-subtitle">{props.subTitle}</div>
      <Chart selectedView={props.view} data={props.data} maxDataPoints={10} />
    </button>
  );
}

function Header() {
  return (
    <header className="header">
      <button className="window-control close" />
      <button className="window-control minimize" />
      <button className="window-control maximize" />
    </header>
  );
}

export default App;