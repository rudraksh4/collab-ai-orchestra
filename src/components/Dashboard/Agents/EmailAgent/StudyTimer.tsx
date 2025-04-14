
import React from 'react';
import { Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface StudyTimerProps {
  studyTime: number;
  isTimerActive: boolean;
  startTimer: () => void;
  stopTimer: () => void;
  resetTimer: () => void;
  formatTime: (seconds: number) => string;
}

const StudyTimer = ({ 
  studyTime, 
  isTimerActive, 
  startTimer, 
  stopTimer, 
  resetTimer, 
  formatTime 
}: StudyTimerProps) => {
  return (
    <div className="text-center space-y-4 py-2">
      <div className="inline-flex items-center bg-gray-100 px-4 py-6 rounded-lg">
        <Clock className="h-6 w-6 mr-2 text-primary" />
        <span className="text-3xl font-mono font-bold">{formatTime(studyTime)}</span>
      </div>
      
      <div className="flex justify-center gap-2">
        {!isTimerActive ? (
          <Button 
            variant="default" 
            onClick={startTimer}
            className="px-4"
          >
            Start
          </Button>
        ) : (
          <Button 
            variant="outline" 
            onClick={stopTimer}
            className="px-4"
          >
            Pause
          </Button>
        )}
        <Button 
          variant="destructive" 
          onClick={resetTimer}
          className="px-4"
        >
          Reset
        </Button>
      </div>
      
      <p className="text-sm text-muted-foreground mt-2">
        Track your study time to improve productivity
      </p>
    </div>
  );
};

export default StudyTimer;
