document.addEventListener("DOMContentLoaded", function() {
    setInterval(function() {
        BossStats();
    }, 100);
    setInterval(function() {
        BossBind();
    }, 500);
    setInterval(function() {
        BossPhase();
    }, 500);
    setInterval(function() {
        BossDie()
    }, 1000);
    setInterval(function() {
        if (BossHP > 0) {
            BossHPChange();
        }
    }, 600);
});

// 보스 스탯
let BossHP = 300000; // 보스 HP
let BossMaxHP = 300000; // 보스 최대 HP
let BossFullHP = 100; // HP 백분율
let BossEmptyHP = 0; // HP 소모량 백분율

var BossATT = 80;
var BossGUARD = 80;
let BonusDamage = 0;
let BossDamage = 0; // 보스가 받는 최종 데미지
let CriRandom = 0; // 크리티컬 변수 0 ~ 100

// 보스 상태이상
let freezeTrue = 0;
let meteorTrue = 0;
let dieTrue = 0;

// 보스 HP 따라 스탯 및 패턴 변화
var KuroPhase1 = 1;
var KuroPhase2 = 0;
var KuroPhase3 = 0;

// 보스 속성 변화
var KuroFIRE = 1;
var KuroGRASS = 0;

// div
const BossHPBar = document.getElementById('BossHPBar');
const BossHPInfo = document.getElementById('BossHPInfo');
const BossDeBuff1 = document.getElementById('boss_debuff1'); // 공격력 감소
const BossDeBuff2 = document.getElementById('boss_debuff2'); // 방어력 감소

function BossStats() {
    
    BonusDamage = (1.10 + Math.random() * 0.1).toFixed(2); // 추가 데미지 10% ~ 20%

    BossATT = 80 + (KuroPhase3 * 24); // 3페이즈 공격력 30% 증가
    BossGUARD = 80 + (KuroPhase3 * 24); // 3페이즈 방어력 30% 증가
}
function BossPhase() {
    if (BossFullHP <= 70 && BossFullHP > 30) { // 70% 이하
        KuroPhase1 = 0;
        KuroPhase2 = 1;
    } else if (BossFullHP <= 30) { // 30% 이하
        KuroPhase2 = 0;
        KuroPhase3 = 1;
        Boss.style.filter = 'drop-shadow(0px 0px 10px rgba(255, 0, 0, 0.6))'
    }
}
function BossBind() {
    if (IsFreeze == 1 && freezeTrue == 0) {
        BossImg.src = 'BossKuro1.png';
        BossDeBuff2.style.display = 'flex';
        BossGUARD -= (BossGUARD * 0.2);
        freezeTrue = 1;
    } else if (IsFreeze == 0 && freezeTrue == 1) {
        BossImg.src = 'KuroStand.gif';
        BossDeBuff2.style.display = 'none';
        BossGUARD += (BossGUARD * 0.2);
        freezeTrue = 0;
    }
    if (IsMeteor == 1 && meteorTrue == 0) {
        BossDeBuff1.style.display = 'flex';
        BossATT -= (BossATT * 0.2);
        meteorTrue = 1;
    } else if (IsMeteor == 0 && meteorTrue == 1) {
        BossDeBuff1.style.display = 'none';
        BossATT += (BossATT * 0.2);
        meteorTrue = 0;
    }
    if (IsForest == 1 && KuroGRASS == 0) {
        BossImg.src = 'BossKuro1.png';
        BossName.style.color = 'green';
        KuroFIRE = 0;
        KuroGRASS = 1;
    } else if (IsForest == 0 && KuroGRASS == 1) {
        BossImg.src = 'KuroStand.gif';
        BossName.style.color = 'red';
        KuroFIRE = 1;
        KuroGRASS = 0;
    }
}

function BossDie() { // 보스 사망

    if (BossHP <= 0 && dieTrue == 0) {
        dieTrue = 1;
        BossHP = 0;
        BossDisappear.play();
        BossImg.src = 'BossKuroDie.gif';
        BossFullHP = (BossHP / 3000).toFixed(1);
        BossEmptyHP = 100 - BossFullHP;
        BossHPInfo.textContent = BossHP + ' (' + BossFullHP + '%)';
        BossHPInfo.style.background = 'linear-gradient(to right, crimson ' + BossFullHP + '%, white ' + BossEmptyHP + '%)';
        setTimeout(function() {
            document.getElementById('MapImg').src = 'empty.png'
        }, 1000);
        setTimeout(function() {
            document.getElementById('MapImg').src = 'Map2.png'
        }, 1200);
        setTimeout(function() {
            Boss.style.display = 'none';
        }, 3000);
    }
}

