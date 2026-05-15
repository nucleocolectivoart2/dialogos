'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutGrid, 
  Podcast, 
  Video, 
  FileText, 
  Gamepad2, 
  Play, 
  ArrowRight, 
  ChevronRight, 
  CircuitBoard, 
  Sprout, 
  Users, 
  ArrowUpRight,
  Activity,
  X,
  Maximize2,
  Minimize2,
  FileDown,
  Presentation,
  Headphones,
  BookOpen,
  Library,
  Clock,
  User,
  Calendar,
  Zap,
  Star,
  Award,
  ShieldCheck,
  Menu
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useAudio } from '@/context/audio-context';
import { MOCK_EPISODES } from '@/lib/podcast-data';
import { VIDEOS_DATA, RESOURCES_DATA, BLOG_POSTS } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const IntegricultLogo = ({ className }: { className?: string }) => (
  <svg 
    version="1.1" 
    id="Capa_1" 
    xmlns="http://www.w3.org/2000/svg" 
    xmlnsXlink="http://www.w3.org/1999/xlink" 
    x="0px" 
    y="0px" 
    viewBox="0 0 600 600" 
    className={className}
    style={{ enableBackground: 'new 0 0 600 600' }} 
    xmlSpace="preserve"
  >
    <style type="text/css">
      {`.st_white{fill:#FFFFFF;}`}
    </style>
    <g>
      <path fill="currentColor" d="M150,266.4c-2.1,0-3.9-1.7-4-3.9c0-1.2,0-2.4,0-3.5c0-37,13.2-72.9,37.1-101.1c23.6-27.9,56.4-46.7,92.2-52.9 c2.2-0.4,4.2,1.1,4.6,3.2c0.4,2.2-1.1,4.2-3.2,4.6c-34,5.9-65,23.8-87.5,50.3c-22.7,26.8-35.2,60.9-35.2,96c0,1.1,0,2.2,0,3.4 C154.1,264.6,152.3,266.4,150,266.4C150.1,266.4,150.1,266.4,150,266.4z"/>
    </g>
    <g>
      <path fill="currentColor" d="M454.9,265.9C454.8,265.9,454.8,265.9,454.9,265.9c-2.3,0-4-1.9-4-4c0-0.9,0-1.9,0-2.8c0-72.1-51.4-133.6-122.3-146.2 c-2.2-0.4-3.6-2.4-3.2-4.6c0.4-2.2,2.4-3.6,4.6-3.2c74.6,13.3,128.8,78,128.8,154c0,1,0,2,0,3C458.8,264.1,457,265.9,454.9,265.9z" />
    </g>
    <g>
      <path fill="currentColor" d="M269,411.7c-0.3,0-0.6,0-0.9-0.1c-64.5-14.4-113.1-68.2-121-133.9c-0.3-2.2,1.3-4.1,3.5-4.4c2.2-0.3,4.1,1.3,4.4,3.5 c7.4,62.3,53.6,113.4,114.8,127.1c2.1,0.5,3.5,2.6,3,4.7C272.5,410.5,270.8,411.7,269,411.7z"/>
    </g>
    <g>
      <path fill="currentColor" d="M381.9,348.6c-1,0-2.1-0.4-2.8-1.2c-1.4-1.6-1.3-4,0.2-5.4c23-21.3,36.2-51.6,36.2-82.9c0-45.9-27.4-86.9-69.8-104.5 c-2-0.8-2.9-3.1-2.1-5c0.8-2,3-2.9,5-2.1c45.3,18.8,74.5,62.6,74.5,111.6c0,33.5-14.1,65.8-38.7,88.5 C383.8,348.2,382.8,348.6,381.9,348.6z"/>
    </g>
    <g>
      <path fill="currentColor" d="M223,348.6c-0.9,0-1.9-0.3-2.6-1c-24.6-22.8-38.7-55.1-38.7-88.6c0-48.8,29.1-92.5,74.1-111.4c2-0.8,4.2,0.1,5,2.1 c0.8,2-0.1,4.2-2.1,5c-42.1,17.7-69.4,58.6-69.4,104.3c0,31.4,13.2,61.6,36.2,82.9c1.6,1.4,1.6,3.9,0.2,5.4 C225.1,348.2,224.1,348.6,223,348.6z"/>
    </g>
    <g>
      <circle className="st_white" cx="301.8" cy="106.9" r="12.8"/>
      <path fill="currentColor" d="M301.8,122.4c-8.6,0-15.6-7-15.6-15.6c0-8.6,7-15.6,15.6-15.6s15.6,7,15.6,15.6C317.4,115.5,310.4,122.4,301.8,122.4z M301.8,96.8c-5.5,0-10,4.5-10,10s4.5,10,10,10s10-4.5,10-10S307.3,96.8,301.8,96.8z"/>
    </g>
    <g>
      <path fill="currentColor" d="M489.7,349.4c-1.8,0-3.5-1.3-3.9-3.1l-13.3-59.8l-5.5,15.8c-0.5,1.5-2,2.6-3.6,2.7c-1.6,0.1-3.1-0.9-3.8-2.4l-9.5-22.2 c-0.9-2,0.1-4.3,2.1-5.2c2-0.9,4.3,0.1,5.2,2.1l5.5,12.8l6.7-19.4c0.6-1.7,2.2-2.7,4-2.7c1.8,0.1,3.3,1.4,3.6,3.1l11.4,51.1 l12-96.2c0.2-2,1.9-3.5,3.9-3.5c0,0,0,0,0,0c2,0,3.6,1.5,3.9,3.4l11.3,79.3l8.5-27.1c0.5-1.5,1.7-2.5,3.2-2.7 c1.5-0.2,3,0.4,3.9,1.7l7,10.3l4-5.2c1.3-1.6,3.6-2,5.3-0.9l9,6h15.2c2.2,0,4,1.8,4,4s-1.8,4-4,4h-16.4c-0.8,0-1.5-0.2-2.2-0.7 l-7-4.6l-5.1,6.6c-0.8,1-2,1.6-3.3,1.5c-1.3,0-2.4-0.7-3.1-1.7l-5.4-8l-11.3,36c-0.6,1.8-2.3,2.9-4.1,2.8c-1.8-0.2-3.3-1.6-3.6-3.4 l-9.6-67.2l-11.1,89.4c-0.2,1.9-1.8,3.4-3.7,3.5C489.9,349.4,489.8,349.4,489.7,349.4z"/>
    </g>
    <g>
      <path fill="currentColor" d="M117.8,345.7C117.8,345.7,117.8,345.7,117.8,345.7c-2.1,0-3.7-1.5-3.9-3.5L103.3,255l-12.3,69.4c-0.3,1.8-1.9,3.2-3.7,3.3 c-1.9,0.1-3.5-1.1-4-2.9L72,284.9L62.5,299c-0.7,1-1.7,1.6-2.9,1.7c-1.2,0.1-2.3-0.3-3.2-1.1l-8-7.6l-5.4,2.7 c-0.5,0.3-1.2,0.4-1.8,0.4H24.8c-2.2,0-4-1.8-4-4s1.8-4,4-4h15.4l7.1-3.5c1.5-0.7,3.3-0.5,4.5,0.7l6.6,6.3l11.6-17.3 c0.9-1.3,2.4-1.9,3.9-1.7c1.5,0.2,2.8,1.3,3.2,2.8l9,31.6l13.9-78.7c0.3-1.9,2-3.3,4-3.3c2,0.1,3.6,1.5,3.8,3.5l10.3,85.5L126,265 c0.3-1.9,2-3.3,3.9-3.3c0,0,0,0,0,0c2,0,3.6,1.5,3.9,3.4l3.6,25.4l9.1-16.2c1.1-1.9,3.5-2.6,5.4-1.5c1.9,1.1,2.6,3.5,1.5,5.4 l-14.8,26.4c-0.8,1.5-2.5,2.3-4.2,2c-1.7-0.3-3-1.7-3.2-3.3l-1.6-11.1l-8,50.2C121.4,344.2,119.8,345.7,117.8,345.7z"/>
    </g>
    <g>
      <path fill="currentColor" d="M332.6,408.5c0.4,1.8,2.1,3.1,3.9,3.1c0.3,0,0.6,0,0.9-0.1c30.7-7,58.3-23,79.8-46.2c21.6-23.3,35.5-52.2,40-83.6 c0.3-2.2-1.2-4.2-3.4-4.5c-2.2-0.3-4.2,1.2-4.5,3.4c-4.3,29.7-17.5,57.2-38,79.3c-20.4,22-46.6,37.2-75.8,43.9 C333.5,404.3,332.2,406.4,332.6,408.5z"/>
      <path fill="currentColor" d="M301.8,255.7L301.8,255.7c17.1,0,31-13.9,31-31v-54.5c0-17.1-13.9-31-31-31h0c-17.1,0-31,13.9-31,31v54.5 C270.7,241.8,284.6,255.7,301.8,255.7z"/>
      <path fill="currentColor" d="M488.5,420.9c-8.5,0-15.5,6.9-15.6,15.4c-14.3,1.2-25.4,3.5-35.2,5.6c-22.4,4.7-34.8,7.2-57.3-9 c-6.5-4.7-14.9-5.5-22.7-5.1c-7.5,0.4-15.2,2.9-22.6,1.3c-3.5-0.7-6.9-2.1-9.9-4.1c-7.7-5.1-12.4-13.5-15.3-22.1 c-4-12.2-4.6-25.4-1.7-37.9c1.4-6.1,4-11.9,8.6-16.3c10.3-9.9,14.9-1.8,37.6-9.9c22.2-7.9,28.4-37.9,31.7-48.3 c1.8-5.8,8.2-13.2,1.8-12.2c-2.9,0.5-31.4,2.4-51.5,15.8c-16,10.7-18.9,35-18.9,35c22.8-23.9,48.8-35.7,55.1-38.2 c4-1.6,2.2,0.2,2.2,0.2c-14.9,9.4-52.1,35.6-68.5,58.3v-70.1c26.9-2.4,48-25.1,48-52.6v-12.4c0-2.6-2.1-4.8-4.8-4.8 s-4.8,2.1-4.8,4.8v12.4c0,23.9-19.4,43.3-43.3,43.3s-43.3-19.4-43.3-43.3v-12.4c0-2.6-2.1-4.8-4.8-4.8s-4.8,2.1-4.8,4.8v12.4 c0,27.5,21.1,50.2,48,52.6v71.4c-15.8-13.9-49.7-43.5-64.2-54.3c0,0-2.2-2.4,1.2-0.8c3.4,1.6,30.6,15.3,51,38.8 c0,0,4.9-20.1-16.2-35.3c-15.3-11-26-10.7-39.1-14c-2.7-0.7-7.8-1.9-9.5-1.2c-1.5,0.6-0.7,2.6,0.5,5.3c2.6,5.7,5.4,31.4,17.8,43.1 c17.6,16.4,32.9,8.8,39.4,12.3c8.2,4.5,13.7,12.1,16.3,21c2.4,8.3,2.8,17.4,1.3,25.9c-0.8,4.8-2.3,9.5-4.1,14 c-1.5,3.7-3.4,7.8-6.5,10.5c-16.8,14.8-45.1,15.7-65.9,13.7c-2.8-0.3-5.4-0.6-7.9-0.9c-9.2-1.2-18-2.3-31.9,0.3 c-2.1,0.4-4.3,1.1-6.8,1.8c-8.4,2.6-19.8,6.1-42.3,2.1c-1.5-7-7.8-12.3-15.2-12.3c-8.6,0-15.6,7-15.6,15.6c0,8.6,7,15.6,15.6,15.6 c7.8,0,14.2-5.7,15.4-13.2c7.1,1.2,13.2,1.7,18.5,1.7c11.8,0,19.5-2.4,25.3-4.2c2.3-0.7,4.3-1.3,6.1-1.7c13-2.4,21-1.4,30.2-0.2 c2.6,0.3,5.3,0.7,8.1,0.9c2.6,0.2,5.4,0.4,8.2,0.6c-3.8,6.3-9.3,11.8-15.1,16.3c-2.8,2.2-5.9,4.2-9.2,5.6 c-4.3,1.8-8.6,1.4-13.1,1.3c-4-0.1-8,0.3-12,1c-6.5,1.1-12.7,3.5-18.2,7.1c-3,2-5.8,4.2-8.6,6.5c-0.9,0.7-8.6,8.3-8.9,8.1 c-1.9-1.2-4.2-1.9-6.6-1.9c-6.8,0-12.4,5.6-12.4,12.4s5.6,12.4,12.4,12.4s12.4-5.6,12.4-12.4c0-2.4-0.7-4.7-1.9-6.6 c-0.2-0.3,7.7-7.1,8.5-7.8c2.6-2.2,5.2-4.3,8-6.2c5.6-3.7,11.9-5.9,18.6-6.7c2-0.2,4-0.3,6-0.4c2.2-0.1,4.3,0.3,6.5,0.3 c9.1-0.1,16.7-4.1,23.6-9.8c5.9-4.9,11.5-10.8,15.2-17.5c0.3-0.5,0.6-1,0.8-1.6c19.3,0.2,41.1-3,55.7-15.9c2.2-2,4.2-4.8,5.9-8.1 c-2.2,9.1-5.6,13.2-10.1,18.7c-1.5,1.8-3.2,3.9-5,6.3c-8.2,11-22.5,16.6-35.1,21.6c-7.7,3-14.3,5.6-18.5,9 c-8.9,7.2-8.8,15.4-8.7,24.1c0,0.8,0,1.7,0,2.6c0,9.6-2.9,12-9.4,17.3c-1.8,1.4-3.7,3.1-5.9,5.1c-1-0.3-2.1-0.4-3.2-0.4 c-6.8,0-12.4,5.6-12.4,12.4s5.6,12.4,12.4,12.4s12.4-5.6,12.4-12.4c0-3.6-1.6-6.9-4.1-9.2c1.5-1.3,3-2.5,4.3-3.6 c6.6-5.5,11.4-9.4,11.4-21.6c0-0.9,0-1.8,0-2.6c-0.1-8.6-0.1-14.2,6.7-19.8c3.6-2.9,9.8-5.4,17.1-8.2c12.7-5,28.4-11.1,37.5-23.4 c1.7-2.3,3.3-4.2,4.8-6.1c3.2-3.8,6-7.3,8.3-12.3c-1.9,28.9-11,43.6-18.6,50.9c-6.5,6.2-13.8,9.3-21.4,12.6 c-3.7,1.6-7.5,3.2-11.3,5.2c-14.2,7.6-16.7,26.4-18.6,40.2c-0.2,1.2-0.3,2.4-0.5,3.5c-0.2,1.5,0.8,2.9,2.4,3.1c0.1,0,0.3,0,0.4,0 c1.4,0,2.5-1,2.7-2.4c0.2-1.1,0.3-2.3,0.5-3.6c1.8-13.3,4-29.8,15.7-36c3.6-1.9,7.3-3.5,10.9-5c7.8-3.4,15.9-6.9,23.1-13.7 c6-5.7,12.8-15.4,16.9-31.6V530c-7.3,1.3-12.8,7.7-12.8,15.3c0,8.6,7,15.6,15.6,15.6s15.6-7,15.6-15.6c0-7.6-5.5-14-12.8-15.3 v-82.2c1.9,7.4,4.7,14.8,8.5,20.6c3.8,5.7,10.3,9.3,16.6,12.8c3.2,1.8,6.6,3.7,9.5,5.8c15.7,11.6,16.9,24.8,17.9,35.4 c0.2,1.8,0.3,3.5,0.5,5.1c0.2,1.4,1.4,2.4,2.7,2.4c0.1,0,0.3,0,0.4,0c1.5-0.2,2.6-1.6,2.4-3.1c-0.2-1.5-0.4-3.1-0.5-4.8 c-1-11.1-2.4-26.3-20.1-39.3c-3.1-2.3-6.6-4.3-10-6.2c-6-3.4-11.6-6.5-14.7-11.1c-6.3-9.5-9.5-24.4-11-36.5 c5.5,19.2,18.7,29.8,44,37l0.4,0.1c27.3,7.7,43.8,25.6,47.7,51.6c0,0.2,0.1,0.5,0.2,0.7c-3.8,2.1-6.3,6.2-6.3,10.8 c0,6.8,5.6,12.4,12.4,12.4s12.4-5.6,12.4-12.4s-5.6-12.4-12.4-12.4c-0.3,0-0.6,0-0.8,0c-1.5-9.9-4.8-18.8-9.7-26.6 c18.5-1.7,25.2,8.9,30.9,20.9c0.5,1,1.5,1.6,2.5,1.6c0.4,0,0.8-0.1,1.2-0.3c1.4-0.7,2-2.3,1.3-3.7c-6.3-13.2-14.9-26.9-38.8-23.7 c-0.3,0-0.5,0.1-0.7,0.2c-9-11.4-22-19.7-38.4-24.4l-0.4-0.1c-16.7-4.8-27.5-11.1-33.9-19.8c-4.5-6.1-7.2-13.9-8.4-24.3 c3.4,5.7,7.6,10.3,12.7,13.5c4.2,2.7,8.9,4.5,13.8,5.2c8,1.1,16.1-1.5,24.1-1.5c5.6,0,12,0.6,16.7,3.9c2.3,1.7,4.6,3.2,6.7,4.5 c0.8,3.5,6.2,24.6,27.5,26.2c5.3,0.4,11.1,0.8,16.4,1.5c6.5,0.9,12.2,2.1,17.1,5.7c4.6,3.3,8.8,6.8,13,10.7 c-1.1,1.9-1.8,4.1-1.8,6.4c0,6.8,5.6,12.4,12.4,12.4s12.4-5.6,12.4-12.4s-5.6-12.4-12.4-12.4c-2.5,0-4.8,0.7-6.7,2 c-5.9-5.6-12.1-11.3-19.8-14.4c-6-2.5-13.2-3.2-19.7-4c-3.5-0.4-7-0.8-10.5-1c-7.8-0.6-13.9-4.4-18.2-11.3 c-1.2-1.9-2.1-3.8-2.7-5.5c8.2,3.9,15.4,5.3,22.7,5.3c8,0,16-1.7,25.3-3.6c9.8-2,20.8-4.3,35.1-5.5c2.2,6,7.9,10.2,14.6,10.2 c8.6,0,15.6-7,15.6-15.6C504.1,427.9,497.1,420.9,488.5,420.9z M115,446.5c-5.5,0-10-4.5-10-10c0-5.5,4.5-10,10-10s10,4.5,10,10 C125.1,442,120.6,446.5,115,446.5z M135.2,500.4c-4.4,0-8-3.6-8-8c0-4.4,3.6-8,8-8c4.4,0,8,3.6,8,8 C143.1,496.8,139.6,500.4,135.2,500.4z M198.5,537c-4.4,0-8-3.6-8-8c0-4.4,3.6-8,8-8c4.4,0,8,3.6,8,8 C206.5,533.4,202.9,537,198.5,537z M413.1,529c0,4.4-3.6,8-8,8c-4.4,0-8-3.6-8-8c0-4.4,3.6-8,8-8C409.5,521,413.1,524.6,413.1,529z M311.8,545.3c0,5.5-4.5,10-10,10s-10-4.5-10-10s4.5-10,10-10S311.8,539.8,311.8,545.3z M476.4,492.4c0,4.4-3.6,8-8,8 c-4.4,0-8-3.6-8-8c0-4.4,3.6-8,8-8C472.8,484.4,476.4,488,476.4,492.4z M488.5,446.5c-5.5,0-10-4.5-10-10c0-5.5,4.5-10,10-10 c5.5,0,10,4.5,10,10C498.6,442,494.1,446.5,488.5,446.5z"/>
    </g>
  </svg>
);

