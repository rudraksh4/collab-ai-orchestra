
import React, { useState } from 'react';
import { File, Upload, FileText, AlignLeft, List, HelpCircle } from 'lucide-react';
import AgentCard from '../AgentCard';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

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

  // Simulate PDF processing
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
            description: "MCQ questions have been generated.",
          });
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  // Generate mock questions for demo
  const generateMockQuestions = () => {
    const mockQuestions: Question[] = [
      {
        id: '1',
        question: 'What is the main purpose of the PDF file format?',
        options: [
          'To edit documents easily',
          'To present documents consistently across different platforms',
          'To compress images only',
          'To encrypt text files'
        ],
        correctAnswer: 'To present documents consistently across different platforms',
        explanation: 'PDF (Portable Document Format) was created to ensure documents appear the same regardless of what hardware or software is used to view them.'
      },
      {
        id: '2',
        question: 'Which company created the PDF format?',
        options: [
          'Microsoft',
          'Apple',
          'Adobe',
          'IBM'
        ],
        correctAnswer: 'Adobe',
        explanation: 'PDF was created by Adobe in the early 1990s and later became an open standard.'
      },
      {
        id: '3',
        question: 'What does OCR stand for in document processing?',
        options: [
          'Optical Character Recognition',
          'Original Content Reader',
          'Output Content Rendering',
          'Online Character Repository'
        ],
        correctAnswer: 'Optical Character Recognition',
        explanation: 'OCR is a technology that recognizes text within a digital image, commonly used to convert scanned documents to editable text.'
      },
    ];
    
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
    if (selectedQuestion && selectedOption) {
      setShowAnswer(true);
      if (selectedOption === selectedQuestion.correctAnswer) {
        toast({
          title: "Correct!",
          description: "You've selected the right answer.",
        });
      } else {
        toast({
          title: "Incorrect",
          description: "Try again or view the explanation.",
        });
      }
    }
  };

  return (
    <AgentCard
      title="PDF Scanner Agent"
      description="Generate MCQ questions from PDF files"
      icon={FileText}
      color="#FF5722"
      status={status}
      notifications={notifications}
    >
      <Tabs defaultValue="upload">
        <TabsList className="w-full">
          <TabsTrigger value="upload" className="flex-1">Upload</TabsTrigger>
          <TabsTrigger value="questions" className="flex-1">Questions</TabsTrigger>
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
                    Generate MCQ Questions
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
                  
                  <div className="flex justify-between">
                    <Button 
                      onClick={checkAnswer} 
                      disabled={!selectedOption}
                      size="sm"
                    >
                      Check Answer
                    </Button>
                    
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <HelpCircle className="h-4 w-4 mr-1" />
                          Explanation
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Answer Explanation</DialogTitle>
                        </DialogHeader>
                        <div className="pt-2">
                          <p className="mb-2 font-medium">
                            Correct answer: {selectedQuestion.correctAnswer}
                          </p>
                          <p>{selectedQuestion.explanation}</p>
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
      </Tabs>
    </AgentCard>
  );
};

export default PDFScannerAgent;
