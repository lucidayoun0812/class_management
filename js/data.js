/**
 * 우리 반 쑥쑥 성장 일기 (Ssook-Ssook Growth Diary)
 * 기본 데이터 정의 및 로컬 스토리지 관리 모듈
 */

const STORAGE_KEY = 'SSOOK_CLASS_DATA_V3';

// 1. 성장 단계 기준 정의 (단일 성장 시스템: 누적 칭찬 도장 개수 기반)
const GROWTH_STAGES = [
  {
    level: 1,
    name: '꼬마 새싹',
    icon: '🌱',
    minStamps: 0,
    maxStamps: 9,
    nextThreshold: 10,
    cheerText: '두근두근 씨앗에서 파릇파릇 새싹이 돋아났어요!',
    bgColor: '#e8f5e9',
    accentColor: '#43a047'
  },
  {
    level: 2,
    name: '작은 묘목',
    icon: '🌿',
    minStamps: 10,
    maxStamps: 29,
    nextThreshold: 30,
    cheerText: '싱그러운 잎이 쑥쑥 늘어나며 튼튼해지고 있어요!',
    bgColor: '#e0f2f1',
    accentColor: '#00897b'
  },
  {
    level: 3,
    name: '큰 나무',
    icon: '🌳',
    minStamps: 30,
    maxStamps: 59,
    nextThreshold: 60,
    cheerText: '새들도 쉬어가는 멋지고 푸르른 아름드리 나무가 되었어요!',
    bgColor: '#e8eaf6',
    accentColor: '#3949ab'
  },
  {
    level: 4,
    name: '열매 맺은 황금 나무',
    icon: '🍎✨',
    minStamps: 60,
    maxStamps: 99,
    nextThreshold: null, // 최고 단계
    cheerText: '와아! 황금빛 열매가 주렁주렁 열린 전설의 나무 완성!',
    bgColor: '#fff8e1',
    accentColor: '#f57f17'
  }
];

