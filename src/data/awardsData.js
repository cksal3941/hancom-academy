function deriveDecade(year) {
  return `${Math.floor(year / 10) * 10}s`
}

const rawData = [
  {
    year: 2026,
    competitions: [
      {
        title: '한국정보올림피아드(KOI) 1차대회',
        notes: ['1차대회는 별도 시상 없이 2차대회 진출자를 선발합니다.'],
        categories: [
          {
            title: '진출 현황',
            awards: [
              { rank: '준비 중', winners: [] },
            ],
          },
        ],
      },
      {
        title: '2026년 제6회 청소년 IT경시대회',
        notes: [],
        categories: [
          {
            title: '알고리즘',
            awards: [
              { rank: '대상', winners: [{ name: '유성준', school: '박문중' }] },
              {
                rank: '금상',
                winners: [
                  { name: '박진우', school: '대모고' },
                  { name: '유재원', school: '분당중' },
                ],
              },
              { rank: '은상', winners: [{ name: '이준서', school: '청계초' }] },
              {
                rank: '장려상',
                winners: [
                  { name: '김준서', school: '경기과고' },
                  { name: '문시우', school: '경기과고' },
                  { name: '김현우', school: '부림중' },
                  { name: '안호준', school: '서일중' },
                  { name: '유재윤', school: '상현중' },
                  { name: '이호준', school: '보평중' },
                  { name: '이현준', school: '대왕초' },
                  { name: '최우찬', school: '대방초' },
                ],
              },
              { rank: '특별상', winners: [{ name: '한찬희', school: '정계중' }] },
            ],
          },
          {
            title: 'C언어',
            awards: [
              { rank: '대상', winners: [{ name: '이현준', school: '대왕초' }] },
              { rank: '금상', winners: [{ name: '최지모', school: '대구과고' }] },
              { rank: '장려상', winners: [{ name: '최태윤', school: '경기과고' }] },
            ],
          },
        ],
      },
    ],
    notes: [],
  },
  {
    year: 2025,
    competitions: [
      {
        title: '한국정보올림피아드(KOI) 1차대회',
        notes: ['1차대회는 별도 시상 없이 2차대회 진출자를 선발합니다.'],
        categories: [
          {
            title: '진출 현황',
            awards: [
              { rank: '준비 중', winners: [] },
            ],
          },
        ],
      },
      {
        title: '2025년 제5회 청소년 IT경시대회',
        notes: [],
        categories: [
          {
            title: '알고리즘',
            awards: [
              { rank: '대상', winners: [{ name: '유성준', school: '박문중' }] },
              {
                rank: '금상',
                winners: [
                  { name: '박진우', school: '대모고' },
                  { name: '유재원', school: '분당중' },
                ],
              },
              { rank: '은상', winners: [{ name: '이준서', school: '청계초' }] },
              {
                rank: '장려상',
                winners: [
                  { name: '김준서', school: '경기과고' },
                  { name: '문시우', school: '경기과고' },
                  { name: '김현우', school: '부림중' },
                  { name: '안호준', school: '서일중' },
                  { name: '유재윤', school: '상현중' },
                  { name: '이호준', school: '보평중' },
                  { name: '이현준', school: '대왕초' },
                  { name: '최우찬', school: '대방초' },
                ],
              },
              { rank: '특별상', winners: [{ name: '한찬희', school: '정계중' }] },
            ],
          },
          {
            title: 'C언어',
            awards: [
              { rank: '대상', winners: [{ name: '이현준', school: '대왕초' }] },
              { rank: '금상', winners: [{ name: '최지모', school: '대구과고' }] },
              { rank: '장려상', winners: [{ name: '최태윤', school: '경기과고' }] },
            ],
          },
        ],
      },
    ],
    notes: [],
  },
  {
    year: 2024,
    competitions: [],
    notes: ['수상 실적 자료를 정리 중입니다.'],
  },
  {
    year: 2023,
    competitions: [],
    notes: ['수상 실적 자료를 정리 중입니다.'],
  },
  {
    year: 2022,
    competitions: [],
    notes: ['수상 실적 자료를 정리 중입니다.'],
  },
  {
    year: 2021,
    competitions: [],
    notes: ['수상 실적 자료를 정리 중입니다.'],
  },
  {
    year: 2020,
    competitions: [],
    notes: ['수상 실적 자료를 정리 중입니다.'],
  },
  {
    year: 2019,
    competitions: [],
    notes: ['수상 실적 자료를 정리 중입니다.'],
  },
  {
    year: 2018,
    competitions: [],
    notes: ['수상 실적 자료를 정리 중입니다.'],
  },
  {
    year: 2015,
    competitions: [],
    notes: ['수상 실적 자료를 정리 중입니다.'],
  },
  {
    year: 2010,
    competitions: [],
    notes: ['수상 실적 자료를 정리 중입니다.'],
  },
  {
    year: 2009,
    competitions: [],
    notes: ['수상 실적 자료를 정리 중입니다.'],
  },
  {
    year: 2005,
    competitions: [],
    notes: ['수상 실적 자료를 정리 중입니다.'],
  },
  {
    year: 2000,
    competitions: [],
    notes: ['수상 실적 자료를 정리 중입니다.'],
  },
]

export const awardsData = rawData
  .map((entry) => ({ ...entry, decade: deriveDecade(entry.year) }))
  .sort((a, b) => b.year - a.year)

const uniqueDecades = [...new Set(awardsData.map((d) => d.decade))]

export const decades = uniqueDecades.sort((a, b) => {
  const numA = parseInt(a, 10)
  const numB = parseInt(b, 10)
  return numB - numA
})