const BlogPostCard = ({ post, onEarnXP }: { post: any, onEarnXP: (xp: number, label: string) => void }) => (
  <div className={cn(
    "group relative bg-white border border-zinc-100 overflow-hidden flex flex-col transition-all duration-700 hover:border-zinc-800 rounded-none",
    post.featured ? "lg:flex-row lg:col-span-3 min-h-[400px]" : "col-span-1"
  )}>
    <div className={cn("relative overflow-hidden", post.featured ? "lg:w-1/2 h-[250px] lg:h-auto" : "h-64")}>
      <Image src={post.image} alt={post.title} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" />
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />
      <div className="absolute top-6 left-6 flex flex-col gap-2">
        <span className="bg-[#ffe106] text-black text-[7px] font-black uppercase tracking-[0.3em] px-3 py-1">
          {post.category}
        </span>
        <div className="bg-black/80 text-[#00e1ff] text-[6px] font-black uppercase tracking-[0.4em] px-3 py-1 flex items-center gap-2">
           <Zap className="size-2" /> +{post.xpReward} XP
        </div>
      </div>
    </div>
    <div className={cn("p-8 md:p-10 flex flex-col justify-between flex-1", post.featured && "lg:p-16 lg:w-1/2")}>
      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className={cn(
            "font-black uppercase tracking-tighter leading-[0.85] text-zinc-900",
            post.featured ? "text-5xl lg:text-7xl font-serif italic" : "text-xl md:text-2xl"
          )}>
            {post.title}
          </h3>
          <p className="text-zinc-500 font-medium italic text-sm md:text-lg leading-relaxed line-clamp-3">
            {post.excerpt}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-6 text-[7px] md:text-[8px] font-black uppercase tracking-widest text-zinc-400">
           <span className="flex items-center gap-2"><User className="size-3 text-[#ffe106]" /> {post.author}</span>
           <span className="flex items-center gap-2"><Calendar className="size-3 text-[#ffe106]" /> {post.date}</span>
           <span className="flex items-center gap-2"><Clock className="size-3 text-[#ffe106]" /> {post.readTime}</span>
        </div>
      </div>
      <div className="pt-8 mt-8 border-t border-zinc-50 flex items-center justify-between">
        <button 
          onClick={() => onEarnXP(post.xpReward, "LECTURA_PROTOCOL")}
          className="flex items-center gap-3 text-[7px] md:text-[8px] font-black uppercase tracking-[0.4em] text-zinc-900 group/btn"
        >
          ANALIZAR BITÁCORA <ArrowRight className="size-3 group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  </div>
);

