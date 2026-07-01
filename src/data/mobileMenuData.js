const mobileMenuData = [
  {
    id: 'about',
    label: '학원소개',
    children: [
      { id: 'about-main', label: '학원 소개', path: '/about' },
      { id: 'teachers', label: '강사진 소개', path: '/about/teachers' },
      { id: 'awards', label: '수상 실적', path: '/about/awards' },
      { id: 'location', label: '오시는 길', path: '/about/location' },
    ],
  },
  {
    id: 'education',
    label: '교육과정',
    children: [
      { id: 'gifted-science', label: '영재고·과학고 내신', path: '/courses/gifted' },
      { id: 'olympiad', label: '정보올림피아드', path: '/courses/olympiad' },
      { id: 'certification', label: 'OA·자격증', path: '/courses/certification' },
    ],
  },
  {
    id: 'notice',
    label: '공지 및 소식',
    children: [
      { id: 'opening-news', label: '개강소식', path: '/opening-news' },
      { id: 'notice-main', label: '공지사항', path: '/notice' },
      { id: 'news', label: '뉴스', path: '/news' },
    ],
  },
  {
    id: 'seminar',
    label: '교육설명회',
    children: [
      { id: 'seminar-video', label: '설명회 영상', path: '/seminar' },
      { id: 'seminar-apply', label: '설명회 신청', path: '/seminar/apply' },
    ],
  },
]

export default mobileMenuData
