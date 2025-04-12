"use client"
import React, { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Page = () => {
   const [isDragging, setIsDragging] = useState(false);
   const [file, setFile] = useState<File | null>(null);
   const [isProcessing, setIsProcessing] = useState(false);
   const [progress, setProgress] = useState(0);
   const [extractedText, setExtractedText] = useState<string | null>(null);
   const [error, setError] = useState<string | null>(null);
   const fileInputRef = useRef<HTMLInputElement>(null);

   const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(true);
   }, []);

   const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
   }, []);

   const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
   }, []);

   const resetState = () => {
      setFile(null);
      setIsProcessing(false);
      setProgress(0);
      setExtractedText(null);
      setError(null);
   };

   const processFile = (file: File) => {
      // Check if file is PDF
      if (file.type !== "application/pdf") {
         setError("Please upload a PDF file");
         return;
      }

      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
         setError("File size exceeds 10MB limit");
         return;
      }

      setFile(file);
      setError(null);
      setIsProcessing(true);

      // Simulate processing
      let currentProgress = 0;
      const interval = setInterval(() => {
         currentProgress += 5;
         setProgress(currentProgress);

         if (currentProgress >= 100) {
            clearInterval(interval);
            setIsProcessing(false);
            // Simulate extracted text
            setExtractedText(`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, 
        nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl. 
        Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.
        
        Extracted from: ${file.name}
        Size: ${(file.size / 1024).toFixed(2)} KB
        Date: ${new Date().toLocaleString()}
        
        This is a sample of extracted text from your PDF document using our OCR technology.
        In a real application, this would contain the actual text extracted from your PDF.`);
         }
      }, 100);
   };

   const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
         processFile(e.dataTransfer.files[0]);
      }
   }, []);

   const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
         processFile(e.target.files[0]);
      }
   };

   const handleBrowseClick = () => {
      if (fileInputRef.current) {
         fileInputRef.current.click();
      }
   };

   const features = [
      {
         icon: "fa-solid fa-file-pdf",
         title: "Advanced OCR",
         description:
            "Extract text from scanned PDFs with high accuracy using our state-of-the-art OCR technology.",
      },
      {
         icon: "fa-solid fa-language",
         title: "Multi-language Support",
         description:
            "Support for over 100 languages including English, Spanish, French, German, Chinese, and more.",
      },
      {
         icon: "fa-solid fa-file-export",
         title: "Easy Export",
         description:
            "Export extracted text in various formats including TXT, DOCX, and searchable PDF.",
      },
   ];

   const steps = [
      {
         icon: "fa-solid fa-file-arrow-up",
         title: "Upload PDF",
         description: "Drag & drop or select your PDF file",
      },
      {
         icon: "fa-solid fa-cogs",
         title: "Processing",
         description: "Our AI analyzes and extracts text",
      },
      {
         icon: "fa-solid fa-file-lines",
         title: "Extract Text",
         description: "View and download the extracted content",
      },
   ];

   const testimonials = [
      {
         name: "Sarah Johnson",
         role: "Marketing Manager",
         content:
            "This tool has saved our team countless hours of manual data entry. The accuracy is impressive!",
      },
      {
         name: "David Chen",
         role: "Research Analyst",
         content:
            "I use this daily to extract data from research papers. The multi-language support is a game-changer.",
      },
      {
         name: "Emma Rodriguez",
         role: "Legal Assistant",
         content:
            "Perfect for extracting text from legal documents. Fast, accurate, and incredibly easy to use.",
      },
   ];

   return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
         {/* Header */}
         <header className="w-full bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="flex justify-between items-center h-16">
                  <div className="flex items-center">
                     <div className="flex-shrink-0">
                        <h1 className="text-xl font-bold text-indigo-600">
                           <i className="fa-solid fa-file-pdf mr-2"></i>
                           PDFExtract
                        </h1>
                     </div>
                  </div>
                  <nav className="hidden md:flex space-x-8">
                     <a
                        href="#"
                        className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
                     >
                        Home
                     </a>
                     <a
                        href="#features"
                        className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
                     >
                        Features
                     </a>
                     <a
                        href="#how-it-works"
                        className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
                     >
                        How It Works
                     </a>
                     <a
                        href="#testimonials"
                        className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
                     >
                        Testimonials
                     </a>
                  </nav>
                  <div className="hidden md:flex items-center space-x-4">
                     <Button
                        variant="outline"
                        className="!rounded-button whitespace-nowrap cursor-pointer"
                     >
                        Sign In
                     </Button>
                     <Button className="bg-indigo-600 hover:bg-indigo-700 !rounded-button whitespace-nowrap cursor-pointer">
                        Get Started
                     </Button>
                  </div>
                  <div className="md:hidden flex items-center">
                     <button className="text-gray-700 hover:text-indigo-600 cursor-pointer">
                        <i className="fa-solid fa-bars text-xl"></i>
                     </button>
                  </div>
               </div>
            </div>
         </header>

         {/* Hero Section */}
         <section className="relative overflow-hidden">
            <div className="absolute inset-0 z-0">
               <img
                  src="https://public.readdy.ai/ai/img_res/56ee5857ad39813872ae71f15a812bc3.jpg"
                  alt="Background"
                  className="w-full h-full object-cover object-top"
               />
               <div className="absolute inset-0 bg-indigo-900/30 backdrop-blur-sm"></div>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative z-10">
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div>
                     <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                        Extract Text from PDFs{" "}
                        <span className="text-indigo-300">in Seconds</span>
                     </h1>
                     <p className="mt-6 text-xl text-gray-100">
                        Our powerful OCR technology makes it easy to extract text from
                        any PDF document. Simply drag and drop your file to get started.
                     </p>
                     <div className="mt-8 flex flex-col sm:flex-row gap-4">
                        <Button className="bg-white text-indigo-600 hover:bg-gray-100 text-lg px-6 py-6 !rounded-button whitespace-nowrap cursor-pointer">
                           <i className="fa-solid fa-rocket mr-2"></i>
                           Try It Free
                        </Button>
                        <Button
                           variant="outline"
                           className="border-white text-white hover:bg-white/10 text-lg px-6 py-6 !rounded-button whitespace-nowrap cursor-pointer"
                        >
                           <i className="fa-solid fa-play mr-2"></i>
                           Watch Demo
                        </Button>
                     </div>
                     <div className="mt-8 flex items-center text-gray-100">
                        <div className="flex -space-x-2">
                           <div className="w-8 h-8 rounded-full bg-indigo-400 flex items-center justify-center text-xs text-white">
                              JD
                           </div>
                           <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-xs text-white">
                              MK
                           </div>
                           <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-xs text-white">
                              TS
                           </div>
                           <div className="w-8 h-8 rounded-full bg-indigo-700 flex items-center justify-center text-xs text-white">
                              +
                           </div>
                        </div>
                        <span className="ml-4">Trusted by 10,000+ users worldwide</span>
                     </div>
                  </div>
                  <div>
                     <Card className="bg-white/95 backdrop-blur-sm shadow-xl p-6 md:p-8">
                        <Tabs defaultValue="upload" className="w-full">
                           <TabsList className="grid w-full grid-cols-2 mb-6">
                              <TabsTrigger
                                 value="upload"
                                 className="text-sm md:text-base !rounded-button whitespace-nowrap cursor-pointer"
                              >
                                 Upload PDF
                              </TabsTrigger>
                              <TabsTrigger
                                 value="results"
                                 className="text-sm md:text-base !rounded-button whitespace-nowrap cursor-pointer"
                              >
                                 View Results
                              </TabsTrigger>
                           </TabsList>
                           <TabsContent value="upload">
                              <div
                                 className={`border-2 ${isDragging ? "border-indigo-500 bg-indigo-50" : "border-dashed border-gray-300 hover:border-indigo-400 hover:bg-gray-50"} rounded-lg p-8 text-center transition-all duration-200 ease-in-out cursor-pointer`}
                                 onDragEnter={handleDragEnter}
                                 onDragOver={handleDragOver}
                                 onDragLeave={handleDragLeave}
                                 onDrop={handleDrop}
                                 onClick={handleBrowseClick}
                              >
                                 <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileSelect}
                                    accept=".pdf"
                                    className="hidden"
                                 />
                                 <div className="mx-auto flex justify-center">
                                    <i className="fa-solid fa-file-pdf text-5xl text-indigo-500 mb-4"></i>
                                 </div>
                                 <h3 className="text-lg font-medium text-gray-900">
                                    {isDragging
                                       ? "Drop your PDF here"
                                       : "Drag & drop your PDF here"}
                                 </h3>
                                 <p className="mt-1 text-sm text-gray-500">
                                    or{" "}
                                    <span className="text-indigo-600 font-medium">
                                       browse files
                                    </span>
                                 </p>
                                 <p className="mt-3 text-xs text-gray-400">
                                    Supports PDF files up to 10MB
                                 </p>
                              </div>

                              {file && !isProcessing && !extractedText && (
                                 <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                                    <div className="flex items-center">
                                       <i className="fa-solid fa-file-pdf text-indigo-500 mr-3"></i>
                                       <div className="flex-1 min-w-0">
                                          <p className="text-sm font-medium text-gray-900 truncate">
                                             {file.name}
                                          </p>
                                          <p className="text-xs text-gray-500">
                                             {(file.size / 1024).toFixed(2)} KB
                                          </p>
                                       </div>
                                       <Button
                                          variant="outline"
                                          size="sm"
                                          onClick={resetState}
                                          className="!rounded-button whitespace-nowrap cursor-pointer"
                                       >
                                          <i className="fa-solid fa-xmark mr-1"></i>
                                          Remove
                                       </Button>
                                    </div>
                                 </div>
                              )}

                              {isProcessing && (
                                 <div className="mt-6">
                                    <div className="flex justify-between items-center mb-2">
                                       <span className="text-sm font-medium text-gray-700">
                                          Processing...
                                       </span>
                                       <span className="text-sm font-medium text-indigo-600">
                                          {progress}%
                                       </span>
                                    </div>
                                    <Progress value={progress} className="h-2" />
                                    <p className="mt-2 text-xs text-gray-500 text-center">
                                       Extracting text from your PDF. This may take a moment.
                                    </p>
                                 </div>
                              )}

                              {error && (
                                 <Alert variant="destructive" className="mt-4">
                                    <i className="fa-solid fa-circle-exclamation mr-2"></i>
                                    <AlertTitle>Error</AlertTitle>
                                    <AlertDescription>{error}</AlertDescription>
                                 </Alert>
                              )}
                           </TabsContent>
                           <TabsContent value="results">
                              {extractedText ? (
                                 <div className="space-y-4">
                                    <div className="p-4 bg-gray-50 rounded-lg max-h-80 overflow-y-auto">
                                       <pre className="text-sm text-gray-700 whitespace-pre-wrap">
                                          {extractedText}
                                       </pre>
                                    </div>
                                    <div className="flex flex-col sm:flex-row gap-3">
                                       <Button className="bg-indigo-600 hover:bg-indigo-700 !rounded-button whitespace-nowrap cursor-pointer">
                                          <i className="fa-solid fa-download mr-2"></i>
                                          Download Text
                                       </Button>
                                       <Button
                                          variant="outline"
                                          className="!rounded-button whitespace-nowrap cursor-pointer"
                                          onClick={resetState}
                                       >
                                          <i className="fa-solid fa-arrow-rotate-left mr-2"></i>
                                          Process Another PDF
                                       </Button>
                                    </div>
                                 </div>
                              ) : (
                                 <div className="text-center py-12">
                                    <i className="fa-solid fa-file-lines text-4xl text-gray-300 mb-3"></i>
                                    <h3 className="text-lg font-medium text-gray-700">
                                       No Results Yet
                                    </h3>
                                    <p className="text-sm text-gray-500 mt-1">
                                       Upload a PDF first to see extracted text here
                                    </p>
                                    <Button
                                       variant="outline"
                                       className="mt-4 !rounded-button whitespace-nowrap cursor-pointer"
                                       onClick={() =>
                                          document
                                             .querySelector('[data-value="upload"]')
                                             ?.dispatchEvent(new Event("click"))
                                       }
                                    >
                                       Go to Upload
                                    </Button>
                                 </div>
                              )}
                           </TabsContent>
                        </Tabs>
                     </Card>
                  </div>
               </div>
            </div>
         </section>

         {/* Stats Section */}
         <section className="bg-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                  <div>
                     <p className="text-3xl md:text-4xl font-bold text-indigo-600">
                        10M+
                     </p>
                     <p className="mt-2 text-sm md:text-base text-gray-500">
                        PDFs Processed
                     </p>
                  </div>
                  <div>
                     <p className="text-3xl md:text-4xl font-bold text-indigo-600">
                        99.8%
                     </p>
                     <p className="mt-2 text-sm md:text-base text-gray-500">
                        Accuracy Rate
                     </p>
                  </div>
                  <div>
                     <p className="text-3xl md:text-4xl font-bold text-indigo-600">
                        100+
                     </p>
                     <p className="mt-2 text-sm md:text-base text-gray-500">
                        Languages Supported
                     </p>
                  </div>
                  <div>
                     <p className="text-3xl md:text-4xl font-bold text-indigo-600">
                        50K+
                     </p>
                     <p className="mt-2 text-sm md:text-base text-gray-500">
                        Happy Users
                     </p>
                  </div>
               </div>
            </div>
         </section>

         {/* Features Section */}
         <section id="features" className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                     Powerful Features
                  </h2>
                  <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                     Our advanced OCR technology makes extracting text from PDFs
                     simple, accurate, and fast.
                  </p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {features.map((feature, index) => (
                     <Card
                        key={index}
                        className="p-6 hover:shadow-lg transition-shadow duration-300 bg-white"
                     >
                        <div className="h-12 w-12 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 mb-5">
                           <i className={`${feature.icon} text-xl`}></i>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">
                           {feature.title}
                        </h3>
                        <p className="text-gray-600">{feature.description}</p>
                     </Card>
                  ))}
               </div>

               <div className="mt-16 bg-indigo-600 rounded-2xl overflow-hidden shadow-xl">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                     <div className="p-8 md:p-12 flex flex-col justify-center">
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                           Advanced OCR Technology
                        </h3>
                        <p className="text-indigo-100 mb-6">
                           Our proprietary OCR engine can extract text from scanned PDFs,
                           images, and even handwritten documents with remarkable
                           accuracy.
                        </p>
                        <ul className="space-y-3">
                           {[
                              "99.8% accuracy on printed text",
                              "Support for tables and complex layouts",
                              "Preserves document formatting",
                              "Handles low-quality scans",
                           ].map((item, index) => (
                              <li key={index} className="flex items-start">
                                 <i className="fa-solid fa-check-circle text-indigo-300 mt-1 mr-2"></i>
                                 <span className="text-white">{item}</span>
                              </li>
                           ))}
                        </ul>
                        <Button className="mt-8 bg-white text-indigo-600 hover:bg-indigo-50 !rounded-button whitespace-nowrap cursor-pointer self-start">
                           Learn More
                        </Button>
                     </div>
                     <div className="relative hidden lg:block">
                        <img
                           src="https://public.readdy.ai/ai/img_res/4c85b593f29b48c50edcd6d472b4e27a.jpg"
                           alt="OCR Technology"
                           className="w-full h-full object-cover object-top"
                        />
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* How It Works Section */}
         <section id="how-it-works" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                     How It Works
                  </h2>
                  <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                     Extract text from your PDFs in three simple steps
                  </p>
               </div>

               <div className="relative">
                  <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-indigo-100 -translate-y-1/2 hidden md:block"></div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                     {steps.map((step, index) => (
                        <div key={index} className="relative">
                           <div className="bg-white p-6 rounded-lg text-center relative z-10">
                              <div className="w-16 h-16 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mx-auto mb-6">
                                 <i className={`${step.icon} text-2xl`}></i>
                              </div>
                              <div className="absolute top-16 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-bold">
                                 {index + 1}
                              </div>
                              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                 {step.title}
                              </h3>
                              <p className="text-gray-600">{step.description}</p>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>

               <div className="mt-16 text-center">
                  <Button className="bg-indigo-600 hover:bg-indigo-700 text-lg px-8 py-6 !rounded-button whitespace-nowrap cursor-pointer">
                     <i className="fa-solid fa-wand-magic-sparkles mr-2"></i>
                     Try It Now
                  </Button>
               </div>
            </div>
         </section>

         {/* Testimonials Section */}
         <section id="testimonials" className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                     What Our Users Say
                  </h2>
                  <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                     Thousands of professionals trust our OCR technology for their
                     document needs
                  </p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {testimonials.map((testimonial, index) => (
                     <Card key={index} className="p-6 bg-white">
                        <div className="flex items-center mb-4">
                           <div className="text-amber-400 flex">
                              {[...Array(5)].map((_, i) => (
                                 <i key={i} className="fa-solid fa-star"></i>
                              ))}
                           </div>
                        </div>
                        <p className="text-gray-700 mb-6 italic">
                           &quot;{testimonial.content}	&quot;
                        </p>
                        <div className="flex items-center">
                           <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-3">
                              <span className="text-sm font-bold">
                                 {testimonial.name.charAt(0)}
                              </span>
                           </div>
                           <div>
                              <h4 className="font-medium text-gray-900">
                                 {testimonial.name}
                              </h4>
                              <p className="text-sm text-gray-500">{testimonial.role}</p>
                           </div>
                        </div>
                     </Card>
                  ))}
               </div>

               <div className="mt-16 bg-white rounded-2xl p-8 md:p-12 shadow-sm">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                     <div>
                        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                           Ready to extract text from your PDFs?
                        </h3>
                        <p className="text-gray-600 mb-6">
                           Join thousands of satisfied users who save time with our
                           powerful OCR technology.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                           <Button className="bg-indigo-600 hover:bg-indigo-700 !rounded-button whitespace-nowrap cursor-pointer">
                              Get Started Free
                           </Button>
                           <Button
                              variant="outline"
                              className="!rounded-button whitespace-nowrap cursor-pointer"
                           >
                              <i className="fa-solid fa-calendar mr-2"></i>
                              Schedule Demo
                           </Button>
                        </div>
                     </div>
                     <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 rounded-lg text-center">
                           <img
                              src="https://public.readdy.ai/ai/img_res/67b650553d1b2f223e873412b50a169b.jpg"
                              alt="Company Logo"
                              className="h-8 mx-auto mb-2"
                           />
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg text-center">
                           <img
                              src="https://public.readdy.ai/ai/img_res/680a326a719276bcfcb9c7d84383b21e.jpg"
                              alt="Company Logo"
                              className="h-8 mx-auto mb-2"
                           />
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg text-center">
                           <img
                              src="https://public.readdy.ai/ai/img_res/3ccdd1006df8e3620c3d20c100329b76.jpg"
                              alt="Company Logo"
                              className="h-8 mx-auto mb-2"
                           />
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg text-center">
                           <img
                              src="https://public.readdy.ai/ai/img_res/3d0ce2d19b1c5cf9f9f4c54b90e51512.jpg"
                              alt="Company Logo"
                              className="h-8 mx-auto mb-2"
                           />
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* FAQ Section */}
         <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                     Frequently Asked Questions
                  </h2>
                  <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                     Find answers to common questions about our PDF text extraction
                     service
                  </p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                  {[
                     {
                        question: "What file types are supported?",
                        answer:
                           "We currently support PDF files. Our OCR technology can extract text from scanned PDFs, image-based PDFs, and native PDFs.",
                     },
                     {
                        question: "How accurate is the text extraction?",
                        answer:
                           "Our OCR technology achieves 99.8% accuracy on clear, printed text. Accuracy may vary for handwritten text or low-quality scans.",
                     },
                     {
                        question: "Is there a file size limit?",
                        answer:
                           "Yes, the free version supports files up to 10MB. Premium plans support larger files up to 100MB.",
                     },
                     {
                        question: "What languages are supported?",
                        answer:
                           "We support over 100 languages including English, Spanish, French, German, Chinese, Japanese, Arabic, and many more.",
                     },
                     {
                        question: "Is my data secure?",
                        answer:
                           "Yes, we take data security seriously. Files are encrypted during transit and processing, and are deleted from our servers after processing is complete.",
                     },
                     {
                        question: "Can I extract text from password-protected PDFs?",
                        answer:
                           "Yes, but you'll need to provide the password during the upload process to allow our system to access the content.",
                     },
                  ].map((faq, index) => (
                     <div key={index} className="border-b border-gray-200 pb-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-2 flex items-start">
                           <i className="fa-solid fa-circle-question text-indigo-500 mr-2 mt-1"></i>
                           {faq.question}
                        </h3>
                        <p className="text-gray-600 pl-6">{faq.answer}</p>
                     </div>
                  ))}
               </div>

               <div className="mt-12 text-center">
                  <p className="text-gray-600">
                     Still have questions?{" "}
                     <a
                        href="#"
                        className="text-indigo-600 font-medium hover:text-indigo-500 cursor-pointer"
                     >
                        Contact our support team
                     </a>
                  </p>
               </div>
            </div>
         </section>

         {/* CTA Section */}
         <section className="py-16 bg-indigo-600">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
               <h2 className="text-3xl font-bold text-white mb-6">
                  Start Extracting Text from Your PDFs Today
               </h2>
               <p className="text-xl text-indigo-100 mb-8 max-w-3xl mx-auto">
                  Join thousands of professionals who save time with our powerful OCR
                  technology.
               </p>
               <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button className="bg-white text-indigo-600 hover:bg-indigo-50 text-lg px-8 py-6 !rounded-button whitespace-nowrap cursor-pointer">
                     <i className="fa-solid fa-rocket mr-2"></i>
                     Get Started Free
                  </Button>
                  <Button
                     variant="outline"
                     className="border-white text-white hover:bg-white/10 text-lg px-8 py-6 !rounded-button whitespace-nowrap cursor-pointer"
                  >
                     <i className="fa-solid fa-calendar mr-2"></i>
                     Schedule Demo
                  </Button>
               </div>
            </div>
         </section>

         {/* Footer */}
         <footer className="bg-gray-900 text-white pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                  <div>
                     <h3 className="text-xl font-bold mb-4">
                        <i className="fa-solid fa-file-pdf mr-2"></i>
                        PDFExtract
                     </h3>
                     <p className="text-gray-400 mb-4">
                        Advanced OCR technology for extracting text from any PDF
                        document.
                     </p>
                     <div className="flex space-x-4">
                        <a
                           href="#"
                           className="text-gray-400 hover:text-white cursor-pointer"
                        >
                           <i className="fa-brands fa-twitter text-xl"></i>
                        </a>
                        <a
                           href="#"
                           className="text-gray-400 hover:text-white cursor-pointer"
                        >
                           <i className="fa-brands fa-facebook text-xl"></i>
                        </a>
                        <a
                           href="#"
                           className="text-gray-400 hover:text-white cursor-pointer"
                        >
                           <i className="fa-brands fa-linkedin text-xl"></i>
                        </a>
                        <a
                           href="#"
                           className="text-gray-400 hover:text-white cursor-pointer"
                        >
                           <i className="fa-brands fa-github text-xl"></i>
                        </a>
                     </div>
                  </div>
                  <div>
                     <h4 className="font-semibold text-gray-300 mb-4">Product</h4>
                     <ul className="space-y-2">
                        <li>
                           <a
                              href="#"
                              className="text-gray-400 hover:text-white cursor-pointer"
                           >
                              Features
                           </a>
                        </li>
                        <li>
                           <a
                              href="#"
                              className="text-gray-400 hover:text-white cursor-pointer"
                           >
                              Pricing
                           </a>
                        </li>
                        <li>
                           <a
                              href="#"
                              className="text-gray-400 hover:text-white cursor-pointer"
                           >
                              API
                           </a>
                        </li>
                        <li>
                           <a
                              href="#"
                              className="text-gray-400 hover:text-white cursor-pointer"
                           >
                              Integrations
                           </a>
                        </li>
                        <li>
                           <a
                              href="#"
                              className="text-gray-400 hover:text-white cursor-pointer"
                           >
                              Documentation
                           </a>
                        </li>
                     </ul>
                  </div>
                  <div>
                     <h4 className="font-semibold text-gray-300 mb-4">Company</h4>
                     <ul className="space-y-2">
                        <li>
                           <a
                              href="#"
                              className="text-gray-400 hover:text-white cursor-pointer"
                           >
                              About Us
                           </a>
                        </li>
                        <li>
                           <a
                              href="#"
                              className="text-gray-400 hover:text-white cursor-pointer"
                           >
                              Blog
                           </a>
                        </li>
                        <li>
                           <a
                              href="#"
                              className="text-gray-400 hover:text-white cursor-pointer"
                           >
                              Careers
                           </a>
                        </li>
                        <li>
                           <a
                              href="#"
                              className="text-gray-400 hover:text-white cursor-pointer"
                           >
                              Press
                           </a>
                        </li>
                        <li>
                           <a
                              href="#"
                              className="text-gray-400 hover:text-white cursor-pointer"
                           >
                              Contact
                           </a>
                        </li>
                     </ul>
                  </div>
                  <div>
                     <h4 className="font-semibold text-gray-300 mb-4">Legal</h4>
                     <ul className="space-y-2">
                        <li>
                           <a
                              href="#"
                              className="text-gray-400 hover:text-white cursor-pointer"
                           >
                              Privacy Policy
                           </a>
                        </li>
                        <li>
                           <a
                              href="#"
                              className="text-gray-400 hover:text-white cursor-pointer"
                           >
                              Terms of Service
                           </a>
                        </li>
                        <li>
                           <a
                              href="#"
                              className="text-gray-400 hover:text-white cursor-pointer"
                           >
                              Cookie Policy
                           </a>
                        </li>
                        <li>
                           <a
                              href="#"
                              className="text-gray-400 hover:text-white cursor-pointer"
                           >
                              GDPR Compliance
                           </a>
                        </li>
                        <li>
                           <a
                              href="#"
                              className="text-gray-400 hover:text-white cursor-pointer"
                           >
                              Security
                           </a>
                        </li>
                     </ul>
                  </div>
               </div>
               <div className="border-t border-gray-800 pt-8">
                  <div className="flex flex-col md:flex-row justify-between items-center">
                     <p className="text-gray-400 text-sm">
                        © 2025 PDFExtract. All rights reserved.
                     </p>
                     <div className="flex items-center space-x-4 mt-4 md:mt-0">
                        <i className="fa-brands fa-cc-visa text-2xl text-gray-400"></i>
                        <i className="fa-brands fa-cc-mastercard text-2xl text-gray-400"></i>
                        <i className="fa-brands fa-cc-amex text-2xl text-gray-400"></i>
                        <i className="fa-brands fa-cc-paypal text-2xl text-gray-400"></i>
                     </div>
                  </div>
               </div>
            </div>
         </footer>
      </div>
   );
};

export default Page;