const ResourceCard = ({ title, description, type, size, category, xpReward, onEarnXP }: any) => {
    const getIcon = () => {
        switch(type) {
            case 'PDF': return <FileText className="size-5" />;
            case 'PPT': return <Presentation className="size-5" />;
            case 'AUDIO': return <Headphones className="size-5" />;
            default: return <BookOpen className="size-5" />;
        }
    };

    return (
        <div className="group bg-white border border-zinc-100 p-8 flex flex-col justify-between hover:border-zinc-800 transition-all duration-500 rounded-none shadow-sm">
            <div className="space-y-8">
                <div className="flex justify-between items-start">
                    <div className="p-3 bg-zinc-50 text-zinc-400 group-hover:bg-zinc-900 group-hover:text-white transition-colors rounded-none border border-zinc-100">
                        {getIcon()}
                    </div>
                    <div className="text-right">
                        <span className="block text-[7px] font-black text-zinc-400 uppercase tracking-[0.2em]">{category}</span>
                        <div className="flex items-center gap-1 mt-1 justify-end">
                           <Zap className="size-2 text-[#00e1ff]" />
                           <span className="text-[7px] font-black text-[#00e1ff] tracking-widest">+{xpReward} XP</span>
                        </div>
                    </div>
                </div>
                <div className="space-y-3">
                    <h3 className="text-lg font-black uppercase tracking-tight leading-tight text-zinc-900">
                        {title}
                    </h3>
                    <p className="text-[10px] md:text-xs text-zinc-400 font-medium italic leading-relaxed line-clamp-2">
                        {description}
                    </p>
                </div>
            </div>
            <div className="flex items-center justify-between pt-8 border-t border-zinc-50 mt-8">
                <span className="text-[6px] md:text-[7px] font-bold text-zinc-300 tracking-widest uppercase">{size} · {type}</span>
                <button 
                    onClick={() => onEarnXP(xpReward, "DESCARGA_RECURSO")}
                    className="flex items-center gap-2 text-[6px] md:text-[7px] font-black uppercase tracking-[0.3em] hover:text-[#00e1ff] transition-colors group/btn"
                >
                    ADQUIRIR <FileDown className="size-3 text-zinc-300 group-hover/btn:text-[#00e1ff] transition-all" />
                </button>
            </div>
        </div>
    );
};