// 2. 20명 맞춤형 1인 1역 사전 정의 (총 20개 역할)
// 칠판이 2명, 환기도우미 1명, 우유배달 2명, 독서기록장 나눔이 4명(독서기록장, 세줄쓰기, 일기장, 동시-받아쓰기),
// 날짜도우미 1명, 급식요정 1명, 촉촉이 1명, 전원맨 1명, 가통맨 1명, 미덕이 6명
const DEFAULT_ROLES = [
  // 칠판이 2명
  { id: 'role-blackboard-1', category: '칠판이', num: 1, subText: '', icon: '🧹', title: '칠판이 1', desc: '쉬는 시간마다 칠판을 깨끗하게 닦아 교실을 환하게 만들어요!' },
  { id: 'role-blackboard-2', category: '칠판이', num: 2, subText: '', icon: '🧹', title: '칠판이 2', desc: '쉬는 시간마다 칠판을 깨끗하게 닦아 교실을 환하게 만들어요!' },

  // 환기도우미 1명
  { id: 'role-ventilation', category: '환기도우미', num: null, subText: '', icon: '🪟', title: '환기도우미', desc: '아침과 점심시간에 창문을 활짝 열어 상쾌한 공기를 채워요!' },

  // 우유배달 2명
  { id: 'role-milk-1', category: '우유배달', num: 1, subText: '', icon: '🥛', title: '우유배달 1', desc: '친구들에게 시원하고 신선한 우유를 사이좋게 하나씩 나눠줘요!' },
  { id: 'role-milk-2', category: '우유배달', num: 2, subText: '', icon: '🥛', title: '우유배달 2', desc: '친구들에게 시원하고 신선한 우유를 사이좋게 하나씩 나눠줘요!' },

  // 독서기록장 나눔이 4명 (독서기록장, 세줄쓰기, 일기장, 동시-받아쓰기)
  { id: 'role-reading-1', category: '독서기록장 나눔이', num: 1, subText: '독서기록장', icon: '📖', title: '독서기록장 나눔이 1 (독서기록장)', desc: '친구들의 소중한 독서기록장을 걷고 예쁘게 나누어줘요!' },
  { id: 'role-reading-2', category: '독서기록장 나눔이', num: 2, subText: '세줄쓰기', icon: '✍️', title: '독서기록장 나눔이 2 (세줄쓰기)', desc: '매일매일 생각 쑥쑥! 세줄쓰기 공책을 바르게 정리하고 나눠줘요!' },
  { id: 'role-reading-3', category: '독서기록장 나눔이', num: 3, subText: '일기장', icon: '📔', title: '독서기록장 나눔이 3 (일기장)', desc: '친구들의 두근두근 일기장을 가지런히 모아서 선생님께 전달해요!' },
  { id: 'role-reading-4', category: '독서기록장 나눔이', num: 4, subText: '동시·받아쓰기', icon: '📝', title: '독서기록장 나눔이 4 (동시·받아쓰기)', desc: '동시와 받아쓰기 학습장을 친구들에게 순서대로 나누어줘요!' },

  // 날짜도우미 1명
  { id: 'role-calendar', category: '날짜도우미', num: null, subText: '', icon: '📅', title: '날짜도우미', desc: '매일 아침 교실 달력과 칠판 날짜를 확인하고 친구들에게 알려줘요!' },

  // 급식요정 1명
  { id: 'role-lunch', category: '급식요정', num: null, subText: '', icon: '🍱', title: '급식요정', desc: '맛있는 급식 시간! 식사 질서를 지키고 잔반 줄이기를 도와요!' },

  // 촉촉이 1명
  { id: 'role-moist', category: '촉촉이', num: null, subText: '', icon: '🪴💦', title: '촉촉이', desc: '우리 반 초록 화분에 사랑의 분무기를 칙칙 뿌려 촉촉하게 가꿔요!' },

  // 전원맨 1명
  { id: 'role-power', category: '전원맨', num: null, subText: '', icon: '💡🔌', title: '전원맨', desc: '교실 밖으로 나갈 때 전등과 선풍기 스위치, 전자칠판 전원을 지켜요!' },

  // 가통맨 1명
  { id: 'role-notice', category: '가통맨', num: null, subText: '', icon: '📬📄', title: '가통맨', desc: '중요한 가정통신문과 알림장 종이를 빠짐없이 친구들에게 전달해요!' },

  // 미덕이 6명
  { id: 'role-virtue-1', category: '미덕이', num: 1, subText: '', icon: '💖', title: '미덕이 1', desc: '친구들의 착하고 따뜻한 미덕 행동을 찾아 다정하게 칭찬해요!' },
  { id: 'role-virtue-2', category: '미덕이', num: 2, subText: '', icon: '🌟', title: '미덕이 2', desc: '친구들에게 고운 말과 배려를 실천하며 교실을 훈훈하게 만들어요!' },
  { id: 'role-virtue-3', category: '미덕이', num: 3, subText: '', icon: '🤝', title: '미덕이 3', desc: '도움이 필요한 친구를 먼저 발견하고 사이좋게 손을 내밀어요!' },
  { id: 'role-virtue-4', category: '미덕이', num: 4, subText: '', icon: '🌈', title: '미덕이 4', desc: '우리 반에 웃음과 긍정 에너지를 가득 채우는 행복 비타민 역할!' },
  { id: 'role-virtue-5', category: '미덕이', num: 5, subText: '', icon: '🎁', title: '미덕이 5', desc: '친구들의 좋은 점을 비밀 칭찬 쪽지에 적어 마음을 전해요!' },
  { id: 'role-virtue-6', category: '미덕이', num: 6, subText: '', icon: '🍀', title: '미덕이 6', desc: '다투지 않고 화목하게 지낼 수 있도록 다정한 평화 지킴이!' }
];

// 역할 표시용 HTML 포맷터 (다인수 역할 번호는 귀엽고 예쁜 다른 폰트 배지로 포맷팅)
function formatRoleTitleHtml(role) {
  if (!role) return '';
  if (role.num) {
    const sub = role.subText ? ` <span class="role-sub-pill">${role.subText}</span>` : '';
    return `<span class="role-base-title">${role.category || role.title}</span> <span class="role-multi-num-pill">${role.num}</span>${sub}`;
  }
  return `<span class="role-base-title">${role.title}</span>`;
}

