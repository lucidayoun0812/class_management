/**
 * 우리 반 쑥쑥 성장 일기 (Ssook-Ssook Growth Diary)
 * SVG 캐릭터 렌더러 및 시각 효과 (폭죽, 파티클) 모듈
 */

const CharacterVisuals = {
  /**
   * 누적 도장 수 또는 단계에 맞춰 초고품질 인터랙티브 SVG 캐릭터 반환
   * @param {number} level 1~4
   * @returns {string} SVG HTML string
   */
  getCharacterSvg(level) {
    switch (level) {
      case 1:
        // 1단계: 꼬마 새싹 🌱 (화분, 귀여운 볼터치 새싹, 이슬방울)
        return `
        <svg class="character-svg" viewBox="0 0 300 280" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="potGrad1" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="#ffb74d"/>
              <stop offset="100%" stop-color="#f57c00"/>
            </linearGradient>
            <linearGradient id="sproutGrad1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#aed581"/>
              <stop offset="100%" stop-color="#558b2f"/>
            </linearGradient>
            <filter id="glow1" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          <!-- 반짝이 별빛 -->
          <circle cx="60" cy="70" r="3" fill="#ffd54f">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="240" cy="90" r="4" fill="#ffd54f">
            <animate attributeName="opacity" values="0.8;0.2;0.8" dur="2.4s" repeatCount="indefinite" />
          </circle>

          <!-- 화분 받침대 그림자 -->
          <ellipse cx="150" cy="255" rx="75" ry="12" fill="#e0ebd5"/>

          <!-- 테라코타 화분 -->
          <path d="M90 190 L105 250 Q150 258 195 250 L210 190 Z" fill="url(#potGrad1)" stroke="#e65100" stroke-width="3"/>
          <ellipse cx="150" cy="190" rx="60" ry="14" fill="#ffcc80" stroke="#e65100" stroke-width="3"/>
          <!-- 비옥한 흙 -->
          <ellipse cx="150" cy="191" rx="52" ry="10" fill="#6d4c41"/>

          <!-- 흔들거리는 줄기와 새싹 -->
          <g>
            <animateTransform attributeName="transform" type="rotate" values="-2 150 190; 2 150 190; -2 150 190" dur="3s" repeatCount="indefinite" />
            <!-- 줄기 -->
            <path d="M150 190 Q148 140 150 120" stroke="url(#sproutGrad1)" stroke-width="8" stroke-linecap="round" fill="none"/>

            <!-- 왼쪽 잎사귀 -->
            <path d="M150 135 C115 130 100 105 125 95 C145 88 150 120 150 135 Z" fill="#81c784" stroke="#2e7d32" stroke-width="2.5"/>
            <!-- 오른쪽 잎사귀 -->
            <path d="M150 130 C185 125 200 98 175 90 C155 83 150 115 150 130 Z" fill="#a5d6a7" stroke="#2e7d32" stroke-width="2.5"/>

            <!-- 반짝이는 이슬방울 -->
            <ellipse cx="120" cy="100" rx="4" ry="5" fill="#e1f5fe" opacity="0.9"/>

            <!-- 새싹 얼굴 (사랑스러운 표정) -->
            <g transform="translate(150, 105)">
              <!-- 눈 -->
              <ellipse cx="-12" cy="0" rx="3.5" ry="4.5" fill="#1b5e20"/>
              <ellipse cx="12" cy="0" rx="3.5" ry="4.5" fill="#1b5e20"/>
              <!-- 눈 하이라이트 -->
              <circle cx="-13" cy="-1.5" r="1.5" fill="#ffffff"/>
              <circle cx="11" cy="-1.5" r="1.5" fill="#ffffff"/>
              <!-- 발그레 볼터치 -->
              <ellipse cx="-18" cy="4" rx="4" ry="2.5" fill="#ff8a80" opacity="0.7"/>
              <ellipse cx="18" cy="4" rx="4" ry="2.5" fill="#ff8a80" opacity="0.7"/>
              <!-- 입 -->
              <path d="M-5 4 Q0 9 5 4" fill="none" stroke="#1b5e20" stroke-width="2" stroke-linecap="round"/>
            </g>
          </g>
        </svg>`;

      case 2:
        // 2단계: 작은 묘목 🌿 (풍성해진 가지와 무당벌레 친구, 생글생글 웃는 얼굴)
        return `
        <svg class="character-svg" viewBox="0 0 300 280" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="potGrad2" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="#80deea"/>
              <stop offset="100%" stop-color="#00838f"/>
            </linearGradient>
            <linearGradient id="leafGrad2" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="#a5d6a7"/>
              <stop offset="100%" stop-color="#2e7d32"/>
            </linearGradient>
          </defs>

          <!-- 그림자 -->
          <ellipse cx="150" cy="255" rx="85" ry="14" fill="#e0ebd5"/>

          <!-- 파란색 예쁜 도자기 화분 -->
          <path d="M85 185 L100 250 Q150 260 200 250 L215 185 Z" fill="url(#potGrad2)" stroke="#006064" stroke-width="3"/>
          <ellipse cx="150" cy="185" rx="65" ry="15" fill="#b2ebf2" stroke="#006064" stroke-width="3"/>
          <ellipse cx="150" cy="186" rx="57" ry="11" fill="#5d4037"/>

          <!-- 묘목 그룹 (숨쉬듯 부드럽게 흔들림) -->
          <g>
            <animateTransform attributeName="transform" type="rotate" values="-2 150 185; 2 150 185; -2 150 185" dur="3.5s" repeatCount="indefinite" />
            <!-- 중심 줄기 -->
            <path d="M150 185 Q145 130 150 85" stroke="#795548" stroke-width="12" stroke-linecap="round" fill="none"/>
            <path d="M150 150 Q120 135 105 125" stroke="#795548" stroke-width="6" stroke-linecap="round" fill="none"/>
            <path d="M150 130 Q180 115 195 105" stroke="#795548" stroke-width="6" stroke-linecap="round" fill="none"/>

            <!-- 잎사귀 다발들 -->
            <!-- 좌하단 잎 -->
            <path d="M105 125 C75 120 60 90 90 85 C115 80 120 115 105 125 Z" fill="#66bb6a" stroke="#1b5e20" stroke-width="2"/>
            <!-- 우하단 잎 -->
            <path d="M195 105 C225 100 240 70 210 65 C185 60 180 95 195 105 Z" fill="#81c784" stroke="#1b5e20" stroke-width="2"/>
            <!-- 정상 풍성한 잎들 -->
            <circle cx="150" cy="70" r="38" fill="url(#leafGrad2)" stroke="#1b5e20" stroke-width="2.5"/>
            <circle cx="130" cy="55" r="28" fill="#81c784" stroke="#1b5e20" stroke-width="2"/>
            <circle cx="170" cy="55" r="28" fill="#a5d6a7" stroke="#1b5e20" stroke-width="2"/>

            <!-- 묘목의 행복한 표정 -->
            <g transform="translate(150, 68)">
              <ellipse cx="-14" cy="-2" rx="4" ry="5" fill="#1b5e20"/>
              <ellipse cx="14" cy="-2" rx="4" ry="5" fill="#1b5e20"/>
              <circle cx="-15" cy="-4" r="1.5" fill="#fff"/>
              <circle cx="13" cy="-4" r="1.5" fill="#fff"/>
              <!-- 윙크 속눈썹 느낌/볼터치 -->
              <ellipse cx="-20" cy="4" rx="5" ry="3" fill="#ff8a80" opacity="0.8"/>
              <ellipse cx="20" cy="4" rx="5" ry="3" fill="#ff8a80" opacity="0.8"/>
              <path d="M-6 4 Q0 12 6 4" fill="#d32f2f" stroke="#b71c1c" stroke-width="1.5"/>
            </g>

            <!-- 귀여운 꼬마 무당벌레 친구 🐞 -->
            <g transform="translate(95, 88)">
              <ellipse cx="0" cy="0" rx="8" ry="7" fill="#e53935"/>
              <ellipse cx="-6" cy="0" rx="4" ry="5" fill="#212121"/>
              <circle cx="2" cy="-3" r="1.5" fill="#212121"/>
              <circle cx="2" cy="3" r="1.5" fill="#212121"/>
              <circle cx="-2" cy="0" r="1.5" fill="#212121"/>
            </g>
          </g>
        </svg>`;

      case 3:
        // 3단계: 큰 나무 🌳 (푸른 녹음, 굵고 듬직한 줄기, 파랑새 친구, 솔솔 부는 바람)
        return `
        <svg class="character-svg" viewBox="0 0 300 280" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="trunkGrad3" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stop-color="#5d4037"/>
              <stop offset="50%" stop-color="#8d6e63"/>
              <stop offset="100%" stop-color="#4e342e"/>
            </linearGradient>
            <linearGradient id="crownGrad3" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#81c784"/>
              <stop offset="100%" stop-color="#2e7d32"/>
            </linearGradient>
          </defs>

          <!-- 땅과 언덕 잔디 -->
          <ellipse cx="150" cy="255" rx="100" ry="18" fill="#c8e6c9"/>
          <ellipse cx="150" cy="254" rx="90" ry="14" fill="#a5d6a7"/>

          <!-- 풀잎 장식 -->
          <path d="M70 250 Q75 235 85 245" stroke="#2e7d32" stroke-width="3" fill="none"/>
          <path d="M225 252 Q215 238 210 248" stroke="#2e7d32" stroke-width="3" fill="none"/>

          <!-- 굵은 나무 기둥 -->
          <path d="M125 255 Q135 190 135 140 L165 140 Q165 190 175 255 Z" fill="url(#trunkGrad3)" stroke="#3e2723" stroke-width="3.5"/>

          <!-- 큰 나뭇가지 -->
          <path d="M135 155 Q100 135 90 110" stroke="#5d4037" stroke-width="10" stroke-linecap="round" fill="none"/>
          <path d="M165 155 Q200 135 210 110" stroke="#5d4037" stroke-width="10" stroke-linecap="round" fill="none"/>

          <!-- 거대하고 푸르른 수관(잎) 다발들 -->
          <g>
            <animateTransform attributeName="transform" type="rotate" values="-1 150 140; 1 150 140; -1 150 140" dur="4s" repeatCount="indefinite" />
            
            <circle cx="95" cy="105" r="45" fill="#43a047" stroke="#1b5e20" stroke-width="3"/>
            <circle cx="205" cy="105" r="45" fill="#43a047" stroke="#1b5e20" stroke-width="3"/>
            <circle cx="120" cy="65" r="50" fill="#66bb6a" stroke="#1b5e20" stroke-width="3"/>
            <circle cx="180" cy="65" r="50" fill="#81c784" stroke="#1b5e20" stroke-width="3"/>
            <circle cx="150" cy="95" r="62" fill="url(#crownGrad3)" stroke="#1b5e20" stroke-width="3.5"/>

            <!-- 나무에 앉은 행복한 파랑새 🐦 -->
            <g transform="translate(205, 75)">
              <ellipse cx="0" cy="0" rx="12" ry="9" fill="#42a5f5"/>
              <circle cx="8" cy="-5" r="6" fill="#42a5f5"/>
              <!-- 부리 -->
              <polygon points="14,-5 18,-3 14,-1" fill="#ffa726"/>
              <!-- 눈 -->
              <circle cx="10" cy="-6" r="1.5" fill="#000"/>
              <!-- 날개 -->
              <path d="M-6 0 C-12 -6 0 -10 2 -2 Z" fill="#1e88e5"/>
            </g>
          </g>

          <!-- 굵은 줄기의 인자하고 귀여운 얼굴 표정 -->
          <g transform="translate(150, 195)">
            <ellipse cx="-10" cy="0" rx="3.5" ry="4.5" fill="#3e2723"/>
            <ellipse cx="10" cy="0" rx="3.5" ry="4.5" fill="#3e2723"/>
            <circle cx="-11" cy="-1.5" r="1.5" fill="#fff"/>
            <circle cx="9" cy="-1.5" r="1.5" fill="#fff"/>
            <ellipse cx="-16" cy="4" rx="4" ry="2.5" fill="#ffab91" opacity="0.8"/>
            <ellipse cx="16" cy="4" rx="4" ry="2.5" fill="#ffab91" opacity="0.8"/>
            <path d="M-5 4 Q0 10 5 4" fill="none" stroke="#3e2723" stroke-width="2" stroke-linecap="round"/>
          </g>
        </svg>`;

      case 4:
      default:
        // 4단계: 열매 맺은 황금 나무 🍎✨ (황금빛 왕관, 주렁주렁 탐스러운 사과/열매, 반짝이 오라)
        return `
        <svg class="character-svg" viewBox="0 0 300 280" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="goldTrunk" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stop-color="#ffb300"/>
              <stop offset="50%" stop-color="#ffe082"/>
              <stop offset="100%" stop-color="#ff8f00"/>
            </linearGradient>
            <linearGradient id="goldCrown" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#fff59d"/>
              <stop offset="40%" stop-color="#ffd54f"/>
              <stop offset="100%" stop-color="#ffb300"/>
            </linearGradient>
            <radialGradient id="auraGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#fffde7" stop-opacity="0.8"/>
              <stop offset="80%" stop-color="#ffe082" stop-opacity="0.3"/>
              <stop offset="100%" stop-color="#fff8e1" stop-opacity="0"/>
            </radialGradient>
          </defs>

          <!-- 황금빛 오라 후광 -->
          <circle cx="150" cy="110" r="115" fill="url(#auraGrad)">
            <animate attributeName="r" values="105;118;105" dur="3s" repeatCount="indefinite"/>
          </circle>

          <!-- 반짝반짝 별들 -->
          <g>
            <circle cx="50" cy="60" r="4" fill="#ffd54f">
              <animate attributeName="opacity" values="0.2;1;0.2" dur="1.5s" repeatCount="indefinite"/>
            </circle>
            <circle cx="250" cy="70" r="5" fill="#ffb300">
              <animate attributeName="opacity" values="1;0.2;1" dur="1.8s" repeatCount="indefinite"/>
            </circle>
            <circle cx="150" cy="15" r="4" fill="#fff59d">
              <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite"/>
            </circle>
          </g>

          <!-- 무지갯빛 언덕 잔디 -->
          <ellipse cx="150" cy="255" rx="105" ry="18" fill="#fff9c4"/>
          <ellipse cx="150" cy="253" rx="95" ry="13" fill="#ffe082"/>

          <!-- 황금빛 나무 기둥 -->
          <path d="M125 255 Q135 185 135 135 L165 135 Q165 185 175 255 Z" fill="url(#goldTrunk)" stroke="#f57f17" stroke-width="3"/>

          <!-- 흔들리는 황금빛 수관 -->
          <g>
            <animateTransform attributeName="transform" type="rotate" values="-1.5 150 135; 1.5 150 135; -1.5 150 135" dur="3s" repeatCount="indefinite" />

            <circle cx="95" cy="100" r="45" fill="url(#goldCrown)" stroke="#f57f17" stroke-width="3"/>
            <circle cx="205" cy="100" r="45" fill="url(#goldCrown)" stroke="#f57f17" stroke-width="3"/>
            <circle cx="120" cy="60" r="52" fill="#fff176" stroke="#f57f17" stroke-width="3"/>
            <circle cx="180" cy="60" r="52" fill="#ffe082" stroke="#f57f17" stroke-width="3"/>
            <circle cx="150" cy="90" r="65" fill="url(#goldCrown)" stroke="#f57f17" stroke-width="3.5"/>

            <!-- 주렁주렁 매달린 탐스러운 붉은 사과 & 황금 열매 🍎 -->
            <!-- 열매 1 -->
            <g transform="translate(100, 75)">
              <circle cx="0" cy="0" r="10" fill="#e53935" stroke="#b71c1c" stroke-width="1.5"/>
              <ellipse cx="-3" cy="-3" rx="3" ry="1.5" fill="#ffcdd2"/>
              <path d="M0 -10 Q3 -14 6 -11" stroke="#33691e" stroke-width="2" fill="none"/>
            </g>
            <!-- 열매 2 -->
            <g transform="translate(200, 70)">
              <circle cx="0" cy="0" r="11" fill="#e53935" stroke="#b71c1c" stroke-width="1.5"/>
              <ellipse cx="-3" cy="-3" rx="3" ry="1.5" fill="#ffcdd2"/>
              <path d="M0 -11 Q3 -15 6 -12" stroke="#33691e" stroke-width="2" fill="none"/>
            </g>
            <!-- 열매 3 (황금 별 열매) -->
            <g transform="translate(145, 45)">
              <circle cx="0" cy="0" r="12" fill="#ffea00" stroke="#f57f17" stroke-width="2"/>
              <polygon points="0,-7 2,-2 7,-2 3,1 5,6 0,3 -5,6 -3,1 -7,-2 -2,-2" fill="#ff6f00"/>
            </g>
            <!-- 열매 4 -->
            <g transform="translate(165, 125)">
              <circle cx="0" cy="0" r="9" fill="#e53935" stroke="#b71c1c" stroke-width="1.5"/>
            </g>

            <!-- 찬란한 황금 왕관 👑 -->
            <path d="M135 15 L142 24 L150 13 L158 24 L165 15 L165 28 L135 28 Z" fill="#ffeb3b" stroke="#f57f17" stroke-width="2"/>
          </g>

          <!-- 매우 행복하고 활짝 웃는 표정 -->
          <g transform="translate(150, 190)">
            <ellipse cx="-11" cy="0" rx="4" ry="5.5" fill="#bf360c"/>
            <ellipse cx="11" cy="0" rx="4" ry="5.5" fill="#bf360c"/>
            <circle cx="-12" cy="-2" r="2" fill="#fff"/>
            <circle cx="10" cy="-2" r="2" fill="#fff"/>
            <ellipse cx="-18" cy="5" rx="5" ry="3" fill="#ff8a80" opacity="0.9"/>
            <ellipse cx="18" cy="5" rx="5" ry="3" fill="#ff8a80" opacity="0.9"/>
            <!-- 활짝 웃는 입 -->
            <path d="M-7 4 Q0 15 7 4" fill="#d84315" stroke="#bf360c" stroke-width="1.5"/>
          </g>
        </svg>`;
    }
  }
};

