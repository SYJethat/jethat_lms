'use client';

import React from 'react';
import DashboardLessonView from '@/components/DashboardLessonView';

export default function DashboardLessonPage({ params }: { params: { id: string } }) {
  return <DashboardLessonView lessonIdProp={params.id} />;
}
