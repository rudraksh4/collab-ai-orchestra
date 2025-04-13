
import React from 'react';
import { Brain, Activity, MessageSquare, RefreshCw } from 'lucide-react';
import AgentCard from '../AgentCard';
import { Progress } from '@/components/ui/progress';

interface AgentStatus {
  name: string;
  status: 'idle' | 'working' | 'completed';
  load: number;
  lastAction: string;
}

interface CoordinatorAgentProps {
  agents: AgentStatus[];
  status?: 'idle' | 'working' | 'completed';
  notifications?: number;
}

const CoordinatorAgent = ({ agents, status = 'working', notifications = 0 }: CoordinatorAgentProps) => {
  return (
    <AgentCard
      title="Coordinator Agent"
      description="Orchestrates all agents and activities"
      icon={Brain}
      color="#8B5CF6"
      status={status}
      notifications={notifications}
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">System Status</h3>
          <div className="flex items-center text-xs text-muted-foreground">
            <Activity className="h-3.5 w-3.5 mr-1 text-primary" />
            Active
          </div>
        </div>
        <div className="space-y-3">
          {agents.map((agent) => (
            <div key={agent.name} className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-xs font-medium">{agent.name}</span>
                <span className="text-xs text-muted-foreground">
                  {agent.load}% load
                </span>
              </div>
              <Progress value={agent.load} className="h-1.5" />
              <div className="flex justify-between items-center text-xs">
                <span className={`
                  px-1.5 py-0.5 rounded-full text-xs
                  ${agent.status === 'idle' ? 'bg-gray-100 text-gray-700' : 
                    agent.status === 'working' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'}
                `}>
                  {agent.status}
                </span>
                <span className="text-muted-foreground flex items-center">
                  <MessageSquare className="h-3 w-3 mr-1" />
                  {agent.lastAction}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between pt-1 text-xs">
          <span className="text-muted-foreground">Last sync: 2 minutes ago</span>
          <span className="text-primary flex items-center cursor-pointer">
            <RefreshCw className="h-3 w-3 mr-1" />
            Refresh
          </span>
        </div>
      </div>
    </AgentCard>
  );
};

export default CoordinatorAgent;
