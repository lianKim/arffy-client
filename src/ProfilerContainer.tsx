import React, { Profiler } from 'react';

interface ProfilerContainerProps {
  id: string;
  children: React.ReactNode;
}

export default function ProfilerContainer({
  id,
  children,
}: ProfilerContainerProps) {
  const profilerCallback: React.ProfilerOnRenderCallback = (
    id,
    phase,
    actualDuration,
    baseDuration,
    startTime,
    commitTime,
    interactions,
  ) => {
    console.table({ id, phase, actualDuration, baseDuration });
  };

  return (
    <Profiler id={id} onRender={profilerCallback}>
      {children}
    </Profiler>
  );
}
