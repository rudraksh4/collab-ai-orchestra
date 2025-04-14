
import React, { useState } from 'react';
import { File, Upload, FileText, AlignLeft, List, HelpCircle, Clock, Settings } from 'lucide-react';
import AgentCard from '../AgentCard';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { formatTime } from './EmailAgent/utils';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

interface PDFScannerAgentProps {
  status?: 'idle' | 'working' | 'completed';
  notifications?: number;
}

const PDFScannerAgent = ({ status = 'idle', notifications = 0 }: PDFScannerAgentProps) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [numQuestions, setNumQuestions] = useState(5);
  const [questionType, setQuestionType] = useState<'mcq' | 'descriptive'>('mcq');
  const [studyTime, setStudyTime] = useState(0); // Time in seconds
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(null);
  const { toast } = useToast();

  // Simulate file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Check if it's a PDF
      if (file.type !== 'application/pdf') {
        toast({
          title: "Invalid file format",
          description: "Please upload a PDF file.",
          variant: "destructive",
        });
        return;
      }
      
      setUploadedFile(file);
      toast({
        title: "File uploaded",
        description: `${file.name} has been uploaded.`,
      });
    }
  };

  // Timer functions
  const startTimer = () => {
    if (!isTimerActive) {
      setIsTimerActive(true);
      const interval = setInterval(() => {
        setStudyTime(prevTime => prevTime + 1);
      }, 1000);
      setTimerInterval(interval);
      toast({
        title: "Study timer started",
        description: "Your study session has begun.",
      });
    }
  };

  const stopTimer = () => {
    if (isTimerActive && timerInterval) {
      clearInterval(timerInterval);
      setIsTimerActive(false);
      setTimerInterval(null);
      toast({
        title: "Study timer paused",
        description: `You've studied for ${formatTime(studyTime)}.`,
      });
    }
  };

  const resetTimer = () => {
    if (timerInterval) {
      clearInterval(timerInterval);
    }
    setStudyTime(0);
    setIsTimerActive(false);
    setTimerInterval(null);
    toast({
      title: "Study timer reset",
      description: "Your study timer has been reset to 0.",
    });
  };

  // Simulate PDF processing with the new settings
  const processPDF = () => {
    if (!uploadedFile) {
      toast({
        title: "No file selected",
        description: "Please upload a PDF file first.",
        variant: "destructive",
      });
      return;
    }

    setProcessing(true);
    setProgress(0);
    
    // Simulate progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setProcessing(false);
          generateMockQuestions();
          toast({
            title: "Processing completed",
            description: `${questionType === 'mcq' ? 'MCQ' : 'Descriptive'} questions have been generated.`,
          });
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  // Generate mock questions for demo based on selected settings
  const generateMockQuestions = () => {
    const mockQuestions: Question[] = [];
    
    // Generate the requested number of questions
    for (let i = 0; i < numQuestions; i++) {
      if (questionType === 'mcq') {
        mockQuestions.push({
          id: `${i + 1}`,
          question: `Question ${i + 1}: What is the main concept discussed on page ${i + 1}?`,
          options: [
            `Option A for question ${i + 1}`,
            `Option B for question ${i + 1}`,
            `Option C for question ${i + 1}`,
            `Option D for question ${i + 1}`
          ],
          correctAnswer: `Option A for question ${i + 1}`,
          explanation: `The explanation for question ${i + 1} demonstrates the correct answer is Option A.`
        });
      } else {
        // For descriptive questions, we still use the Question interface but with empty options
        mockQuestions.push({
          id: `${i + 1}`,
          question: `Descriptive Question ${i + 1}: Explain the concept discussed on page ${i + 1}.`,
          options: [],
          correctAnswer: `Detailed explanation for question ${i + 1}.`,
          explanation: `This is a descriptive question that requires a detailed answer.`
        });
      }
    }
    
    setQuestions(mockQuestions);
  };

  const handleQuestionSelect = (question: Question) => {
    setSelectedQuestion(question);
    setSelectedOption(null);
    setShowAnswer(false);
  };

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  const checkAnswer = () => {
    if (selectedQuestion && (selectedOption || questionType === 'descriptive')) {
      setShowAnswer(true);
      if (questionType === 'mcq' && selectedOption === selectedQuestion.correctAnswer) {
        toast({
          title: "Correct!",
          description: "You've selected the right answer.",
        });
      } else if (questionType === 'mcq') {
        toast({
          title: "Incorrect",
          description: "Try again or view the explanation.",
        });
      } else {
        toast({
          title: "Answer shown",
          description: "Compare your answer with the sample solution.",
        });
      }
    }
  };

  return (
    <AgentCard
      title="PDF Scanner Agent"
      description="Generate questions from PDF files"
      icon={FileText}
      color="#FF5722"
      status={status}
      notifications={notifications}
    >
      <Tabs defaultValue="upload">
        <TabsList className="w-full">
          <TabsTrigger value="upload" className="flex-1">Upload</TabsTrigger>
          <TabsTrigger value="questions" className="flex-1">Questions</TabsTrigger>
          <TabsTrigger value="settings" className="flex-1">Settings</TabsTrigger>
          <TabsTrigger value="timer" className="flex-1">Study Timer</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upload" className="mt-3">
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <input
                type="file"
                id="file-upload"
                className="hidden"
                onChange={handleFileUpload}
                accept=".pdf"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <Upload className="h-10 w-10 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm font-medium mb-1">Click to upload PDF</p>
                <p className="text-xs text-muted-foreground">Max file size: 10MB</p>
              </label>
            </div>
            
            {uploadedFile && (
              <div className="bg-gray-50 p-3 rounded-md">
                <div className="flex items-center">
                  <File className="h-5 w-5 mr-2 text-primary" />
                  <span className="text-sm font-medium truncate flex-1">{uploadedFile.name}</span>
                  <Badge variant="outline">{(uploadedFile.size / 1024).toFixed(0)} KB</Badge>
                </div>
                
                {processing ? (
                  <div className="mt-3">
                    <p className="text-xs text-muted-foreground mb-1">Processing file...</p>
                    <Progress value={progress} className="h-1.5" />
                  </div>
                ) : (
                  <Button 
                    onClick={processPDF} 
                    className="w-full mt-3"
                    size="sm"
                  >
                    Generate {questionType === 'mcq' ? 'MCQ' : 'Descriptive'} Questions
                  </Button>
                )}
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="questions" className="mt-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Question List</h3>
              
              {questions.length > 0 ? (
                <div className="space-y-1.5">
                  {questions.map((q) => (
                    <Card 
                      key={q.id} 
                      className={`p-2 cursor-pointer text-sm hover:bg-gray-50 ${
                        selectedQuestion?.id === q.id ? 'border-primary' : ''
                      }`}
                      onClick={() => handleQuestionSelect(q)}
                    >
                      <div className="flex items-start">
                        <List className="h-4 w-4 mt-0.5 mr-2 text-primary" />
                        <span className="line-clamp-2">{q.question}</span>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground py-2">
                  No questions generated yet. Upload a PDF file first.
                </p>
              )}
            </div>
            
            <div className="space-y-2">
              {selectedQuestion ? (
                <div>
                  <div className="flex items-start mb-2">
                    <AlignLeft className="h-4 w-4 mt-0.5 mr-2 text-primary" />
                    <h3 className="text-sm font-medium">{selectedQuestion.question}</h3>
                  </div>
                  
                  {questionType === 'mcq' && selectedQuestion.options.length > 0 ? (
                    <div className="space-y-2 mb-4">
                      {selectedQuestion.options.map((option, index) => (
                        <div 
                          key={index}
                          className={`p-2 border rounded-md cursor-pointer ${
                            selectedOption === option 
                              ? 'border-primary bg-primary/5' 
                              : 'border-gray-200 hover:border-gray-300'
                          } ${
                            showAnswer && option === selectedQuestion.correctAnswer
                              ? 'border-green-500 bg-green-50'
                              : ''
                          }`}
                          onClick={() => handleOptionSelect(option)}
                        >
                          <span className="text-sm">{option}</span>
                        </div>
                      ))}
                    </div>
                  ) : questionType === 'descriptive' ? (
                    <div className="mb-4">
                      <textarea 
                        className="w-full p-2 border rounded-md h-32" 
                        placeholder="Type your answer here..."
                      />
                    </div>
                  ) : null}
                  
                  <div className="flex justify-between">
                    <Button 
                      onClick={checkAnswer} 
                      disabled={questionType === 'mcq' && !selectedOption}
                      size="sm"
                    >
                      {questionType === 'mcq' ? 'Check Answer' : 'Show Solution'}
                    </Button>
                    
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <HelpCircle className="h-4 w-4 mr-1" />
                          {questionType === 'mcq' ? 'Explanation' : 'Sample Answer'}
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>
                            {questionType === 'mcq' ? 'Answer Explanation' : 'Sample Answer'}
                          </DialogTitle>
                        </DialogHeader>
                        <div className="pt-2">
                          {questionType === 'mcq' ? (
                            <>
                              <p className="mb-2 font-medium">
                                Correct answer: {selectedQuestion.correctAnswer}
                              </p>
                              <p>{selectedQuestion.explanation}</p>
                            </>
                          ) : (
                            <p>{selectedQuestion.correctAnswer}</p>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-40 text-center">
                  <HelpCircle className="h-10 w-10 mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Select a question from the list to view details
                  </p>
                </div>
              )}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="settings" className="mt-3">
          <div className="space-y-4 p-3 bg-gray-50 rounded-md">
            <div className="flex items-center space-x-2 mb-4">
              <Settings className="h-5 w-5 text-primary" />
              <h3 className="text-sm font-medium">Question Generation Settings</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="num-questions">Number of Questions</Label>
                <div className="flex items-center mt-1.5">
                  <Input 
                    id="num-questions" 
                    type="number" 
                    min="1" 
                    max="20"
                    value={numQuestions} 
                    onChange={(e) => setNumQuestions(parseInt(e.target.value) || 5)}
                    className="w-24"
                  />
                  <span className="ml-2 text-sm text-muted-foreground">
                    (1-20 questions)
                  </span>
                </div>
              </div>
              
              <div>
                <Label className="block mb-2">Question Type</Label>
                <RadioGroup 
                  value={questionType} 
                  onValueChange={(value) => setQuestionType(value as 'mcq' | 'descriptive')}
                  className="flex flex-col space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="mcq" id="mcq" />
                    <Label htmlFor="mcq" className="cursor-pointer">Multiple Choice (MCQ)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="descriptive" id="descriptive" />
                    <Label htmlFor="descriptive" className="cursor-pointer">Descriptive</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <Button onClick={processPDF} disabled={!uploadedFile}>
                Apply Settings
              </Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="timer" className="mt-3">
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
        </TabsContent>
      </Tabs>
    </AgentCard>
  );
};

export default PDFScannerAgent;
