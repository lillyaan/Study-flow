import { PastPaper } from '../types';

export const PAST_PAPERS: PastPaper[] = [
  {
    id: '1',
    subject: 'Mathematics',
    grade: 12,
    year: 2023,
    month: 'November',
    paperNumber: 1,
    board: 'DBE',
    province: 'Gauteng',
    url: 'https://www.education.gov.za/Portals/0/CD/2023%20November%20Exams/Mathematics%20P1%20Nov%202023%20Eng.pdf',
    memoUrl: 'https://www.education.gov.za/Portals/0/CD/2023%20November%20Exams/Mathematics%20P1%20Nov%202023%20Memo%20Eng.pdf'
  },
  {
    id: '2',
    subject: 'Physical Sciences',
    grade: 12,
    year: 2023,
    month: 'November',
    paperNumber: 1,
    board: 'DBE',
    province: 'Western Cape',
    url: 'https://www.education.gov.za/Portals/0/CD/2023%20November%20Exams/Physical%20Sciences%20P1%20Nov%202023%20Eng.pdf',
    memoUrl: 'https://www.education.gov.za/Portals/0/CD/2023%20November%20Exams/Physical%20Sciences%20P1%20Nov%202023%20Memo%20Eng.pdf'
  },
  {
    id: '3',
    subject: 'Life Sciences',
    grade: 12,
    year: 2023,
    month: 'November',
    paperNumber: 1,
    board: 'IEB',
    url: 'https://www.ieb.co.za/wp-content/uploads/2023/11/Life-Sciences-P1-Nov-2023.pdf',
    memoUrl: 'https://www.ieb.co.za/wp-content/uploads/2023/11/Life-Sciences-P1-Nov-2023-Memo.pdf'
  },
  {
    id: '4',
    subject: 'Accounting',
    grade: 12,
    year: 2022,
    month: 'November',
    paperNumber: 1,
    board: 'SACAI',
    url: 'https://www.sacai.org.za/wp-content/uploads/2022/11/Accounting-P1-Nov-2022.pdf',
    memoUrl: 'https://www.sacai.org.za/wp-content/uploads/2022/11/Accounting-P1-Nov-2022-Memo.pdf'
  },
  {
    id: '5',
    subject: 'English Home Language',
    grade: 12,
    year: 2023,
    month: 'November',
    paperNumber: 1,
    board: 'DBE',
    province: 'KwaZulu-Natal',
    url: 'https://www.education.gov.za/Portals/0/CD/2023%20November%20Exams/English%20HL%20P1%20Nov%202023.pdf',
    memoUrl: 'https://www.education.gov.za/Portals/0/CD/2023%20November%20Exams/English%20HL%20P1%20Nov%202023%20Memo.pdf'
  },
  {
    id: 'ieb-maths-2023',
    subject: 'Mathematics',
    grade: 12,
    year: 2023,
    month: 'November',
    paperNumber: 1,
    board: 'IEB',
    url: 'https://www.ieb.co.za/assessment/high-schools/national-senior-certificate/nsc-past-papers',
    memoUrl: 'https://www.ieb.co.za/assessment/high-schools/national-senior-certificate/nsc-past-papers'
  },
  {
    id: 'ieb-physics-2023',
    subject: 'Physical Sciences',
    grade: 12,
    year: 2023,
    month: 'November',
    paperNumber: 1,
    board: 'IEB',
    url: 'https://www.ieb.co.za/assessment/high-schools/national-senior-certificate/nsc-past-papers',
    memoUrl: 'https://www.ieb.co.za/assessment/high-schools/national-senior-certificate/nsc-past-papers'
  },
  {
    id: 'ieb-business-2023',
    subject: 'Business Studies',
    grade: 12,
    year: 2023,
    month: 'November',
    paperNumber: 1,
    board: 'IEB',
    url: 'https://www.ieb.co.za/assessment/high-schools/national-senior-certificate/nsc-past-papers',
    memoUrl: 'https://www.ieb.co.za/assessment/high-schools/national-senior-certificate/nsc-past-papers'
  },
  {
    id: 'ieb-english-2023',
    subject: 'English Home Language',
    grade: 12,
    year: 2023,
    month: 'November',
    paperNumber: 1,
    board: 'IEB',
    url: 'https://www.ieb.co.za/assessment/high-schools/national-senior-certificate/nsc-past-papers',
    memoUrl: 'https://www.ieb.co.za/assessment/high-schools/national-senior-certificate/nsc-past-papers'
  },
  {
    id: 'ieb-accounting-p1-may-2021',
    subject: 'Accounting',
    grade: 12,
    year: 2021,
    month: 'June', // May/June session
    paperNumber: 1,
    board: 'IEB',
    url: 'https://www.ieb.co.za/assessment/high-schools/national-senior-certificate/nsc-past-papers',
    memoUrl: 'https://www.ieb.co.za/assessment/high-schools/national-senior-certificate/nsc-past-papers'
  },
  {
    id: 'ieb-accounting-p2-may-2021',
    subject: 'Accounting',
    grade: 12,
    year: 2021,
    month: 'June', // May/June session
    paperNumber: 2,
    board: 'IEB',
    url: 'https://www.ieb.co.za/assessment/high-schools/national-senior-certificate/nsc-past-papers',
    memoUrl: 'https://www.ieb.co.za/assessment/high-schools/national-senior-certificate/nsc-past-papers'
  }
];

export const GRADES = [10, 11, 12];

export const PROVINCES = [
  'Gauteng',
  'Western Cape',
  'KwaZulu-Natal',
  'Eastern Cape',
  'Free State',
  'Limpopo',
  'Mpumalanga',
  'North West',
  'Northern Cape'
];

export const BOARDS = ['DBE', 'IEB', 'SACAI'];

export const SUBJECTS = [
  'Mathematics',
  'Mathematical Literacy',
  'Physical Sciences',
  'Life Sciences',
  'Accounting',
  'Business Studies',
  'Economics',
  'History',
  'Geography',
  'English Home Language',
  'English First Additional Language',
  'Afrikaans Home Language',
  'Afrikaans First Additional Language',
  'IsiZulu Home Language',
  'IsiXhosa Home Language',
  'Sepedi Home Language',
  'Sesotho Home Language',
  'Setswana Home Language',
  'SiSwati Home Language',
  'Tshivenda Home Language',
  'Xitsonga Home Language',
  'IsiNdebele Home Language'
];