// 드롭다운 및 텍스트 전용 레이블 포맷터 (동그라미 숫자 기호 사용)
function formatRoleOptionLabel(role) {
  if (!role) return '';
  const circleNums = ['', '①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧', '⑨', '⑩'];
  if (role.num) {
    const numChar = circleNums[role.num] || String(role.num);
    const sub = role.subText ? ` (${role.subText})` : '';
    return `${role.icon} ${role.category || role.title} ${numChar}${sub}`;
  }
  return `${role.icon} ${role.title}`;
}

window.formatRoleTitleHtml = formatRoleTitleHtml;
window.formatRoleOptionLabel = formatRoleOptionLabel;

// 3. 초등 2학년 특권 보물 쿠폰 사전 정의
const DEFAULT_COUPONS = [
  {
    id: 'coupon-1',
    icon: '🪑',
    title: '원하는 자리 앉기',
    price: 15,
    desc: '하루 동안 내가 가장 앉고 싶은 특별한 자리를 직접 골라 앉아요!'
  },
  {
    id: 'coupon-2',
    icon: '🍱',
    title: '급식 1등으로 받기',
    price: 10,
    desc: '배고픈 점심시간! 우리 반에서 제일 먼저 맛있는 음식을 받아요.'
  },
  {
    id: 'coupon-3',
    icon: '✋💌',
    title: '선생님과 하이파이브 & 칭찬 편지',
    price: 5,
    desc: '선생님과 신나게 손뼉을 마주치고 비밀 손편지를 선물받아요!'
  },
  {
    id: 'coupon-4',
    icon: '🎵',
    title: '쉬는 시간 오늘의 DJ',
    price: 8,
    desc: '쉬는 시간에 우리 교실에 내가 좋아하는 신나는 음악을 틀어요!'
  },
  {
    id: 'coupon-5',
    icon: '🎟️',
    title: '숙제 1회 자유 이용권',
    price: 20,
    desc: '일기나 과제 1개를 기분 좋게 쉴 수 있는 마법의 황금 티켓!'
  },
  {
    id: 'coupon-6',
    icon: '🧁',
    title: '선생님과의 달콤 간식 타임',
    price: 25,
    desc: '방과 후에 선생님과 맛있는 간식을 먹으며 즐거운 이야기를 나눠요.'
  },
  {
    id: 'coupon-7',
    icon: '🤝',
    title: '단짝과 1인 1역 함께하기',
    price: 5,
    desc: '친한 친구와 하루 동안 재미있는 역할을 함께 도우며 협동해요!'
  },
  {
    id: 'coupon-8',
    icon: '⏱️',
    title: '5분 자유 놀이 보너스',
    price: 12,
    desc: '우리 반 보드게임이나 종이접기를 5분 더 여유롭게 즐겨요!'
  }
];

// 4. 20명 학생 초기 데이터 생성 (새 명렬표 반영 & 20개 역할 1:1 매칭 & 점수 0 초기화)
function generateDefaultStudents() {
  const studentList = [
    { number: 1, name: '김이안' },
    { number: 2, name: '김지한' },
    { number: 3, name: '박서우' },
    { number: 4, name: '유성원' },
    { number: 5, name: '이건율' },
    { number: 6, name: '이지호' },
    { number: 7, name: '정민호' },
    { number: 8, name: '조승현' },
    { number: 9, name: '주승원' },
    { number: 10, name: '최지율' },
    { number: 41, name: '권하율' },
    { number: 42, name: '김다윤' },
    { number: 43, name: '김나윤' },
    { number: 44, name: '송화윤' },
    { number: 45, name: '왕재이' },
    { number: 46, name: '윤은재' },
    { number: 47, name: '이현서' },
    { number: 48, name: '정단비' },
    { number: 49, name: '정서진' },
    { number: 50, name: '조은서' }
  ];

  return studentList.map((st, index) => {
    // 20개 역할과 20명 학생을 1:1로 매칭
    const role = DEFAULT_ROLES[index] || DEFAULT_ROLES[0];
    return {
      id: `student-${st.number}`,
      number: st.number,
      name: st.name,
      avatarSeed: st.number,
      totalStamps: 0, // 모든 스코어 0으로 초기 세팅
      currentCoins: 0, // 모든 스코어 0으로 초기 세팅
      roleId: role.id,
      coupons: [],
      pendingCouponRequests: []
    };
  });
}