function BossHPChange() { // 보스 HP 변화

    BossFullHP = (BossHP / 3000).toFixed(1);
    BossEmptyHP = 100 - BossFullHP;
    BossHPInfo.textContent = BossHP + ' (' + BossFullHP + '%)';
    BossHPInfo.style.background = 'linear-gradient(to right, crimson ' + BossFullHP + '%, white ' + BossEmptyHP + '%)';
    CriRandom = Math.floor(Math.random() * 100 + 1); // 크리티컬 난수 1 ~ 100

    setTimeout(ballDamage, 100);
    setTimeout(tornadoDamage, 100);
    setTimeout(thunderDamage, 100);
    setTimeout(wispDamage, 100);
    setTimeout(freezeDamage, 100);
    setTimeout(fairyDamage, 100);
    setTimeout(meteorDamage, 100);
    setTimeout(forestDamage, 100);
    
    if (BossHP <= 0) { // HP 음수 방지
        BossHP = 0;
    }
    if (BossHP >= BossMaxHP) { // HP 초과 방지
        BossHP = BossMaxHP;
    }
}
function ballDamage() { // 에너지 볼 피격

    if (CriRandom <= CRI) { // 크리티컬 성공 시
        BossDamage = Math.ceil(((ATT * 12 * BonusDamage) * CRIDamage - BossGUARD)); // 크리티컬 데미지 1.3배
    } else if (CriRandom > CRI) {
        BossDamage = Math.ceil(((ATT * 12 * BonusDamage) - BossGUARD));
    }

    if (
        KuroBody.right > ballBody.left &&
        KuroBody.left < ballBody.right &&
        KuroBody.bottom > ballBody.top &&
        KuroBody.top < ballBody.bottom
    ) {
        if (CriRandom <= CRI) { // 크리티컬 성공 시 데미지 컬러 RED
            KuroDamage.style.color = '#8B0000';
        }
        BossHP -= BossDamage;

        KuroDamage.textContent = '-' + BossDamage;
        setTimeout(function() {
            KuroDamage.textContent = '';
            KuroDamage.style.color = '#FF6666';
        }, 800);
        if (BossHP <= 0) { // HP 음수 방지
            BossHP = 0;
        }
    }
}
function tornadoDamage() { // 토네이도 피격

    if (CriRandom <= CRI) { // 크리티컬 성공 시
        BossDamage = Math.ceil(((ATT * 8 * BonusDamage) * CRIDamage - BossGUARD)); // 크리티컬 데미지 1.3배
    } else if (CriRandom > CRI) {
        BossDamage = Math.ceil(((ATT * 8 * BonusDamage) - BossGUARD));
    }

    if (
        KuroBody.right > torBody.left &&
        KuroBody.left < torBody.right &&
        KuroBody.bottom > torBody.top &&
        KuroBody.top < torBody.bottom
    ) {
        if (CriRandom <= CRI) { // 크리티컬 성공 시 데미지 컬러 RED
            KuroDamage.style.color = '#8B0000';
        }
        BossHP -= BossDamage;

        KuroDamage.textContent = '-' + BossDamage;
        setTimeout(function() {
            KuroDamage.textContent = '';
            KuroDamage.style.color = '#FF6666';
        }, 800);
        if (BossHP <= 0) { // HP 음수 방지
            BossHP = 0;
        }
    }
}
function thunderDamage() { // 썬더 피격

    if (CriRandom <= CRI) { // 크리티컬 성공 시
        BossDamage = Math.ceil(((ATT * 20 * BonusDamage) * CRIDamage - BossGUARD) - (KuroFIRE * 150) + (KuroGRASS * 350)); // 크리티컬 데미지 1.3배
    } else if (CriRandom > CRI) {
        BossDamage = Math.ceil(((ATT * 20 * BonusDamage) - BossGUARD) - (KuroFIRE * 150) + (KuroGRASS * 350));
    }

    if (
        KuroBody.right > thunderBody.left &&
        KuroBody.left < thunderBody.right &&
        KuroBody.bottom > thunderBody.top &&
        KuroBody.top < thunderBody.bottom
    ) {
        if (CriRandom <= CRI) { // 크리티컬 성공 시 데미지 컬러 RED
            KuroDamage.style.color = '#8B0000';
        }
        BossHP -= BossDamage;

        KuroDamage.textContent = '-' + BossDamage;
        setTimeout(function() {
            KuroDamage.textContent = '';
            KuroDamage.style.color = '#FF6666';
        }, 800);
        if (BossHP <= 0) { // HP 음수 방지
            BossHP = 0;
        }
    }
}
function wispDamage() { // 마나 정령 피격

    if (CriRandom <= CRI) { // 크리티컬 성공 시
        BossDamage = Math.ceil(((ATT * 15 * BonusDamage) * CRIDamage - BossGUARD)); // 크리티컬 데미지 1.3배
    } else if (CriRandom > CRI) {
        BossDamage = Math.ceil(((ATT * 15 * BonusDamage) - BossGUARD));
    }

    if (
        KuroBody.right > wispAttBody.left &&
        KuroBody.left < wispAttBody.right &&
        KuroBody.bottom > wispAttBody.top &&
        KuroBody.top < wispAttBody.bottom
    ) {
        if (CriRandom <= CRI) { // 크리티컬 성공 시 데미지 컬러 RED
            KuroDamage.style.color = '#8B0000';
        }
        BossHP -= BossDamage;

        KuroDamage.textContent = '-' + BossDamage;
        setTimeout(function() {
            KuroDamage.textContent = '';
            KuroDamage.style.color = '#FF6666';
        }, 800);
        if (BossHP <= 0) { // HP 음수 방지
            BossHP = 0;
        }
    }
}
function freezeDamage() { // 프리즈 피격

    BossDamage = Math.ceil(((ATT * 9 * BonusDamage) - BossGUARD));

    if (
        KuroBody.right > iceBody.left &&
        KuroBody.left < iceBody.right &&
        KuroBody.bottom > iceBody.top &&
        KuroBody.top < iceBody.bottom
    ) {
        
        BossHP -= BossDamage;

        BindDamage.textContent = '-' + BossDamage;
        setTimeout(function() {
            BindDamage.textContent = '';
        }, 1000);
        if (BossHP <= 0) { // HP 음수 방지
            BossHP = 0;
        }
    }
}
function fairyDamage() { // 워터 페어리 피격

    if (CriRandom <= CRI) { // 크리티컬 성공 시
        BossDamage = Math.ceil(((ATT * 27 * BonusDamage) * CRIDamage - BossGUARD) + (KuroFIRE * 350)); // 크리티컬 데미지 1.3배
    } else if (CriRandom > CRI) {
        BossDamage = Math.ceil(((ATT * 27 * BonusDamage) - BossGUARD) + (KuroFIRE * 350));
    }

    if (
        KuroBody.right > fairyAttBody.left &&
        KuroBody.left < fairyAttBody.right &&
        KuroBody.bottom > fairyAttBody.top &&
        KuroBody.top < fairyAttBody.bottom
    ) {
        if (CriRandom <= CRI) { // 크리티컬 성공 시 데미지 컬러 RED
            KuroDamage.style.color = '#8B0000';
        }
        BossHP -= BossDamage;

        KuroDamage.textContent = '-' + BossDamage;
        setTimeout(function() {
            KuroDamage.textContent = '';
            KuroDamage.style.color = '#FF6666';
        }, 800);
        if (BossHP <= 0) { // HP 음수 방지
            BossHP = 0;
        }
    }
}
function meteorDamage() { // 블루 메테오 피격

    if (CriRandom <= (CRI + 30)) { // 크리티컬 성공 시 + 스킬 효과 크리티컬 추가 확률 +20%
        BossDamage = Math.ceil(((ATT * 55 * BonusDamage) * CRIDamage - BossGUARD)); // 크리티컬 데미지 1.3배
    } else if (CriRandom > (CRI + 30)) {
        BossDamage = Math.ceil(((ATT * 55 * BonusDamage) - BossGUARD));
    }

    if (
        meteorDrop == 1
    ) {
        if (CriRandom <= (CRI + 30)) { // 크리티컬 성공 시 데미지 컬러 RED
            KuroDamage.style.color = '#8B0000';
        }
        BossHP -= BossDamage;

        KuroDamage.textContent = '-' + BossDamage;
        setTimeout(function() {
            KuroDamage.textContent = '';
            KuroDamage.style.color = '#FF6666';
        }, 800);
        if (BossHP <= 0) { // HP 음수 방지
            BossHP = 0;
        }
    }
}
function forestDamage() { // 신월의 숲 피격

    if (CriRandom <= CRI) { // 크리티컬 성공 시
        BossDamage = Math.ceil(((ATT * 25 * BonusDamage) * CRIDamage - BossGUARD)); // 크리티컬 데미지 1.3배
    } else if (CriRandom > CRI) {
        BossDamage = Math.ceil(((ATT * 25 * BonusDamage) - BossGUARD));
    }

    if (
        ForestHarming == 1
    ) {
        BindDamage.style.color = 'green';
        if (CriRandom <= CRI) { // 크리티컬 성공 시 데미지 컬러 RED
            BindDamage.style.color = '#8B0000';
        }
        BossHP -= BossDamage;

        BindDamage.textContent = '-' + BossDamage;
        setTimeout(function() {
            BindDamage.textContent = '';
            BindDamage.style.color = 'skyblue';
        }, 1000);
        if (BossHP <= 0) { // HP 음수 방지
            BossHP = 0;
        }
    }
}