/**
 * 우리 반 쑥쑥 성장 일기 (Ssook-Ssook Growth Diary)
 * 앱 메인 컨트롤러 및 뷰 라우팅 로직
 */

document.addEventListener('DOMContentLoaded', () => {
  // ================= 1. 애플리케이션 상태 & 설정 =================
  const TEACHER_PASSWORD = 'Beme0812!';

  const state = {
    currentView: 'studentLogin', // 'studentLogin' | 'studentPicker' | 'studentDashboard' | 'shop' | 'teacherDashboard'
    selectedStudentId: null,
    teacherTab: 'tabStudents',
    pendingBuyCoupon: null,
    selectedUseCoupon: null,
    searchQuery: ''
  };

  const store = window.classDataStore;
  const sound = window.soundManager;
  const visuals = window.CharacterVisuals;
  const confetti = window.confettiEffect;

  // ================= 2. DOM 요소 캐싱 =================
  // 헤더
  const appHeader = document.getElementById('appHeader');
  const logoBtn = document.getElementById('logoBtn');
  const quickDateBadge = document.getElementById('quickDateBadge');
  const soundToggleBtn = document.getElementById('soundToggleBtn');
  const soundIcon = document.getElementById('soundIcon');
  const modeSwitchBtn = document.getElementById('modeSwitchBtn');
  const teacherAlertBadge = document.getElementById('teacherAlertBadge');

  // 뷰 섹션들
  const viewStudentLogin = document.getElementById('viewStudentLogin');
  const viewStudentPicker = document.getElementById('viewStudentPicker');
  const viewStudentDashboard = document.getElementById('viewStudentDashboard');
  const viewShop = document.getElementById('viewShop');
  const viewTeacherDashboard = document.getElementById('viewTeacherDashboard');

  // 학생 로그인 화면 요소
  const studentLoginForm = document.getElementById('studentLoginForm');
  const loginStudentNumber = document.getElementById('loginStudentNumber');
  const loginStudentName = document.getElementById('loginStudentName');
  const loginAlertBox = document.getElementById('loginAlertBox');
  const loginAlertText = document.getElementById('loginAlertText');
  const studentLoginBtn = document.getElementById('studentLoginBtn');
  const openRosterModalBtn = document.getElementById('openRosterModalBtn');
  const viewAllCardsBtn = document.getElementById('viewAllCardsBtn');
  const backToLoginFromPickerBtn = document.getElementById('backToLoginFromPickerBtn');

  // 출석부 확인 모달
  const rosterModal = document.getElementById('rosterModal');
  const rosterQuickGrid = document.getElementById('rosterQuickGrid');
  const closeRosterModalBtn = document.getElementById('closeRosterModalBtn');

  // 선생님 모드 비밀번호 모달
  const teacherAuthModal = document.getElementById('teacherAuthModal');
  const teacherAuthForm = document.getElementById('teacherAuthForm');
  const teacherPasswordInput = document.getElementById('teacherPasswordInput');
  const toggleTeacherPwBtn = document.getElementById('toggleTeacherPwBtn');
  const teacherAuthError = document.getElementById('teacherAuthError');
  const cancelTeacherAuthBtn = document.getElementById('cancelTeacherAuthBtn');
  const confirmTeacherAuthBtn = document.getElementById('confirmTeacherAuthBtn');

  // 학생 선택 화면
  const totalStudentCount = document.getElementById('totalStudentCount');
  const studentsGrid = document.getElementById('studentsGrid');

  // 학생 대시보드
  const backToPickerBtn = document.getElementById('backToPickerBtn');
  const viewClassmatesFromDashBtn = document.getElementById('viewClassmatesFromDashBtn');
  const dashProfileSummary = document.getElementById('dashProfileSummary');
  const openShopFromDashBtn = document.getElementById('openShopFromDashBtn');
  const dashStageBadge = document.getElementById('dashStageBadge');
  const dashTotalStampsBadge = document.getElementById('dashTotalStampsBadge');
  const characterCanvasWrapper = document.getElementById('characterCanvasWrapper');
  const growthTitleText = document.getElementById('growthTitleText');
  const growthRemainText = document.getElementById('growthRemainText');
  const growthProgressBar = document.getElementById('growthProgressBar');
  const growthStepsIndicators = document.getElementById('growthStepsIndicators');
  const dashCurrentCoins = document.getElementById('dashCurrentCoins');
  const dashRoleIcon = document.getElementById('dashRoleIcon');
  const dashRoleTitle = document.getElementById('dashRoleTitle');
  const dashRoleDesc = document.getElementById('dashRoleDesc');
  const dashMyCouponCount = document.getElementById('dashMyCouponCount');
  const dashMyCouponsList = document.getElementById('dashMyCouponsList');

  // 상점 화면
  const backFromShopBtn = document.getElementById('backFromShopBtn');
  const shopUserCoinBalance = document.getElementById('shopUserCoinBalance');
  const shopCouponsGrid = document.getElementById('shopCouponsGrid');

  // 선생님 대시보드
  const bulkPlusOneBtn = document.getElementById('bulkPlusOneBtn');
  const resetDemoDataBtn = document.getElementById('resetDemoDataBtn');
  const exitTeacherBtn = document.getElementById('exitTeacherBtn');
  const teacherTabs = document.querySelectorAll('.teacher-tab');
  const tabContents = document.querySelectorAll('.teacher-tab-content');
  const teacherSearchInput = document.getElementById('teacherSearchInput');
  const statTotalStamps = document.getElementById('statTotalStamps');
  const statTotalCoins = document.getElementById('statTotalCoins');
  const teacherCardsGrid = document.getElementById('teacherCardsGrid');
  const rolesStudentList = document.getElementById('rolesStudentList');
  const rolePresetList = document.getElementById('rolePresetList');
  const openAddRoleModalBtn = document.getElementById('openAddRoleModalBtn');
  const approvalsListContainer = document.getElementById('approvalsListContainer');
  const tabApprovalCount = document.getElementById('tabApprovalCount');
  const openAddCouponModalBtn = document.getElementById('openAddCouponModalBtn');
  const teacherCouponsGrid = document.getElementById('teacherCouponsGrid');

  // 모달들
  const buyConfirmModal = document.getElementById('buyConfirmModal');
  const buyModalCouponPreview = document.getElementById('buyModalCouponPreview');
  const calcMyCoin = document.getElementById('calcMyCoin');
  const calcPrice = document.getElementById('calcPrice');
  const calcRemain = document.getElementById('calcRemain');
  const cancelBuyBtn = document.getElementById('cancelBuyBtn');
  const confirmBuyBtn = document.getElementById('confirmBuyBtn');

  const useCouponModal = document.getElementById('useCouponModal');
  const useCouponModalBody = document.getElementById('useCouponModalBody');
  const closeUseModalBtn = document.getElementById('closeUseModalBtn');
  const confirmUseCouponBtn = document.getElementById('confirmUseCouponBtn');

  const celebrationOverlay = document.getElementById('celebrationOverlay');
  const celebIcon = document.getElementById('celebIcon');
  const celebTitle = document.getElementById('celebTitle');
  const celebDesc = document.getElementById('celebDesc');

  const addRoleModal = document.getElementById('addRoleModal');
  const newRoleIconInput = document.getElementById('newRoleIconInput');
  const newRoleTitleInput = document.getElementById('newRoleTitleInput');
  const newRoleDescInput = document.getElementById('newRoleDescInput');
  const cancelAddRoleBtn = document.getElementById('cancelAddRoleBtn');
  const confirmAddRoleBtn = document.getElementById('confirmAddRoleBtn');

  const addCouponModal = document.getElementById('addCouponModal');
  const newCouponIconInput = document.getElementById('newCouponIconInput');
  const newCouponTitleInput = document.getElementById('newCouponTitleInput');
  const newCouponPriceInput = document.getElementById('newCouponPriceInput');
  const newCouponDescInput = document.getElementById('newCouponDescInput');
  const cancelAddCouponBtn = document.getElementById('cancelAddCouponBtn');
  const confirmAddCouponBtn = document.getElementById('confirmAddCouponBtn');

  const toastContainer = document.getElementById('toastContainer');

  // ================= 3. 날짜 및 초기 UI 세팅 =================
  function initHeader() {
    const now = new Date();
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    const dateStr = `${now.getFullYear()}년 ${now.getMonth() + 1}월 ${now.getDate()}일 (${days[now.getDay()]})`;
    if (quickDateBadge) {
      quickDateBadge.textContent = `📅 ${dateStr}`;
    }

    // 소리 초기 상태
    updateSoundIcon();
    updateApprovalBadge();
  }

  function updateSoundIcon() {
    if (soundIcon) {
      soundIcon.textContent = sound.isMuted ? '🔇' : '🔊';
      soundToggleBtn.title = sound.isMuted ? '소리 켜기' : '소리 끄기';
    }
  }

  function updateApprovalBadge() {
    const pendingCount = store.state.approvalRequests.length;
    if (teacherAlertBadge) {
      teacherAlertBadge.textContent = pendingCount;
      if (pendingCount > 0) {
        teacherAlertBadge.classList.remove('hidden');
      } else {
        teacherAlertBadge.classList.add('hidden');
      }
    }
    if (tabApprovalCount) {
      tabApprovalCount.textContent = pendingCount;
    }
  }

  // ================= 4. 뷰 라우팅 (화면 전환) =================
  function switchView(viewName) {
    state.currentView = viewName;
    sound.playPop();

    // 모든 뷰 숨김
    [viewStudentLogin, viewStudentPicker, viewStudentDashboard, viewShop, viewTeacherDashboard].forEach(el => {
      if (el) el.classList.add('hidden');
    });

    // 헤더 모드 버튼 텍스트/스타일 전환
    const modeIcon = document.getElementById('modeIcon');
    const modeText = document.getElementById('modeText');

    if (viewName === 'teacherDashboard') {
      modeSwitchBtn.className = 'mode-switch-btn student-badge';
      if (modeIcon) modeIcon.textContent = '🎒';
      if (modeText) modeText.textContent = '학생 화면으로';
    } else {
      modeSwitchBtn.className = 'mode-switch-btn teacher-badge';
      if (modeIcon) modeIcon.textContent = '👩‍🏫';
      if (modeText) modeText.textContent = '선생님 모드';
    }

    updateApprovalBadge();

    // 대상 뷰 활성화
    if (viewName === 'studentLogin') {
      viewStudentLogin.classList.remove('hidden');
      hideLoginAlert();
    } else if (viewName === 'studentPicker') {
      viewStudentPicker.classList.remove('hidden');
      renderStudentPicker();
    } else if (viewName === 'studentDashboard') {
      viewStudentDashboard.classList.remove('hidden');
      renderStudentDashboard();
    } else if (viewName === 'shop') {
      viewShop.classList.remove('hidden');
      renderShop();
    } else if (viewName === 'teacherDashboard') {
      viewTeacherDashboard.classList.remove('hidden');
      renderTeacherDashboard();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ================= 학생 로그인 처리 함수 =================
  function handleStudentLogin() {
    const numVal = (loginStudentNumber.value || '').trim();
    const nameVal = (loginStudentName.value || '').trim();

    if (!numVal || !nameVal) {
      showLoginAlert('출석 번호와 이름을 모두 입력해 주세요! ✏️');
      sound.playPop();
      triggerLoginShake();
      return;
    }

    const student = store.findStudentByNumberAndName(numVal, nameVal);

    if (!student) {
      showLoginAlert(`우리 반 명렬표에서 "${numVal}번 ${nameVal}" 학생을 찾을 수 없어요. 번호와 이름을 다시 확인해 볼까요? 🧐`);
      sound.playPop();
      triggerLoginShake();
      return;
    }

    // 로그인 성공
    hideLoginAlert();
    state.selectedStudentId = student.id;
    sound.playStampSound();
    confetti.fire(1500);
    showToast(`${student.number}번 ${student.name} 친구, 환영해요! 🌱`, 'success', '✨');
    switchView('studentDashboard');
  }

  function showLoginAlert(msg) {
    if (loginAlertBox && loginAlertText) {
      loginAlertText.textContent = msg;
      loginAlertBox.classList.remove('hidden');
    }
  }

  function hideLoginAlert() {
    if (loginAlertBox) {
      loginAlertBox.classList.add('hidden');
    }
  }

  function triggerLoginShake() {
    const card = document.querySelector('.login-card');
    if (card) {
      card.classList.remove('shake');
      void card.offsetWidth; // re-flow
      card.classList.add('shake');
      setTimeout(() => card.classList.remove('shake'), 600);
    }
  }

  // 명렬표 빠른 선택 팝업 렌더링
  function renderRosterQuickGrid() {
    if (!rosterQuickGrid) return;
    rosterQuickGrid.innerHTML = '';
    const students = store.state.students;

    students.forEach(st => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'roster-quick-btn';
      btn.innerHTML = `
        <span class="roster-num">${st.number}번</span>
        <span class="roster-name">${st.name}</span>
      `;
      btn.addEventListener('click', () => {
        sound.playPop();
        loginStudentNumber.value = st.number;
        loginStudentName.value = st.name;
        hideLoginAlert();
        rosterModal.classList.add('hidden');
        showToast(`${st.number}번 ${st.name} 입력 완료! [우리 반 들어가기]를 눌러주세요.`, 'info', '🎒');
        if (studentLoginBtn) studentLoginBtn.focus();
      });
      rosterQuickGrid.appendChild(btn);
    });
  }

  // ================= 선생님 모드 비밀번호 확인 로직 =================
  function openTeacherAuthModal() {
    if (teacherPasswordInput) {
      teacherPasswordInput.value = '';
      teacherPasswordInput.type = 'password';
    }
    if (toggleTeacherPwBtn) toggleTeacherPwBtn.textContent = '👁️';
    if (teacherAuthError) teacherAuthError.classList.add('hidden');
    if (teacherAuthModal) {
      teacherAuthModal.classList.remove('hidden');
      setTimeout(() => {
        if (teacherPasswordInput) teacherPasswordInput.focus();
      }, 100);
    }
  }

  function closeTeacherAuthModal() {
    if (teacherAuthModal) teacherAuthModal.classList.add('hidden');
    if (teacherPasswordInput) teacherPasswordInput.value = '';
    if (teacherAuthError) teacherAuthError.classList.add('hidden');
  }

  function handleTeacherAuth() {
    const inputPw = (teacherPasswordInput.value || '').trim();

    if (inputPw === TEACHER_PASSWORD) {
      closeTeacherAuthModal();
      sound.playStampSound();
      showToast('선생님 모드로 접속되었습니다. 👩‍🏫', 'success', '🔐');
      switchView('teacherDashboard');
    } else {
      sound.playBoing();
      if (teacherAuthError) teacherAuthError.classList.remove('hidden');
      const box = document.querySelector('.teacher-auth-modal-box');
      if (box) {
        box.classList.remove('shake');
        void box.offsetWidth;
        box.classList.add('shake');
        setTimeout(() => box.classList.remove('shake'), 600);
      }
      if (teacherPasswordInput) {
        teacherPasswordInput.value = '';
        teacherPasswordInput.focus();
      }
    }
  }

  // ================= 5. 토스트 알림 메시지 =================
  function showToast(message, type = 'info', icon = '💡') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 3000);
  }

  // ================= 6. 화면별 렌더링 함수들 =================

  // [1] 학생 선택 / 친구들 모아보기 화면 렌더링
  function renderStudentPicker() {
    studentsGrid.innerHTML = '';
    const students = store.state.students;
    totalStudentCount.textContent = `${students.length}명`;

    // 뒤로가기 버튼 안내 문구 동적 설정
    if (backToLoginFromPickerBtn) {
      if (state.selectedStudentId) {
        backToLoginFromPickerBtn.innerHTML = '<span>👈</span> <span>내 화면으로 돌아가기</span>';
      } else {
        backToLoginFromPickerBtn.innerHTML = '<span>👈</span> <span>로그인으로 돌아가기</span>';
      }
    }

    students.forEach(student => {
      const stage = store.getGrowthStage(student.totalStamps);
      const role = store.state.roles.find(r => r.id === student.roleId) || { icon: '⭐', title: '역할 정하는 중' };

      const card = document.createElement('div');
      card.className = 'student-card';
      card.innerHTML = `
        <span class="student-card-num">${student.number}</span>
        <div class="student-avatar-wrap">
          <span class="avatar-stage-icon">${stage.icon}</span>
        </div>
        <h3 class="student-name-text">${student.name}</h3>
        <span class="student-stage-pill stage-${stage.level}">${stage.name}</span>
        
        <div class="student-stats-row">
          <div class="stat-chip" title="누적 칭찬 도장">
            <span>💮</span>
            <strong>${student.totalStamps}</strong>개
          </div>
          <div class="stat-chip" title="보유 코인">
            <span>🪙</span>
            <strong>${student.currentCoins}</strong>개
          </div>
        </div>

        <div class="student-role-tag" title="${role.title}">
          <span>${role.icon}</span>
          <span>${role.title}</span>
        </div>
      `;

      card.addEventListener('click', () => {
        sound.playPop();
        if (state.selectedStudentId) {
          // 이미 로그인한 학생이 친구 카드를 구경할 때 (임의 조작/대리 접속 방지)
          showToast(`${student.number}번 ${student.name} 친구는 ${stage.level}단계 [${stage.name}]! (도장 ${student.totalStamps}개 / 코인 ${student.currentCoins}개)`, 'info', '🌱');
        } else {
          // 로그인 화면에서 들어왔을 때는 해당 학생으로 로그인
          state.selectedStudentId = student.id;
          if (loginStudentNumber) loginStudentNumber.value = student.number;
          if (loginStudentName) loginStudentName.value = student.name;
          showToast(`${student.number}번 ${student.name} 친구 로그인 완료! 🌱`, 'success', '🎒');
          switchView('studentDashboard');
        }
      });

      studentsGrid.appendChild(card);
    });
  }

  // [2] 학생 메인 대시보드 렌더링
  function renderStudentDashboard() {
    const student = store.getStudent(state.selectedStudentId);
    if (!student) {
      switchView('studentLogin');
      return;
    }

    const stage = store.getGrowthStage(student.totalStamps);
    const role = store.state.roles.find(r => r.id === student.roleId) || {
      icon: '🌱',
      title: '새싹 지킴이',
      desc: '오늘 하루도 친구들과 함께 씩씩하고 즐겁게 생활해요!'
    };

    // 상단 프로필 요약
    dashProfileSummary.innerHTML = `
      <div class="dash-avatar-badge">${stage.icon}</div>
      <div class="dash-welcome-text">
        <h1 class="dash-student-title">${student.number}번 ${student.name}</h1>
        <span class="dash-cheer-sub">${stage.cheerText}</span>
      </div>
    `;

    // 캐릭터 카드
    dashStageBadge.textContent = `${stage.level}단계: ${stage.name} ${stage.icon}`;
    dashStageBadge.className = `stage-badge stage-${stage.level}`;
    dashTotalStampsBadge.textContent = `누적 칭찬 도장: ${student.totalStamps}개`;

    // SVG 캐릭터 렌더링
    characterCanvasWrapper.innerHTML = visuals.getCharacterSvg(stage.level);

    // 성장 게이지 바 계산
    if (stage.nextThreshold) {
      const prevMin = stage.minStamps;
      const range = stage.nextThreshold - prevMin;
      const currentProgress = student.totalStamps - prevMin;
      const percent = Math.min(100, Math.max(0, Math.round((currentProgress / range) * 100)));
      const remainStamps = stage.nextThreshold - student.totalStamps;

      growthTitleText.textContent = `다음 단계(${stage.level + 1}단계)까지`;
      growthRemainText.textContent = `🌱 ${remainStamps}개 남았어요!`;
      growthProgressBar.style.width = `${percent}%`;
    } else {
      // 4단계 최고 레벨
      growthTitleText.textContent = '최고 성장 달성! 👑';
      growthRemainText.textContent = '🍎✨ 황금빛 전설의 나무 완성!';
      growthProgressBar.style.width = '100%';
    }

    // 4단계 점 표시자 업데이트
    const stepDots = growthStepsIndicators.querySelectorAll('.step-dot');
    stepDots.forEach((dot, idx) => {
      if (student.totalStamps >= GROWTH_STAGES[idx].minStamps) {
        dot.classList.add('reached');
      } else {
        dot.classList.remove('reached');
      }
    });

    // 보유 코인 잔액
    dashCurrentCoins.textContent = student.currentCoins;

    // 오늘 나의 1인 1역
    dashRoleIcon.textContent = role.icon;
    dashRoleTitle.textContent = role.title;
    dashRoleDesc.textContent = role.desc;

    // 보유 쿠폰 목록 렌더링
    renderStudentCoupons(student);
  }

  // 학생 보유 쿠폰 목록 렌더링
  function renderStudentCoupons(student) {
    dashMyCouponsList.innerHTML = '';
    const activeCoupons = student.coupons.filter(c => !c.isUsed);
    const pendingReqs = store.state.approvalRequests.filter(r => r.studentId === student.id);

    dashMyCouponCount.textContent = `${activeCoupons.length}장`;

    if (activeCoupons.length === 0 && pendingReqs.length === 0) {
      dashMyCouponsList.innerHTML = `
        <div class="empty-coupons-notice">
          <span>🎟️</span>
          <p>아직 보유한 보물 쿠폰이 없어요.<br>'보물 상점 가기' 버튼을 눌러 교환해 보세요!</p>
        </div>
      `;
      return;
    }

    // 승인 대기 중인 항목 먼저 표시
    pendingReqs.forEach(req => {
      const item = document.createElement('div');
      item.className = 'my-coupon-ticket';
      item.style.background = '#fffde7';
      item.style.borderColor = '#ffe082';
      item.innerHTML = `
        <div class="my-coupon-info">
          <span class="my-coupon-icon">${req.couponIcon}</span>
          <div>
            <div class="my-coupon-name">${req.couponTitle}</div>
            <small style="color: #8d6e63;">신청 날짜: ${req.requestDate}</small>
          </div>
        </div>
        <span class="my-coupon-state-pending">⏳ 선생님 승인 대기 중</span>
      `;
      dashMyCouponsList.appendChild(item);
    });

    // 사용 가능한 보유 쿠폰 표시
    activeCoupons.forEach(coupon => {
      const item = document.createElement('div');
      item.className = 'my-coupon-ticket';
      item.innerHTML = `
        <div class="my-coupon-info">
          <span class="my-coupon-icon">${coupon.icon}</span>
          <div>
            <div class="my-coupon-name">${coupon.title}</div>
            <small style="color: #6a1b9a;">획득 날짜: ${coupon.obtainedDate}</small>
          </div>
        </div>
        <button class="use-coupon-btn" data-id="${coupon.instanceId}">
          <span>🎟️ 사용하기</span>
        </button>
      `;

      item.querySelector('.use-coupon-btn').addEventListener('click', () => {
        openUseCouponModal(coupon);
      });

      dashMyCouponsList.appendChild(item);
    });
  }

  // [3] 보물 상점 렌더링
  function renderShop() {
    const student = store.getStudent(state.selectedStudentId);
    if (!student) {
      switchView('studentPicker');
      return;
    }

    shopUserCoinBalance.textContent = student.currentCoins;
    shopCouponsGrid.innerHTML = '';

    store.state.coupons.forEach(coupon => {
      const canAfford = student.currentCoins >= coupon.price;
      const card = document.createElement('div');
      card.className = `coupon-card ${canAfford ? 'affordable' : ''}`;

      card.innerHTML = `
        <div class="coupon-card-header">
          <div class="coupon-icon-box">${coupon.icon}</div>
          <h3 class="coupon-title">${coupon.title}</h3>
        </div>
        <p class="coupon-desc">${coupon.desc}</p>
        <div class="coupon-card-footer">
          <div class="coupon-price-tag">
            <span>🪙</span>
            <span>${coupon.price}개</span>
          </div>
          <button class="coupon-buy-btn ${canAfford ? 'btn-active' : 'btn-disabled'}">
            ${canAfford ? '신청하기 🚀' : '코인 부족 🔒'}
          </button>
        </div>
      `;

      const buyBtn = card.querySelector('.coupon-buy-btn');
      if (canAfford) {
        buyBtn.addEventListener('click', () => {
          openBuyConfirmModal(coupon, student);
        });
      } else {
        buyBtn.addEventListener('click', () => {
          sound.playBoing();
          showToast(`코인이 ${coupon.price - student.currentCoins}개 더 필요해요!`, 'warning', '🪙');
        });
      }

      shopCouponsGrid.appendChild(card);
    });
  }

  // [4] 선생님 대시보드 렌더링
  function renderTeacherDashboard() {
    updateApprovalBadge();
    updateTeacherStats();

    if (state.teacherTab === 'tabStudents') {
      renderTeacherStudents();
    } else if (state.teacherTab === 'tabRoles') {
      renderTeacherRoles();
    } else if (state.teacherTab === 'tabApprovals') {
      renderTeacherApprovals();
    } else if (state.teacherTab === 'tabShopManage') {
      renderTeacherCoupons();
    }
  }

  function updateTeacherStats() {
    const totalStamps = store.state.students.reduce((sum, s) => sum + s.totalStamps, 0);
    const totalCoins = store.state.students.reduce((sum, s) => sum + s.currentCoins, 0);
    if (statTotalStamps) statTotalStamps.textContent = totalStamps;
    if (statTotalCoins) statTotalCoins.textContent = totalCoins;
  }

  // 탭 1: 학생 목록 및 도장 지급 렌더링
  function renderTeacherStudents() {
    teacherCardsGrid.innerHTML = '';
    const query = state.searchQuery.trim().toLowerCase();

    const filtered = store.state.students.filter(s => {
      if (!query) return true;
      return s.name.toLowerCase().includes(query) || String(s.number).includes(query);
    });

    filtered.forEach(student => {
      const stage = store.getGrowthStage(student.totalStamps);
      const roleOptionsHtml = store.state.roles.map(r => `
        <option value="${r.id}" ${student.roleId === r.id ? 'selected' : ''}>
          ${r.icon} ${r.title}
        </option>
      `).join('');

      const card = document.createElement('div');
      card.className = 'teacher-student-card';
      card.innerHTML = `
        <div class="tsc-header">
          <div class="tsc-num">${student.number}</div>
          <div class="tsc-info">
            <h4 class="tsc-name">${student.name}</h4>
            <span class="tsc-stage">${stage.level}단계 ${stage.name}</span>
          </div>
          <div class="tsc-avatar">${stage.icon}</div>
        </div>

        <!-- 1인 1역 바로 변경 드롭다운 -->
        <div class="tsc-role-bar">
          <label class="tsc-role-label">⭐ 1인 1역:</label>
          <select class="tsc-role-select" data-student-id="${student.id}" title="1인 1역 바로 변경">
            ${roleOptionsHtml}
          </select>
        </div>

        <div class="tsc-balances">
          <div class="tsc-bal-item">
            <span class="tsc-bal-label">누적 칭찬 도장</span>
            <span class="tsc-bal-val">💮 ${student.totalStamps}개</span>
          </div>
          <div class="tsc-bal-item">
            <span class="tsc-bal-label">사용 가능 코인</span>
            <span class="tsc-bal-val coin">🪙 ${student.currentCoins}개</span>
          </div>
        </div>

        <div class="tsc-buttons-row">
          <button class="stamp-btn plus-1" title="+1 도장 지급">
            <span>💮 +1</span>
          </button>
          <button class="stamp-btn plus-5" title="+5 도장 듬뿍 선물">
            <span>⭐ +5</span>
          </button>
          <button class="stamp-btn minus-1" title="-1 코인 차감">
            <span>-1</span>
          </button>
        </div>
      `;

      // 1인 1역 바로 변경 이벤트
      const roleSelect = card.querySelector('.tsc-role-select');
      if (roleSelect) {
        roleSelect.addEventListener('change', (e) => {
          const newRoleId = e.target.value;
          store.assignRole(student.id, newRoleId);
          sound.playPop();
          const targetRole = store.state.roles.find(r => r.id === newRoleId);
          showToast(`${student.name} 학생의 1인 1역을 [${targetRole ? targetRole.title : ''}]으로 변경했습니다!`, 'success', '🧹');
        });
      }

      // 버튼 이벤트
      const prevLevel = stage.level;

      card.querySelector('.plus-1').addEventListener('click', () => {
        giveStampWithFeedback(student.id, 1, prevLevel);
      });
      card.querySelector('.plus-5').addEventListener('click', () => {
        giveStampWithFeedback(student.id, 5, prevLevel);
      });
      card.querySelector('.minus-1').addEventListener('click', () => {
        if (student.currentCoins <= 0) {
          sound.playBoing();
          showToast(`${student.name} 학생의 보유 코인이 0개입니다.`, 'warning');
          return;
        }
        store.updateStudentStamps(student.id, -1);
        sound.playBoing();
        renderTeacherDashboard();
        showToast(`${student.name} 학생 코인 1개 차감 완료`, 'info');
      });

      teacherCardsGrid.appendChild(card);
    });
  }

  // 도장 지급 공통 피드백 (효과음, 레벨업 체크, 축하 팝업)
  function giveStampWithFeedback(studentId, delta, prevLevel) {
    const updated = store.updateStudentStamps(studentId, delta);
    if (!updated) return;

    const newStage = store.getGrowthStage(updated.totalStamps);
    sound.playStampSound();
    sound.playCoinSound();

    // 진화(Level Up) 발생 여부 검사
    if (newStage.level > prevLevel) {
      sound.playLevelUpFanfare();
      confetti.fire(3500);
      showCelebrationOverlay(
        newStage.icon,
        `와아! ${updated.name} 나무가 성장했어요!`,
        `${newStage.level}단계 [${newStage.name}] 달성! 🎉`
      );
    } else {
      showToast(`${updated.name} 학생에게 +${delta} 도장 지급 완료! 💮`, 'success', '💮');
    }

    renderTeacherDashboard();
  }

  // 탭 2: 1인 1역 관리 렌더링
  function renderTeacherRoles() {
    rolesStudentList.innerHTML = '';
    rolePresetList.innerHTML = '';

    // 학생별 배정 목록
    store.state.students.forEach(student => {
      const row = document.createElement('div');
      row.className = 'role-assign-row';

      const optionsHtml = store.state.roles.map(r => `
        <option value="${r.id}" ${student.roleId === r.id ? 'selected' : ''}>
          ${r.icon} ${r.title}
        </option>
      `).join('');

      row.innerHTML = `
        <div class="rar-student">
          <span class="rar-num">${student.number}번</span>
          <span class="rar-name">${student.name}</span>
        </div>
        <select class="rar-select" data-student-id="${student.id}">
          ${optionsHtml}
        </select>
      `;

      row.querySelector('.rar-select').addEventListener('change', (e) => {
        store.assignRole(student.id, e.target.value);
        sound.playPop();
        showToast(`${student.name} 학생의 1인 1역을 변경했습니다.`, 'success', '🧹');
      });

      rolesStudentList.appendChild(row);
    });

    // 우측 역할 프리셋 목록
    store.state.roles.forEach(role => {
      const li = document.createElement('li');
      li.className = 'role-preset-item';
      li.innerHTML = `
        <span class="role-preset-icon">${role.icon}</span>
        <div>
          <strong class="role-preset-title">${role.title}</strong>
          <p class="role-preset-desc">${role.desc}</p>
        </div>
      `;
      rolePresetList.appendChild(li);
    });
  }

  // 탭 3: 쿠폰 신청 승인함 렌더링
  function renderTeacherApprovals() {
    approvalsListContainer.innerHTML = '';
    const requests = store.state.approvalRequests;

    if (requests.length === 0) {
      approvalsListContainer.innerHTML = `
        <div class="empty-approvals">
          <span>📬</span>
          <h3>현재 대기 중인 쿠폰 신청이 없습니다.</h3>
          <p>학생들이 보물 상점에서 쿠폰을 교환하면 이곳에 표시됩니다.</p>
        </div>
      `;
      return;
    }

    requests.forEach(req => {
      const student = store.getStudent(req.studentId);
      const studentCoins = student ? student.currentCoins : 0;

      const card = document.createElement('div');
      card.className = 'approval-card';
      card.innerHTML = `
        <div class="approval-left">
          <div class="approval-avatar">${req.couponIcon}</div>
          <div class="approval-details">
            <h4>${req.studentNumber}번 ${req.studentName} 학생의 [${req.couponTitle}] 신청</h4>
            <p>필요 코인: <strong>${req.price}개</strong> | 학생 현재 보유 코인: <strong>${studentCoins}개</strong> | 신청일: ${req.requestDate}</p>
          </div>
        </div>
        <div class="approval-actions">
          <button class="appr-btn reject">반려</button>
          <button class="appr-btn approve">승인 및 코인 차감 🚀</button>
        </div>
      `;

      // 승인 버튼
      card.querySelector('.approve').addEventListener('click', () => {
        const res = store.approveCouponRequest(req.requestId);
        if (res.success) {
          sound.playCoinSound();
          confetti.fire(2000);
          showToast(`${req.studentName} 학생의 [${req.couponTitle}] 승인 완료!`, 'success', '🎁');
          renderTeacherDashboard();
        } else {
          showToast('승인 처리 중 오류가 발생했습니다.', 'warning');
        }
      });

      // 반려 버튼
      card.querySelector('.reject').addEventListener('click', () => {
        store.rejectCouponRequest(req.requestId);
        sound.playBoing();
        showToast(`${req.studentName} 학생의 신청을 반려했습니다.`, 'info');
        renderTeacherDashboard();
      });

      approvalsListContainer.appendChild(card);
    });
  }

  // 탭 4: 쿠폰 상점 품목 관리 렌더링
  function renderTeacherCoupons() {
    teacherCouponsGrid.innerHTML = '';

    store.state.coupons.forEach(coupon => {
      const card = document.createElement('div');
      card.className = 'teacher-coupon-card';
      card.innerHTML = `
        <div class="tcc-header">
          <span class="tcc-icon">${coupon.icon}</span>
          <h4 class="tcc-title">${coupon.title}</h4>
        </div>
        <p class="tcc-desc">${coupon.desc}</p>
        <div class="tcc-footer">
          <span class="tcc-price">🪙 ${coupon.price} 코인</span>
          <button class="tcc-delete-btn" data-id="${coupon.id}">🗑️ 삭제</button>
        </div>
      `;

      card.querySelector('.tcc-delete-btn').addEventListener('click', () => {
        if (confirm(`'${coupon.title}' 쿠폰을 상점에서 삭제할까요?`)) {
          store.deleteCoupon(coupon.id);
          sound.playPop();
          showToast(`'${coupon.title}' 쿠폰이 삭제되었습니다.`, 'info');
          renderTeacherCoupons();
        }
      });

      teacherCouponsGrid.appendChild(card);
    });
  }

  // ================= 7. 모달 동작 로직 =================

  // [쿠폰 교환 확인 모달 열기] (2학년 맞춤형 뺄셈 시각화)
  function openBuyConfirmModal(coupon, student) {
    state.pendingBuyCoupon = coupon;
    sound.playPop();

    buyModalCouponPreview.innerHTML = `
      <div style="display:flex; align-items:center; gap:12px; margin-bottom:8px;">
        <span style="font-size:2.5rem;">${coupon.icon}</span>
        <div>
          <h4 style="font-family:var(--font-heading); font-size:1.4rem; color:var(--text-primary);">${coupon.title}</h4>
          <p style="font-size:0.95rem; color:var(--text-secondary);">${coupon.desc}</p>
        </div>
      </div>
    `;

    // 칠판 계산기 수치 바인딩
    calcMyCoin.textContent = student.currentCoins;
    calcPrice.textContent = coupon.price;
    calcRemain.textContent = student.currentCoins - coupon.price;

    buyConfirmModal.classList.remove('hidden');
  }

  cancelBuyBtn.addEventListener('click', () => {
    buyConfirmModal.classList.add('hidden');
    state.pendingBuyCoupon = null;
    sound.playPop();
  });

  confirmBuyBtn.addEventListener('click', () => {
    if (!state.pendingBuyCoupon || !state.selectedStudentId) return;

    const res = store.requestCouponPurchase(state.selectedStudentId, state.pendingBuyCoupon.id);
    buyConfirmModal.classList.add('hidden');

    if (res.success) {
      sound.playStampSound();
      updateApprovalBadge();
      showToast('선생님께 쿠폰 교환을 신청했어요! ✨ 곧 승인해 주실 거예요.', 'success', '💌');
      switchView('studentDashboard');
    } else {
      sound.playBoing();
      showToast(res.message, 'warning');
    }
    state.pendingBuyCoupon = null;
  });

  // [쿠폰 사용 티켓 모달 열기]
  function openUseCouponModal(coupon) {
    state.selectedUseCoupon = coupon;
    sound.playPop();

    useCouponModalBody.innerHTML = `
      <div style="background:#f3e5f5; border:3px dashed #ab47bc; border-radius:16px; padding:24px; text-align:center;">
        <span style="font-size:4rem; display:block; margin-bottom:8px;">${coupon.icon}</span>
        <h2 style="font-family:var(--font-heading); font-size:1.8rem; color:#4a148c; margin-bottom:6px;">${coupon.title}</h2>
        <p style="color:#7b1fa2; font-size:1.05rem;">선생님께 이 화면을 보여드리고 멋진 혜택을 누리세요!</p>
        <div style="margin-top:16px; font-size:0.9rem; color:#8e24aa;">발급일: ${coupon.obtainedDate}</div>
      </div>
    `;

    useCouponModal.classList.remove('hidden');
  }

  closeUseModalBtn.addEventListener('click', () => {
    useCouponModal.classList.add('hidden');
    state.selectedUseCoupon = null;
    sound.playPop();
  });

  confirmUseCouponBtn.addEventListener('click', () => {
    if (!state.selectedUseCoupon || !state.selectedStudentId) return;

    const success = store.useStudentCoupon(state.selectedStudentId, state.selectedUseCoupon.instanceId);
    useCouponModal.classList.add('hidden');

    if (success) {
      sound.playLevelUpFanfare();
      confetti.fire(2500);
      showToast('쿠폰 사용이 완료되었습니다! 🎈 참 잘했어요!', 'success', '🎉');
      renderStudentDashboard();
    }
    state.selectedUseCoupon = null;
  });

  // [축하 오버레이 표시]
  function showCelebrationOverlay(icon, title, desc) {
    celebIcon.textContent = icon;
    celebTitle.textContent = title;
    celebDesc.textContent = desc;
    celebrationOverlay.classList.remove('hidden');

    setTimeout(() => {
      celebrationOverlay.classList.add('hidden');
    }, 2800);
  }

  celebrationOverlay.addEventListener('click', () => {
    celebrationOverlay.classList.add('hidden');
  });

  // [새 1인 1역 추가 모달]
  openAddRoleModalBtn.addEventListener('click', () => {
    addRoleModal.classList.remove('hidden');
    sound.playPop();
  });

  cancelAddRoleBtn.addEventListener('click', () => {
    addRoleModal.classList.add('hidden');
  });

  confirmAddRoleBtn.addEventListener('click', () => {
    const icon = newRoleIconInput.value.trim() || '🌟';
    const title = newRoleTitleInput.value.trim();
    const desc = newRoleDescInput.value.trim();

    if (!title) {
      showToast('역할 이름을 입력해 주세요!', 'warning');
      return;
    }

    store.addRole(icon, title, desc);
    addRoleModal.classList.add('hidden');
    newRoleTitleInput.value = '';
    newRoleDescInput.value = '';
    sound.playStampSound();
    showToast('새 1인 1역이 등록되었습니다.', 'success', '🧹');
    renderTeacherRoles();
  });

  // [새 쿠폰 등록 모달]
  openAddCouponModalBtn.addEventListener('click', () => {
    addCouponModal.classList.remove('hidden');
    sound.playPop();
  });

  cancelAddCouponBtn.addEventListener('click', () => {
    addCouponModal.classList.add('hidden');
  });

  confirmAddCouponBtn.addEventListener('click', () => {
    const icon = newCouponIconInput.value.trim() || '🎁';
    const title = newCouponTitleInput.value.trim();
    const price = newCouponPriceInput.value;
    const desc = newCouponDescInput.value.trim();

    if (!title) {
      showToast('쿠폰 이름을 입력해 주세요!', 'warning');
      return;
    }

    store.addCoupon(icon, title, price, desc);
    addCouponModal.classList.add('hidden');
    newCouponTitleInput.value = '';
    newCouponDescInput.value = '';
    sound.playStampSound();
    showToast('새 보물 쿠폰이 등록되었습니다.', 'success', '🎁');
    renderTeacherCoupons();
  });

  // ================= 8. 전역 내비게이션 & 이벤트 바인딩 =================
  // 학생 로그인 폼 제출 & 버튼 클릭
  if (studentLoginForm) {
    studentLoginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      handleStudentLogin();
    });
  }

  if (studentLoginBtn) {
    studentLoginBtn.addEventListener('click', (e) => {
      e.preventDefault();
      handleStudentLogin();
    });
  }

  // 명렬표(출석부) 모달 열기/닫기
  if (openRosterModalBtn) {
    openRosterModalBtn.addEventListener('click', () => {
      renderRosterQuickGrid();
      if (rosterModal) rosterModal.classList.remove('hidden');
      sound.playPop();
    });
  }

  if (closeRosterModalBtn) {
    closeRosterModalBtn.addEventListener('click', () => {
      if (rosterModal) rosterModal.classList.add('hidden');
    });
  }

  // 전체 친구들 카드 보기
  if (viewAllCardsBtn) {
    viewAllCardsBtn.addEventListener('click', () => {
      switchView('studentPicker');
    });
  }

  // 카드 보기에서 돌아가기 (로그인 상태면 대시보드로, 아니면 로그인 화면으로)
  if (backToLoginFromPickerBtn) {
    backToLoginFromPickerBtn.addEventListener('click', () => {
      if (state.selectedStudentId) {
        switchView('studentDashboard');
      } else {
        switchView('studentLogin');
      }
    });
  }

  // 로고 클릭 -> 상태에 맞게 이동
  logoBtn.addEventListener('click', () => {
    if (state.selectedStudentId && state.currentView !== 'teacherDashboard') {
      switchView('studentDashboard');
    } else {
      switchView('studentLogin');
    }
  });

  // 소리 토글 버튼
  soundToggleBtn.addEventListener('click', () => {
    sound.toggleMute();
    updateSoundIcon();
    sound.playPop();
    showToast(sound.isMuted ? '효과음이 꺼졌습니다.' : '효과음이 켜졌습니다. 🎵', 'info');
  });

  // 모드 전환 버튼 (학생 <-> 선생님) : 선생님 모드 진입 시 비밀번호 확인 필수!
  modeSwitchBtn.addEventListener('click', () => {
    if (state.currentView === 'teacherDashboard') {
      if (state.selectedStudentId) {
        switchView('studentDashboard');
      } else {
        switchView('studentLogin');
      }
    } else {
      openTeacherAuthModal();
    }
  });

  // 선생님 비밀번호 모달 이벤트 바인딩
  if (cancelTeacherAuthBtn) {
    cancelTeacherAuthBtn.addEventListener('click', closeTeacherAuthModal);
  }

  if (confirmTeacherAuthBtn) {
    confirmTeacherAuthBtn.addEventListener('click', (e) => {
      e.preventDefault();
      handleTeacherAuth();
    });
  }

  if (teacherAuthForm) {
    teacherAuthForm.addEventListener('submit', (e) => {
      e.preventDefault();
      handleTeacherAuth();
    });
  }

  if (toggleTeacherPwBtn) {
    toggleTeacherPwBtn.addEventListener('click', () => {
      if (teacherPasswordInput.type === 'password') {
        teacherPasswordInput.type = 'text';
        toggleTeacherPwBtn.textContent = '🙈';
      } else {
        teacherPasswordInput.type = 'password';
        toggleTeacherPwBtn.textContent = '👁️';
      }
    });
  }

  // 학생 대시보드 -> 친구들 현황 구경하기
  if (viewClassmatesFromDashBtn) {
    viewClassmatesFromDashBtn.addEventListener('click', () => {
      switchView('studentPicker');
    });
  }

  // 학생 대시보드 -> 학생 변경 (로그아웃)
  backToPickerBtn.addEventListener('click', () => {
    state.selectedStudentId = null;
    sound.playPop();
    showToast('로그아웃되었습니다. 다른 학생으로 로그인할 수 있어요.', 'info', '👋');
    switchView('studentLogin');
  });

  // 학생 메인 -> 보물 상점 이동
  openShopFromDashBtn.addEventListener('click', () => {
    switchView('shop');
  });

  // 보물 상점 -> 학생 메인으로 뒤로가기
  backFromShopBtn.addEventListener('click', () => {
    switchView('studentDashboard');
  });

  // 선생님 대시보드 나가기
  exitTeacherBtn.addEventListener('click', () => {
    if (state.selectedStudentId) {
      switchView('studentDashboard');
    } else {
      switchView('studentLogin');
    }
  });

  // 선생님 대시보드 탭 전환
  teacherTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetTab = tab.getAttribute('data-tab');
      state.teacherTab = targetTab;
      sound.playPop();

      teacherTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      tabContents.forEach(content => {
        if (content.id === targetTab) {
          content.classList.remove('hidden');
        } else {
          content.classList.add('hidden');
        }
      });

      renderTeacherDashboard();
    });
  });

  // 선생님 검색 인풋
  teacherSearchInput.addEventListener('input', (e) => {
    state.searchQuery = e.target.value;
    renderTeacherStudents();
  });

  // [전체 학생에게 +1 도장 일괄 지급]
  bulkPlusOneBtn.addEventListener('click', () => {
    if (confirm('우리 반 전체 20명 학생에게 칭찬 도장 +1을 선물할까요? 🎉')) {
      store.giveStampToAll(1);
      sound.playLevelUpFanfare();
      confetti.fire(3000);
      showToast('우리 반 모두에게 +1 칭찬 도장을 선물했어요! 🎉', 'success', '🌱');
      renderTeacherDashboard();
    }
  });

  // [데이터 초기화 버튼]
  resetDemoDataBtn.addEventListener('click', () => {
    if (confirm('모든 학생의 도장과 쿠폰 데이터를 처음 0점 상태로 되돌릴까요?')) {
      store.resetToDefault();
      sound.playStampSound();
      showToast('초기 데이터로 재설정되었습니다.', 'info', '🔄');
      renderTeacherDashboard();
    }
  });

  // ================= 9. 앱 시작 =================
  initHeader();
  switchView('studentLogin');
});