// 5. 로컬스토리지 입출력 컨트롤러
class DataStore {
  constructor() {
    this.state = this.loadState();
  }

  getDefaultState() {
    return {
      students: generateDefaultStudents(),
      roles: JSON.parse(JSON.stringify(DEFAULT_ROLES)),
      coupons: JSON.parse(JSON.stringify(DEFAULT_COUPONS)),
      approvalRequests: []
    };
  }

  loadState() {
    try {
      if (localStorage.getItem('SSOOK_CLASS_DATA_V1')) {
        localStorage.removeItem('SSOOK_CLASS_DATA_V1');
      }
      if (localStorage.getItem('SSOOK_CLASS_DATA_V2')) {
        localStorage.removeItem('SSOOK_CLASS_DATA_V2');
      }
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        const parsed = JSON.parse(data);
        // 구버전 학생 데이터이거나 20개 역할이 일치하지 않는 경우 새 역할 구성으로 강제 초기화
        const isOldRoles = !parsed.roles || parsed.roles.length !== 20 || parsed.roles[0].id !== 'role-blackboard-1';
        const isOldStudents = !parsed.students || !parsed.students[0] || parsed.students[0].name !== '김이안';
        if (isOldRoles || isOldStudents) {
          const freshState = this.getDefaultState();
          this.saveState(freshState);
          return freshState;
        }
        return parsed;
      }
    } catch (e) {
      console.warn('LocalStorage 로드 실패, 기본 데이터로 시작합니다.', e);
    }
    const defaultState = this.getDefaultState();
    this.saveState(defaultState);
    return defaultState;
  }

  saveState(state = this.state) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error('LocalStorage 저장 실패:', e);
    }
  }

  resetToDefault() {
    this.state = this.getDefaultState();
    this.saveState();
    return this.state;
  }

  // 학생 단일 조회
  getStudent(studentId) {
    return this.state.students.find(s => s.id === studentId);
  }

  // 번호와 이름으로 학생 조회 (로그인 검증)
  findStudentByNumberAndName(number, name) {
    const num = Number(number);
    const cleanName = (name || '').trim().replace(/\s+/g, '');
    if (!num || !cleanName) return null;
    return this.state.students.find(s => s.number === num && s.name.trim().replace(/\s+/g, '') === cleanName);
  }

  // 학생 도장 지급/차감 (단위: 100개 미만 제한 보장)
  updateStudentStamps(studentId, delta) {
    const student = this.getStudent(studentId);
    if (!student) return null;

    if (delta > 0) {
      student.totalStamps = Math.min(99, student.totalStamps + delta);
      student.currentCoins = Math.min(99, student.currentCoins + delta);
    } else {
      // 차감 시 보유 코인만 차감 (최소 0), 누적 칭찬 도장은 캐릭터 성장을 위해 감소하지 않음
      student.currentCoins = Math.max(0, student.currentCoins + delta);
    }

    this.saveState();
    return student;
  }

  // 전체 학생 일괄 +1 지급
  giveStampToAll(delta = 1) {
    this.state.students.forEach(student => {
      student.totalStamps = Math.min(99, student.totalStamps + delta);
      student.currentCoins = Math.min(99, student.currentCoins + delta);
    });
    this.saveState();
    return this.state.students;
  }

  // 학생 역할 배정
  assignRole(studentId, roleId) {
    const student = this.getStudent(studentId);
    if (student) {
      student.roleId = roleId;
      this.saveState();
    }
    return student;
  }

  // 새 역할 추가
  addRole(icon, title, desc) {
    const newRole = {
      id: `role-${Date.now()}`,
      icon: icon || '🌟',
      title: title.trim(),
      desc: desc.trim()
    };
    this.state.roles.push(newRole);
    this.saveState();
    return newRole;
  }

  // 새 쿠폰 추가
  addCoupon(icon, title, price, desc) {
    const newCoupon = {
      id: `coupon-${Date.now()}`,
      icon: icon || '🎁',
      title: title.trim(),
      price: Math.max(1, Math.min(99, Number(price) || 10)),
      desc: desc.trim()
    };
    this.state.coupons.push(newCoupon);
    this.saveState();
    return newCoupon;
  }

  // 쿠폰 삭제
  deleteCoupon(couponId) {
    this.state.coupons = this.state.coupons.filter(c => c.id !== couponId);
    this.saveState();
  }

  // 학생의 쿠폰 구매 신청 생성
  requestCouponPurchase(studentId, couponId) {
    const student = this.getStudent(studentId);
    const coupon = this.state.coupons.find(c => c.id === couponId);
    if (!student || !coupon) return { success: false, message: '학생 또는 쿠폰 정보가 없습니다.' };

    if (student.currentCoins < coupon.price) {
      return { success: false, message: '보물 코인이 부족해요!' };
    }

    const newRequest = {
      requestId: `req-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      studentId: student.id,
      studentName: student.name,
      studentNumber: student.number,
      couponId: coupon.id,
      couponTitle: coupon.title,
      couponIcon: coupon.icon,
      price: coupon.price,
      requestDate: new Date().toLocaleDateString('ko-KR')
    };

    this.state.approvalRequests.push(newRequest);
    this.saveState();
    return { success: true, request: newRequest };
  }

  // 선생님의 쿠폰 교환 승인 처리
  approveCouponRequest(requestId) {
    const reqIndex = this.state.approvalRequests.findIndex(r => r.requestId === requestId);
    if (reqIndex === -1) return { success: false };

    const request = this.state.approvalRequests[reqIndex];
    const student = this.getStudent(request.studentId);

    if (!student) {
      this.state.approvalRequests.splice(reqIndex, 1);
      this.saveState();
      return { success: false };
    }

    // 잔액 재확인 후 차감
    if (student.currentCoins >= request.price) {
      student.currentCoins -= request.price;
      
      // 학생의 보유 쿠폰함에 추가
      student.coupons.push({
        instanceId: `user-coupon-${Date.now()}`,
        couponId: request.couponId,
        title: request.couponTitle,
        icon: request.couponIcon,
        obtainedDate: new Date().toLocaleDateString('ko-KR'),
        isUsed: false
      });
    }

    // 승인 목록에서 제거
    this.state.approvalRequests.splice(reqIndex, 1);
    this.saveState();
    return { success: true, student, request };
  }

  // 선생님의 쿠폰 교환 거절/반려 처리
  rejectCouponRequest(requestId) {
    const reqIndex = this.state.approvalRequests.findIndex(r => r.requestId === requestId);
    if (reqIndex !== -1) {
      this.state.approvalRequests.splice(reqIndex, 1);
      this.saveState();
      return true;
    }
    return false;
  }

  // 학생의 쿠폰 사용 완료 처리
  useStudentCoupon(studentId, instanceId) {
    const student = this.getStudent(studentId);
    if (!student) return false;

    const coupon = student.coupons.find(c => c.instanceId === instanceId);
    if (coupon) {
      coupon.isUsed = true;
      coupon.usedDate = new Date().toLocaleDateString('ko-KR');
      this.saveState();
      return true;
    }
    return false;
  }

  // 현재 누적 도장 수로 단계(Level) 정보 계산
  getGrowthStage(totalStamps) {
    for (let i = GROWTH_STAGES.length - 1; i >= 0; i--) {
      if (totalStamps >= GROWTH_STAGES[i].minStamps) {
        return GROWTH_STAGES[i];
      }
    }
    return GROWTH_STAGES[0];
  }
}

// 전역 인스턴스
window.classDataStore = new DataStore();
