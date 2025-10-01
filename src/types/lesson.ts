
// Lesson Types
export type LessonType = "Quiz" | "Online" | "Offline" | "Reading";

// Quiz Content
export interface Quiz {
  question: string;
  answers: string[];
  correctAnswers: number[];
}


export interface OnlineContentStruct {
  videoUrl: string;
}

export interface OfflineContentStruct {
  location: string;
  date: string; 
}

export interface QuizContentStruct {
  quiz: Quiz[];
}
export interface ReadingContentStruct {
  content: string;
}

export interface Lesson {
  id: string;
  type: LessonType;
  title: string;
  moduleId: string;
  courseId: string;
  description: string;
  duration: number;
  quizContent?: Quiz[];
  onlineContent?: OnlineContentStruct;
  offlineContent?: OfflineContentStruct;
  readingContent?: ReadingContentStruct;
  createdAt: string;
  updatedAt: string;
  position: number;
}
// Attendance Status
export type LessonAttendanceStatus =
  | "present"
  | "absent_excused"
  | "absent_unexcused"
  | "late";

// Lesson Attendance
export interface LessonAttendance {
  user_id: string; 
  lesson_id: string; 
  course_id: string; 
  quiz_point?: number;
  duration?: number;
  status: LessonAttendanceStatus;
  device_id?: string; 
  moderator_id: string; 
  created_at: string; 
  updated_at: string; 
}

// Request/Response DTOs

export interface LessonRequest {
  title: string;
  description?: string;
  duration: number;
  type: LessonType;
  quizContent?: Quiz[];
  videoUrl?: string;
  location?: string;
  date?: string;
  readingContent?: string;
  position?: number;
}

export interface UpdateStatusLessonAttendanceReq {
  status: LessonAttendanceStatus;
  device_id: string;
  duration: number;
  answer: number[][];
}
// export interface UpdateStatusLessonAttendanceReq {
//   status: string; 
//   deviceId: string;
//   duration: number;
//   answer: number[][];
// }

export interface GetUserAttendanceLessonReq {
  page: number;
  page_size: number;
  status?: LessonAttendanceStatus;
}

export interface GetUserAttendanceLessonRp {
  userId: string;
  username: string;
  email: string;
  status: string;
  quizPoint?: number;
  duration?: number;
  deviceId?: string;
  moderatorId: string;
}