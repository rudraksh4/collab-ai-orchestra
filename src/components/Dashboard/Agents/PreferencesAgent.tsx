
import React from 'react';
import { Settings, Sliders, Check, User, Zap } from 'lucide-react';
import AgentCard from '../AgentCard';
import { Progress } from '@/components/ui/progress';

interface Preference {
  id: string;
  category: string;
  title: string;
  learned: number;
  recentActivity: string;
}

interface PreferencesAgentProps {
  preferences: Preference[];
  status?: 'idle' | 'working' | 'completed';
  notifications?: number;
}

const PreferencesAgent = ({ preferences, status = 'idle', notifications = 0 }: PreferencesAgentProps) => {
  return (
    <AgentCard
      title="User Preferences Agent"
      description="Learns and adapts to your preferences"
      icon={Settings}
      color="#33C3F0"
      status={status}
      notifications={notifications}
    >
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-medium">Learned Preferences</h3>
          <div className="flex items-center text-xs text-primary">
            <Zap className="h-3.5 w-3.5 mr-1" />
            Learning
          </div>
        </div>
        <div className="space-y-3">
          {preferences.length > 0 ? (
            preferences.map((pref) => (
              <div key={pref.id} className="space-y-1.5">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center">
                      <span className="text-xs font-medium bg-gray-100 px-1.5 py-0.5 rounded text-gray-700 mr-1">
                        {pref.category}
                      </span>
                      <span className="text-xs font-medium">{pref.title}</span>
                    </div>
                    {pref.learned >= 75 && (
                      <div className="flex items-center mt-0.5">
                        <Check className="h-3 w-3 text-green-500 mr-1" />
                        <span className="text-xs text-green-700">Confident</span>
                      </div>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground">{pref.learned}%</span>
                </div>
                <Progress value={pref.learned} className="h-1.5" />
                <p className="text-xs text-muted-foreground">{pref.recentActivity}</p>
              </div>
            ))
          ) : (
            <div className="text-center py-3 text-muted-foreground text-sm">
              No preferences learned yet
            </div>
          )}
        </div>
        <div className="pt-2 flex items-center text-primary text-sm cursor-pointer">
          <Sliders className="h-3.5 w-3.5 mr-1.5" />
          <span>Adjust learning factors</span>
        </div>
      </div>
    </AgentCard>
  );
};

export default PreferencesAgent;