/**
 * 축하 폭죽 파티클 (Confetti Particle System)
 */
class ConfettiEffect {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
    this.particles = [];
    this.animationId = null;

    if (this.canvas) {
      this.resize();
      window.addEventListener('resize', () => this.resize());
    }
  }

  resize() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  fire(duration = 2500) {
    if (!this.canvas || !this.ctx) return;
    this.resize();

    const colors = ['#4caf50', '#8bc34a', '#ffeb3b', '#ff9800', '#ff5722', '#03a9f4', '#e91e63'];
    const count = 120;

    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: this.canvas.width * 0.5 + (Math.random() - 0.5) * 300,
        y: this.canvas.height * 0.4 + (Math.random() - 0.5) * 100,
        vx: (Math.random() - 0.5) * 12,
        vy: (Math.random() - 0.8) * 14,
        size: Math.random() * 9 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        alpha: 1,
        gravity: 0.35
      });
    }

    if (!this.animationId) {
      this.render();
    }

    setTimeout(() => {
      // 점진적 소멸
      this.particles.forEach(p => p.alpha = Math.min(p.alpha, 0.5));
    }, duration);
  }

  render() {
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.rotation += p.rotationSpeed;
      p.alpha -= 0.007;

      if (p.alpha <= 0 || p.y > this.canvas.height) {
        this.particles.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate((p.rotation * Math.PI) / 180);
      this.ctx.globalAlpha = p.alpha;
      this.ctx.fillStyle = p.color;
      this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      this.ctx.restore();
    }

    if (this.particles.length > 0) {
      this.animationId = requestAnimationFrame(() => this.render());
    } else {
      this.animationId = null;
    }
  }
}

window.CharacterVisuals = CharacterVisuals;
window.confettiEffect = new ConfettiEffect('confettiCanvas');
