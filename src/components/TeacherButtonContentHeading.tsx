import { ReactNode } from 'react';

interface TeacherButtonContentHeadingProps {
  children: ReactNode;
}

function TeacherButtonContentHeading({ children }: TeacherButtonContentHeadingProps) {
  return (
    <h4
      className="mb-3 mt-4 text-lg font-bold"
      style={{ color: 'var(--professor-bg, #80298F)', fontFamily: 'myriad-vf, sans-serif' }}
    >
      {children}
    </h4>
  );
}

export default TeacherButtonContentHeading;
