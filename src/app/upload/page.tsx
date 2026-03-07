
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChefHat, Upload, Wand2, Loader2, Play } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generateVideoDescription } from '@/ai/flows/ai-video-description-generation';
import { isCookingRelatedVideo } from '@/ai/flows/ai-cooking-content-moderation';
import { useRouter } from 'next/navigation';

export default function UploadPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [transcript, setTranscript] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleAIDescription = async () => {
    if (!transcript) {
      toast({
        variant: "destructive",
        title: "Missing Transcript",
        description: "Please provide a transcript for the AI to analyze.",
      });
      return;
    }

    setIsGenerating(true);
    try {
      const result = await generateVideoDescription({ transcript });
      setTitle(result.title);
      setDescription(result.summary);
      toast({
        title: "AI Generated",
        description: "Title and description have been updated.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Generation Error",
        description: "Failed to generate description.",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePost = async () => {
    if (!title || !description) {
      toast({
        variant: "destructive",
        title: "Missing Info",
        description: "Please fill in the title and description.",
      });
      return;
    }

    setIsUploading(true);
    try {
      // Content moderation check before posting
      const moderation = await isCookingRelatedVideo({
        videoTitle: title,
        videoDescription: description,
      });

      if (!moderation.isCookingRelated) {
        toast({
          variant: "destructive",
          title: "Cooking Content Required",
          description: `Our AI flagged this as non-cooking: ${moderation.reason}`,
        });
        setIsUploading(false);
        return;
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Recipe Posted!",
        description: "Your video is now live on the feed.",
      });
      router.push('/');
    } catch (error) {
       toast({
        variant: "destructive",
        title: "Upload Error",
        description: "Something went wrong during upload.",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <ChefHat className="h-10 w-10 text-primary" />
          <h1 className="text-3xl font-headline font-bold">Post a New Dish</h1>
        </div>

        <div className="grid gap-8">
          <Card className="border-dashed border-2 bg-muted/20 hover:bg-muted/40 transition-colors cursor-pointer">
            <CardContent className="flex flex-col items-center justify-center py-12 space-y-4">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Upload className="h-8 w-8" />
              </div>
              <div className="text-center">
                <p className="font-semibold">Drag and drop your cooking video</p>
                <p className="text-sm text-muted-foreground">MP4, MOV up to 100MB</p>
              </div>
              <Button variant="outline">Select Video File</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Recipe Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="transcript">Video Transcript (Optional - for AI Helper)</Label>
                <div className="flex gap-2">
                  <Textarea 
                    id="transcript" 
                    placeholder="Paste what you said in the video here..." 
                    className="min-h-[100px]"
                    value={transcript}
                    onChange={(e) => setTranscript(e.target.value)}
                  />
                  <Button 
                    variant="secondary" 
                    className="flex flex-col gap-1 h-auto"
                    onClick={handleAIDescription}
                    disabled={isGenerating}
                  >
                    {isGenerating ? <Loader2 className="h-5 w-5 animate-spin" /> : <Wand2 className="h-5 w-5" />}
                    <span className="text-[10px]">AI Help</span>
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Recipe Title</Label>
                <Input 
                  id="title" 
                  placeholder="e.g. Grandma's Secret Apple Pie" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Cooking Instructions & Story</Label>
                <Textarea 
                  id="description" 
                  placeholder="Share the recipe steps or the inspiration behind this dish..." 
                  className="min-h-[150px]"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <Button 
                className="w-full h-12 text-lg font-bold" 
                onClick={handlePost}
                disabled={isUploading}
              >
                {isUploading ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : <Play className="h-5 w-5 mr-2" />}
                Share with FlavorFeed
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