const SimpleSimulator = ({ onBack, onComplete }: { onBack: () => void, onComplete: (xp: number) => void }) => {
    const [step, setStep] = useState(0);
    const [resilience, setResilience] = useState(0);
    const questions = [
        { q: "¿Nivel de inversión en energías limpias?", options: [{l: "Transición 20%", v: 5}, {l: "Transición 50%", v: 15}, {l: "Regeneración 80%", v: 30}] },
        { q: "¿Modelo de gobernanza comunitaria?", options: [{l: "Liderazgo Vertical", v: -10}, {l: "Participativa Mixta", v: 20}, {l: "Horizontal Biótica", v: 40}] },
        { q: "¿Gestión de Residuos?", options: [{l: "Reciclaje", v: 5}, {l: "Circularidad", v: 15}, {l: "Regeneración", v: 35}] }
    ];

    const handleAnswer = (value: number) => {
        setResilience(prev => prev + value);
        if (step < questions.length - 1) {
            setStep(s => s + 1);
        } else {
            setStep(questions.length);
            onComplete(250);
        }
    };

    return (
        <div className="text-white space-y-10 animate-in fade-in zoom-in duration-700 max-w-4xl mx-auto py-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-8 border-b border-white/10">
                <div className="flex items-center gap-6">
                    <div>
                        <h3 className="text-sm md:text-base font-black uppercase text-[#ffe106] tracking-tighter">SIM_01: CONEXIÓN</h3>
                        <p className="text-[6px] md:text-[7px] font-bold opacity-40 tracking-[0.3em] uppercase">STATUS: PROCESSING</p>
                    </div>
                    <div className="h-8 w-px bg-white/10 hidden md:block" />
                    <div>
                        <span className="text-[6px] md:text-[7px] font-black text-[#00e1ff] tracking-widest uppercase">RESILIENCIA</span>
                        <div className="flex items-center gap-2 mt-1">
                            <Activity className="size-3 text-[#00e1ff] animate-pulse" />
                            <span className="text-xl font-black italic">{resilience}%</span>
                        </div>
                    </div>
                </div>
                <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-none transition-all ml-auto md:ml-0"><X className="size-4"/></button>
            </div>

            {step < questions.length ? (
                <div className="py-8">
                    <div className="flex items-center justify-between mb-8">
                       <span className="text-[7px] font-black text-zinc-500 tracking-[0.5em] uppercase">FASE_0{step + 1} / 0{questions.length}</span>
                       <div className="flex gap-1">
                          {[0, 1, 2].map(i => (
                             <div key={i} className={cn("w-12 h-1", i <= step ? "bg-[#ffe106]" : "bg-white/10")} />
                          ))}
                       </div>
                    </div>
                    <h4 className="text-xl md:text-4xl font-black uppercase leading-tight mb-12 tracking-tighter">{questions[step].q}</h4>
                    <div className="grid gap-4">
                        {questions[step].options.map((opt, i) => (
                            <button 
                                key={i}
                                onClick={() => handleAnswer(opt.v)}
                                className="w-full p-6 border border-white/10 text-left hover:bg-white hover:text-black transition-all group flex justify-between items-center rounded-none"
                            >
                                <span className="font-black uppercase text-lg italic">{opt.l}</span>
                                <div className="flex items-center gap-4">
                                   <span className="text-[7px] font-bold opacity-0 group-hover:opacity-40 uppercase tracking-widest">EJECUTAR</span>
                                   <ChevronRight className="size-4 opacity-40 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0" />
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="text-center py-20 space-y-12">
                    <motion.div 
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="inline-block p-12 bg-white/5 border border-[#ffe106] rounded-none mb-4 relative"
                    >
                        <div className="absolute inset-0 bg-[#ffe106]/5 animate-pulse" />
                        <Activity className="size-14 text-[#ffe106] relative z-10" />
                    </motion.div>
                    <div className="space-y-6">
                        <h4 className="text-3xl md:text-6xl font-black uppercase tracking-tighter">IMPACTO_CONSOLIDADO</h4>
                        <p className="text-white/40 text-lg md:text-xl font-medium max-w-lg mx-auto italic">Tu gestión ha impulsado un territorio con una resiliencia del {resilience}%.</p>
                    </div>
                    <button 
                        onClick={() => { setStep(0); setResilience(0); }} 
                        className="px-12 py-5 bg-white text-black font-black uppercase tracking-[0.4em] text-[10px] hover:bg-[#ffe106] transition-all rounded-none shadow-2xl"
                    >
                        REINICIAR_ANÁLISIS
                    </button>
                </div>
            )}
        </div>
    );
};

const SimulationCard = ({ title, type, difficulty, duration, icon: Icon, onLaunch }: any) => (
    <div className="group bg-white border border-zinc-100 p-10 flex flex-col justify-between hover:border-zinc-800 transition-all duration-700 rounded-none shadow-sm relative overflow-hidden">
        <div className="space-y-10">
            <div className="flex justify-between items-start">
                <div className="size-14 bg-zinc-950 text-[#ffe106] flex items-center justify-center rounded-none shadow-xl border border-white/5">
                    <Icon className="size-7" />
                </div>
                <div className="text-right">
                    <span className="block text-[7px] font-black text-zinc-400 uppercase tracking-[0.3em] mb-1">{type}</span>
                    <div className="flex gap-0.5 justify-end">
                        {[1, 2, 3].map(i => (
                            <div key={i} className={cn("size-1", i <= difficulty ? "bg-[#ffe106]" : "bg-zinc-100")} />
                        ))}
                    </div>
                </div>
            </div>
            <div className="space-y-4">
                <h3 className="text-2xl font-black uppercase tracking-tight text-zinc-900 leading-none italic">
                    {title}
                </h3>
                <div className="flex items-center gap-4 text-[7px] font-black text-zinc-400 tracking-widest uppercase">
                    <span className="flex items-center gap-1.5"><Clock className="size-3" /> {duration} MIN</span>
                    <span className="text-[#00e1ff]">+250 XP</span>
                </div>
            </div>
        </div>
        <button 
            onClick={onLaunch}
            className="mt-10 py-4 border border-zinc-900 text-black font-black uppercase tracking-[0.4em] text-[8px] hover:bg-zinc-900 hover:text-white transition-all rounded-none flex items-center justify-center gap-3 group/btn"
        >
            INICIAR_PROTOCOLO <ArrowRight className="size-3 group-hover/btn:translate-x-1 transition-transform" />
        </button>
    </div>
);

export function MedularView() {
  const { playEpisode, currentEpisode, closePlayer } = useAudio();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'ecosistema' | 'podcast' | 'videos' | 'bitacora' | 'simuladores' | 'recursos'>('ecosistema');
  const [activeGameId, setActiveGameId] = useState<string | null>(null);
  const [isMinimized, setIsMinimized] = useState(false);
  
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState("Observador Bótico");

  useEffect(() => {
    if (xp >= 1500) setLevel("Arquitecto Regenerativo");
    else if (xp >= 500) setLevel("Activador de Suelos");
    else setLevel("Observador Bótico");
  }, [xp]);

  const handleEarnXP = (amount: number, label: string) => {
    setXp(prev => prev + amount);
    toast({
      title: "Protocolo Registrado",
      description: `Has obtenido +${amount} XP por ${label.replace('_', ' ')}`,
      className: "bg-zinc-900 border-[#00e1ff] text-white rounded-none border-l-4",
    });
  };

  const tabs = [
    { id: 'ecosistema', label: 'Ecosistema', icon: LayoutGrid },
    { id: 'podcast', label: 'Podcast', icon: Podcast },
    { id: 'videos', label: 'Videos', icon: Video },
    { id: 'bitacora', label: 'Bitácora', icon: FileText },
    { id: 'simuladores', label: 'Simuladores', icon: Gamepad2 },
    { id: 'recursos', label: 'Recursos', icon: Library }
  ];

  const simulationOptions = [
    { id: 'sim-01', title: 'Conexión Biótica', type: 'ESG_CORE', difficulty: 1, duration: 15, icon: Sprout },
    { id: 'sim-02', title: 'Gobernanza Horizontal', type: 'SOCIAL', difficulty: 2, duration: 20, icon: Users },
    { id: 'sim-03', title: 'Infraestructura Circular', type: 'ECONOMIC', difficulty: 3, duration: 30, icon: CircuitBoard }
  ];

  const sectionContent = {
    ecosistema: {
      tag: "INFRAESTRUCTURA NARRATIVA",
      subtitle: "ecosistema vivo",
      desc: "Un espacio de intersección donde la gestión cultural y la sostenibilidad se encuentran para trazar nuevos caminos."
    },
    podcast: {
      tag: "AUDIO CORE",
      subtitle: "Bitácora de audio",
      desc: "Más de 200 horas de diálogos técnicos para humanizar la transición regenerativa en el territorio."
    },
    videos: {
      tag: "VISUAL LAYER",
      subtitle: "Documentación viva",
      desc: "Cápsulas visuales y narrativas transmedia que documentan los procesos de restauración biótica."
    },
    bitacora: {
      tag: "MEMORIA SISTÉMICA",
      subtitle: "Archivo de saberes",
      desc: "Análisis profundo y actualizaciones sobre la infraestructura de la regeneración y la acción colectiva."
    },
    simuladores: {
      tag: "STRATEGIC SIMULATION",
      subtitle: "serious games esg",
      desc: "Toma de decisiones estratégica basada en evidencia para criterios Ambientales, Sociales y de Gobernanza."
    },
    recursos: {
        tag: "KNOWLEDGE HUB",
        subtitle: "Biblioteca técnica",
        desc: "Acceso directo a papers, manuales, presentaciones y activos del ecosistema para la acción colectiva."
    }
  };

  const handlePlayPodcast = (episode: any) => {
    playEpisode(episode);
    setIsMinimized(false);
    handleEarnXP(150, "SINTONÍA_PODCAST");
  };

  return (
    <div className="bg-white text-zinc-900 min-h-screen font-body overflow-x-hidden selection:bg-[#00e1ff] selection:text-black">
      
      <header className="fixed top-0 left-0 right-0 z-[100] px-10 py-4 bg-zinc-950/85 backdrop-blur-md border-b border-white/10">
        <div className="max-w-[1800px] mx-auto flex justify-between items-center">
           <div className="flex items-center gap-8">
              <div className="flex items-center gap-3">
                 <div className="size-8 bg-white flex items-center justify-center text-zinc-900 border border-white/10">
                    <Star className="size-4" fill="currentColor" />
                 </div>
                 <div className="flex flex-col">
                    <span className="text-[7px] font-black tracking-[0.4em] text-zinc-500 uppercase">EDICIÓN_2026</span>
                    <span className="text-[10px] font-black uppercase text-white">{level}</span>
                 </div>
              </div>
           </div>

           <nav className="hidden lg:flex items-center gap-0.5 p-1 bg-black/40 border border-white/5 rounded-none">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => { setActiveTab(tab.id as any); setActiveGameId(null); }}
                        className={cn(
                            "flex items-center gap-2 px-5 py-2 text-[8px] font-black uppercase tracking-[0.15em] transition-all whitespace-nowrap rounded-none border-b-2 border-transparent",
                            activeTab === tab.id 
                                ? "bg-white text-black shadow-lg border-white" 
                                : "text-zinc-500 hover:text-white"
                        )}
                    >
                        <tab.icon className={cn("size-3", activeTab === tab.id ? "text-black" : "")} />
                        {tab.label}
                    </button>
                ))}
            </nav>

            <div className="flex items-center gap-6">
                 <div className="hidden md:flex items-center gap-2 text-zinc-500">
                    <Award className={cn("size-4", xp >= 500 ? "text-[#ffe106]" : "opacity-20")} />
                    <ShieldCheck className={cn("size-4", xp >= 1500 ? "text-[#00e1ff]" : "opacity-20")} />
                 </div>
                 <div className="h-8 w-px bg-white/10 hidden md:block" />
                 <div className="hidden md:flex items-center gap-2 group cursor-pointer text-zinc-500 hover:text-white transition-colors">
                    <span className="text-[8px] font-black tracking-widest uppercase">NÚCLEO_SOSTENIBLE</span>
                    <ArrowUpRight className="size-3 opacity-40 group-hover:opacity-100" />
                 </div>
                 <Sheet>
                    <SheetTrigger asChild>
                      <button className="lg:hidden p-2 text-white hover:bg-white/10 transition-colors">
                        <Menu className="size-5" />
                      </button>
                    </SheetTrigger>
                    <SheetContent side="bottom" className="h-[60vh] bg-zinc-950 text-white rounded-none border-t border-white/10 p-0">
                      <div className="p-8 space-y-6">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-500 mb-8">Navegación Vital</h4>
                        <div className="grid grid-cols-2 gap-4">
                          {tabs.map((tab) => (
                            <button
                              key={tab.id}
                              onClick={() => { setActiveTab(tab.id as any); setActiveGameId(null); }}
                              className={cn(
                                "flex flex-col items-center justify-center gap-3 p-6 border transition-all rounded-none",
                                activeTab === tab.id 
                                  ? "bg-white text-black border-white" 
                                  : "bg-white/5 text-zinc-500 border-white/5 hover:border-white/20"
                              )}
                            >
                              <tab.icon className={cn("size-6", activeTab === tab.id ? "text-black" : "")} />
                              <span className="text-[8px] font-black uppercase tracking-widest">{tab.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </SheetContent>
                 </Sheet>
            </div>
        </div>
      </header>

      <section className="relative h-screen min-h-[600px] flex items-center justify-start px-8 md:px-24 overflow-hidden bg-zinc-950">
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute inset-0 z-0"
          >
            <Image
              src={activeTab === 'ecosistema' ? "https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=2000&auto=format&fit=crop" : 
                   activeTab === 'podcast' ? "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=2000&auto=format&fit=crop" :
                   activeTab === 'videos' ? "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2000&auto=format&fit=crop" :
                   activeTab === 'bitacora' ? "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=2000&auto=format&fit=crop" :
                   activeTab === 'recursos' ? "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=2000&auto=format&fit=crop" :
                   "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=2000"}
              alt={activeTab}
              fill
              priority
              className="object-cover grayscale brightness-[0.45] contrast-125"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/10 to-transparent" />
          </motion.div>
        </AnimatePresence>

        <div className="relative z-10 w-full">
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeTab}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col lg:flex-row items-center justify-between gap-12"
            >
              <div className="space-y-2 max-w-4xl">
                <div className="mb-12">
                  <h1 className="text-[15vw] lg:text-[12vw] font-black tracking-tighter leading-[0.8] text-[#00e1ff] uppercase">
                    MEDULAR
                  </h1>
                </div>

                <div className="pl-2 space-y-12">
                  <div className="space-y-10">
                    <div className="inline-block px-4 py-1.5 bg-zinc-900/80 text-zinc-400 text-[9px] font-black tracking-[0.4em] uppercase rounded-none border border-white/5 backdrop-blur-md">
                      {sectionContent[activeTab].tag}
                    </div>

                    <div className="space-y-1">
                      <span className="block text-2xl md:text-3xl font-medium lowercase tracking-tight text-[#00e1ff] italic leading-none">
                        {sectionContent[activeTab].subtitle}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-8 border-l-2 border-[#ffe106] pl-8">
                    <p className="text-xl md:text-2xl text-white/40 font-medium leading-relaxed italic max-w-xl">
                      {sectionContent[activeTab].desc}
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative group lg:mr-64 mt-32 lg:mt-48">
                 <div className="absolute inset-0 bg-[#00e1ff]/10 blur-[80px] rounded-none opacity-50" />
                 <IntegricultLogo className="size-48 lg:h-[20rem] lg:w-[20rem] text-white/80 drop-shadow-[0_0_20px_rgba(0,225,255,0.1)] relative z-10 transition-transform duration-1000 group-hover:scale-105" />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <main className="max-w-[1800px] mx-auto px-8 md:px-24 py-32">
        <AnimatePresence mode="wait">
            {activeTab === 'ecosistema' && (
                <motion.div 
                    key="ecosistema"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-32"
                >
                    <div className="text-center space-y-12 py-10">
                       <h2 className="text-5xl md:text-[6.5rem] font-black text-zinc-900 tracking-tighter uppercase leading-[0.85] max-w-6xl mx-auto">
                         REGENERAR EL TERRITORIO <br/> 
                         <span className="text-[#ffe106]">ES TEJER COMUNIDAD.</span>
                       </h2>
                       <div className="w-16 h-1 bg-zinc-900 mx-auto rounded-none" />
                       <p className="text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto font-medium leading-relaxed italic">
                         Nuestra infraestructura narrativa busca activar nuevas formas de pensar, sentir y actuar colectivamente frente a los desafíos del presente.
                       </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="p-10 bg-zinc-900 text-white border border-zinc-800 space-y-8 flex flex-col justify-between rounded-none shadow-2xl relative overflow-hidden">
                           <div className="absolute top-0 right-0 p-4 opacity-10"><Zap className="size-20" /></div>
                           <div className="space-y-4 relative z-10">
                              <span className="text-[7px] font-black text-[#ffe106] tracking-[0.5em] uppercase">MISIÓN_DIARIA</span>
                              <h3 className="text-3xl font-black uppercase tracking-tighter leading-none italic">Sintoniza el <br/> Futuro</h3>
                              <p className="text-xs text-zinc-400 font-medium leading-relaxed">Completa el análisis del último podcast para desbloquear el siguiente protocolo territorial.</p>
                           </div>
                           <div className="space-y-4 relative z-10">
                              <div className="flex justify-between text-[6px] font-black text-zinc-500 uppercase tracking-widest">
                                 <span>BONUS_XP</span>
                                 <span>+150 XP</span>
                              </div>
                              <button 
                                onClick={() => { setActiveTab('podcast'); }}
                                className="w-full py-4 bg-[#ffe106] text-black font-black uppercase tracking-[0.4em] text-[8px] hover:bg-white transition-all rounded-none"
                              >
                                COMENZAR_MISIÓN
                              </button>
                           </div>
                        </div>

                        <div className="space-y-6 p-12 bg-zinc-50 rounded-none border border-zinc-100 shadow-sm transition-all duration-700 hover:bg-white hover:border-zinc-200 flex flex-col justify-center">
                            <div className="flex items-center gap-3 text-[#00e1ff] mb-4">
                               <ShieldCheck className="size-8" />
                               <span className="text-[8px] font-black uppercase tracking-[0.3em]">RECONOCIMIENTO</span>
                            </div>
                            <h3 className="text-3xl font-black text-zinc-900 uppercase tracking-tighter italic leading-none">Visión Sistémica</h3>
                            <p className="text-base text-zinc-500 leading-relaxed font-medium mt-4">
                              Entendemos la sostenibilidad no como un destino, sino como un proceso vivo de regeneración constante.
                            </p>
                        </div>
                        <div className="space-y-6 p-12 bg-zinc-50 rounded-none border border-zinc-100 shadow-sm transition-all duration-700 hover:bg-white hover:border-zinc-200 flex flex-col justify-center">
                            <div className="flex items-center gap-3 text-[#ffe106] mb-4">
                               <Award className="size-8" />
                               <span className="text-[8px] font-black uppercase tracking-[0.3em]">IMPACTO_COLECTIVO</span>
                            </div>
                            <h3 className="text-3xl font-black text-zinc-900 uppercase tracking-tighter italic leading-none">Propósito Transmedia</h3>
                            <p className="text-base text-zinc-500 leading-relaxed font-medium mt-4">
                              Creamos puentes entre el conocimiento técnico y la acción ciudadana a través de múltiples capas.
                            </p>
                        </div>
                    </div>
                </motion.div>
            )}

            {activeTab === 'recursos' && (
                <motion.div 
                    key="recursos"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {RESOURCES_DATA.map((resource) => (
                        <ResourceCard 
                            key={resource.id} 
                            {...resource} 
                            onEarnXP={handleEarnXP}
                        />
                    ))}
                </motion.div>
            )}

            {activeTab === 'bitacora' && (
                <motion.div 
                    key="bitacora"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-16"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                        {BLOG_POSTS.map((post) => (
                            <BlogPostCard 
                                key={post.id} 
                                post={post} 
                                onEarnXP={handleEarnXP}
                            />
                        ))}
                    </div>
                </motion.div>
            )}

            {activeTab === 'simuladores' && (
                <motion.div 
                    key="simuladores"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-20"
                >
                    {activeGameId ? (
                        <div className="bg-zinc-950 p-16 border border-zinc-800 min-h-[600px] relative rounded-none shadow-2xl">
                             <SimpleSimulator 
                                onBack={() => setActiveGameId(null)} 
                                onComplete={(amount) => handleEarnXP(amount, "COMPLETAR_SIMULACIÓN")}
                             />
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {simulationOptions.map(sim => (
                                <SimulationCard 
                                    key={sim.id} 
                                    {...sim} 
                                    onLaunch={() => { setActiveGameId(sim.id); }} 
                                />
                            ))}
                        </div>
                    )}
                </motion.div>
            )}

            {activeTab === 'videos' && (
                <motion.div 
                    key="videos"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                    {VIDEOS_DATA.map((video) => (
                        <div key={video.id} className="group flex flex-col h-full bg-white border border-zinc-100 rounded-none overflow-hidden transition-all duration-700 hover:border-zinc-800">
                            <div className="relative aspect-video w-full overflow-hidden bg-zinc-950">
                               <Image src={video.media.hero_image} alt={video.title} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 opacity-60 group-hover:opacity-100" />
                               <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-700" />
                               <a 
                                  onClick={() => handleEarnXP(video.xpReward, "VISUALIZAR_CAPSULA")}
                                  href={video.media.externalUrl} 
                                  target="_blank" 
                                  rel="noopener noreferrer" 
                                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-700"
                                >
                                  <div className="size-16 rounded-none bg-white flex items-center justify-center shadow-2xl">
                                     <Play className="size-6 ml-1 text-black fill-black" />
                                  </div>
                               </a>
                            </div>
                            <div className="p-10 space-y-3">
                               <div className="flex items-center gap-2 text-[8px] font-black text-[#00e1ff] uppercase tracking-[0.3em]">
                                  <CircuitBoard className="size-4" /> EXP_VISUAL_01
                               </div>
                               <h4 className="text-2xl font-black uppercase tracking-tighter text-zinc-900">{video.title}</h4>
                               <p className="text-base text-zinc-400 font-medium italic leading-relaxed">{video.description}</p>
                            </div>
                        </div>
                    ))}
                </motion.div>
            )}

            {activeTab === 'podcast' && (
                <motion.div 
                    key="podcast"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {MOCK_EPISODES.map((ep) => (
                        <div 
                            key={ep.id}
                            onClick={() => handlePlayPodcast(ep)}
                            className="group bg-white border border-zinc-100 flex flex-col h-full transition-all duration-1000 cursor-pointer overflow-hidden rounded-none hover:border-zinc-800"
                        >
                            <div className="relative aspect-video w-full overflow-hidden">
                              <Image src={ep.imageUrl} alt={ep.title} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" />
                              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors" />
                              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all">
                                <div className="size-16 rounded-none bg-white flex items-center justify-center shadow-2xl">
                                   <Play className="size-6 ml-1 text-black fill-black" />
                                </div>
                              </div>
                            </div>
                            <div className="p-8 space-y-4 flex-1 flex flex-col justify-between">
                              <div className="space-y-3">
                                <div className="flex justify-between items-start">
                                   <span className="text-[8px] font-black text-[#00e1ff] uppercase tracking-[0.3em] line-clamp-1">{ep.guests[0]}</span>
                                   <span className="text-[7px] font-black bg-zinc-900 text-[#ffe106] px-2 py-0.5">+150 XP</span>
                                </div>
                                <h4 className="text-2xl font-black uppercase tracking-tighter leading-tight text-zinc-900">{ep.title}</h4>
                                <p className="text-sm text-zinc-400 font-medium line-clamp-3 leading-relaxed italic">{ep.description}</p>
                              </div>
                              <div className="pt-6 border-t border-zinc-50 flex items-center justify-between">
                                 <span className="text-[8px] font-black text-zinc-300 uppercase tracking-widest">{ep.duration} MIN</span>
                                 <ChevronRight className="size-4 text-zinc-200 group-hover:text-zinc-900 group-hover:translate-x-1 transition-all" />
                              </div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            )}
        </AnimatePresence>
      </main>

      <footer className="bg-zinc-950 text-white pt-32 pb-16 px-8 md:px-24 border-t border-white/5 relative overflow-hidden">
        <div className="max-w-[1800px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 relative z-10">
            <div className="space-y-8">
                <div className="space-y-3">
                  <h2 className="text-6xl font-black uppercase leading-[0.8] tracking-tighter text-[#00e1ff]">
                      MEDULAR_
                  </h2>
                  <span className="text-[#00e1ff] text-[8px] font-black tracking-[0.5em] uppercase block">INFRAESTRUCTURA DE NARRATIVAS REGENERATIVAS</span>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-10 items-start">
                <div className="space-y-6">
                    <span className="text-[8px] font-black uppercase tracking-[0.5em] text-zinc-700">PLATAFORMAS</span>
                    <ul className="space-y-4 font-black uppercase text-sm tracking-widest italic text-zinc-500">
                        <li className="hover:text-[#00e1ff] cursor-pointer transition-colors flex items-center gap-2 group">
                           Integricult <ArrowUpRight className="size-3 opacity-0 group-hover:opacity-100 transition-all" />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
      </footer>

      <AnimatePresence>
        {currentEpisode && (
          <motion.div 
            initial={{ y: 200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 200, opacity: 0 }}
            className={cn(
              "fixed bottom-8 right-8 z-[110] transition-all duration-700 ease-in-out", 
              isMinimized ? "max-w-64" : "max-w-[380px] w-full"
            )}
          >
            <div className="bg-zinc-950 text-white shadow-2xl rounded-none overflow-hidden border border-white/10">
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-black/40">
                 <div className="flex items-center gap-3 overflow-hidden">
                   <div className="relative size-8 flex-shrink-0">
                      <Podcast className={cn("size-full text-[#00e1ff]", !isMinimized && "animate-pulse")} />
                   </div>
                   <div className="flex flex-col overflow-hidden">
                      <span className="text-[7px] font-black uppercase tracking-[0.5em] text-zinc-600">SINTONÍA VIVA</span>
                      <span className="text-xs font-black truncate leading-none uppercase tracking-tighter mt-1">
                        {currentEpisode.title}
                      </span>
                   </div>
                 </div>
                 <div className="flex items-center gap-1.5">
                   <button onClick={() => setIsMinimized(!isMinimized)} className="p-1.5 hover:bg-white/10 rounded-none transition-all">
                     {isMinimized ? <Maximize2 className="size-3" /> : <Minimize2 className="size-3" />}
                   </button>
                   <button onClick={() => closePlayer()} className="p-1.5 hover:bg-white/10 rounded-none transition-all text-[#00e1ff]">
                     <X className="size-4" />
                   </button>
                 </div>
              </div>
              
              <div className={cn("transition-all duration-700 ease-in-out overflow-hidden flex flex-col", isMinimized ? "h-0" : "h-[360px]")}>
                <div className="relative h-40 w-full flex-shrink-0">
                   <Image src={currentEpisode.imageUrl} alt={currentEpisode.title} fill className="object-cover brightness-50 contrast-125" />
                   <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
                   <div className="absolute bottom-6 left-6 right-6">
                      <h4 className="text-xl font-black tracking-tighter leading-[0.9] uppercase italic">{currentEpisode.title}</h4>
                   </div>
                </div>
                <div className="flex-1 bg-zinc-950">
                  <iframe 
                    src={`https://widget.spreaker.com/player?episode_id=${currentEpisode.id}&theme=dark&autoplay=true&playlist=false&chapters=false&sharing=false&download=false`} 
                    width="100%" 
                    height="100%" 
                    frameBorder="0" 
                    title="Audio Core" 
                    className="grayscale" 
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
            display: none;
        }
        .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
