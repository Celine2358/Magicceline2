document.addEventListener("DOMContentLoaded", function() {

    setInterval(function() {
        if (HP > 0 && BossHP > 0) {
            MPRecover();
        }
    }, 700 - (140 * MpM));
    setInterval(function() {
        if (HP > 0 && BossHP > 0) {
            HPChange();
        }
    }, 600);
    setInterval(function() {
        BonusStat();
    }, 100);
    setInterval(function() {
        if (HP > 0) {
            CoolTime();
        }
    }, 1000);
    setInterval(function() {
        if (HP <= 0 && life == 1) {
            GameOver();
        }
    }, 600);

});

// 전투 모드 로컬 스토리지
let AttackM = parseInt(localStorage.getItem('AttMod'));
let GuardM = parseInt(localStorage.getItem('GuaMod'));
let MpM = parseInt(localStorage.getItem('MPMod'));

// 셀리느 스탯
var HP = 2000; // 초기 HP
var MaxHP = 2000; // 최대 HP
var FullHP = 100; // HP 백분율
var emptyHP = 0; // HP 소모량 백분율

var MP = 50; // 초기 MP
var MaxMP = 100; // 최대 MP
var FullMP = 50; // MP 백분율
var emptyMP = 50; // MP 소모량 백분율

// 전투 스탯
var DamageResult = 0 // 최종 받는 데미지
var ATT = 50; // 기본 공격력 50
var GUARD = 50; // 기본 방어력 50
var CRI = 10; // 기본 크리티컬 10%
var CRIDamage = 1.3; // 크리티컬 데미지 30%
var BonusATT = 0; // 보너스 공격력
var BonusGUARD = 0; // 보너스 방어력
var BarrierTrue = 0; // 배리어 적용 여부
var WispTrue = 0; // 마나 정령 소환 여부
var ForestTrue = 0; // 신월의 숲 적용 여부


if (AttackM == 1) {
    ATT = 65;
    CRI = 20;
} else if (GuardM == 1) {
    GUARD = 70;
} else if (MpM == 1) {
    MP = 75;
    MaxMP = 125;
    FullMP = 60;
    emptyMP = 40;
}

// div
const PlayerHP = document.getElementById('HP');
const PlayerMP = document.getElementById('MP');
const BasicSkill1 = document.getElementById('BasicSkill1');
const BasicSkill2 = document.getElementById('BasicSkill2');
const MidSkill1 = document.getElementById('MidSkill1');
const MidSkill2 = document.getElementById('MidSkill2');
const AdvSkill1 = document.getElementById('AdvSkill1');
const buff1 = document.getElementById('CelineBuff1');
const buff2 = document.getElementById('CelineBuff2');
const Debuff1 = document.getElementById('CelineDeBuff1');
const Debuff2 = document.getElementById('CelineDeBuff2');
// 스킬 쿨타임 div
const BS1CoolTime = document.getElementById('BS1Cool');
const BS2CoolTime = document.getElementById('BS2Cool');
const MS1CoolTime = document.getElementById('MS1Cool');
const MS2CoolTime = document.getElementById('MS2Cool');
const AS1CoolTime = document.getElementById('AS1Cool');

// 공격력, 방어력 난수 및 추가 스탯
function BonusStat() {
    BonusATT = Math.floor(Math.random() * 15 + 1); // 1~15
    BonusGUARD = Math.floor(Math.random() * 15 + 1); // 1~15
    // 배리어
    if (IsBarrier == 1 && BarrierTrue == 0) {
        GUARD *= 1.5;
        BarrierTrue = 1; // 효과 적용
    } else if (IsBarrier == 0 && BarrierTrue == 1) {
        GUARD /= 1.5;
        BarrierTrue = 0;
    }
    // 마나 정령
    if (IsWisp == 1 && WispTrue == 0) {
        GUARD *= 1.1;
        buff2.style.display = 'flex';
        WispTrue = 1; // 효과 적용
    } else if (IsWisp == 0 && WispTrue == 1) {
        GUARD /= 1.1;
        buff2.style.display = 'none';
        WispTrue = 0;
    }
    // 신월의 숲
    if (IsForest == 1 && ForestTrue == 0) {
        ATT *= 1.3;
        GUARD *= 1.3;
        buff1.style.display = 'flex';
        buff2.style.display = 'flex';
        ForestTrue = 1; // 효과 적용
    } else if (IsForest == 0 && ForestTrue == 1) {
        ATT /= 1.3;
        GUARD /= 1.3;
        buff1.style.display = 'none';
        buff2.style.display = 'none';
        ForestTrue = 0;
    }
}

// 디버프 0:False 1:True
var slowness = 0; // 감속
var toxic = 0; // 중독
var life = 1; // 생명

// 쿨타임 체공:4초 에너지볼:2초 토네이도:5초 썬더:10초 마나정령:40초 배리어:30초 프리즈:50초 워터페어리:50초
// 블루 메테오:60초 신월의 숲:60초
var ctBlink = 0;
var ct1 = 0;
var ct2 = 0;
var ct3 = 0;
var ct4 = 0;
var ct5 = 0;
var ct6 = 0;
var ct7 = 0;
var ct8 = 0;
var ct9 = 0;

function GameOver() { // 플레이어 사망
    life = 0;
    PlayerImg.src = 'celineSitdown.gif';
    Player.style.top = 640 + 'px';
    Player.style.filter = 'brightness(50%)';
    FullHP = (HP / 20).toFixed(1);
    emptyHP = 100 - FullHP;
    PlayerHP.textContent = 'HP : ' + HP + ' (' + FullHP + '%)';
    PlayerHP.style.background = 'linear-gradient(to right, #FF6666 ' + FullHP + '%, white ' + emptyHP + '%)';

    setTimeout(function() {
        let GameRestart = confirm('셀리느가 쓰러졌습니다... "쿠로"에게 다시 도전하시겠습니까?');
        if (GameRestart) {
            window.location.href = 'NormalKuro.html';
        } else {
            window.location.href = 'index.html';
        }
    }, 2000);
}

function MPRecover() { // MP 자연회복

    if (MpM == 0) { // MP 모드가 아닐 때
        MP += 1; // MP 1% 회복
        FullMP += 1;
        emptyMP -= 1;
        PlayerMP.textContent = 'MP : ' + MP + '%';

        PlayerMP.style.background = 'linear-gradient(to right, #66B2FF ' + FullMP + '%, white ' + emptyMP + '%)';


        if (MP > 99) { // 100% 초과 방지
            MP = 99;
            FullMP = 99;
            emptyMP = 1;
        } else if (MP <= 0) { // 0% 미만 방지
            MP = 0;
            FullMP = 99;
            emptyMP = 100;
        }

    } else if (MpM == 1) { // MP 모드
        MP += 1; // MP 1% 회복
        FullMP += 0.8;
        emptyMP -= 0.8;
        PlayerMP.textContent = 'MP : ' + MP + '%';

        PlayerMP.style.background = 'linear-gradient(to right, #66B2FF ' + FullMP + '%, white ' + emptyMP + '%)';

        if (MP > 124) { // 125% 초과 방지
            MP = 124;
            FullMP = 99.2;
            emptyMP = 0.8;
        } else if (MP <= 0) { // 0% 미만 방지
            MP = 0;
            FullMP = 0;
            emptyMP = 100;
        }
    }
}
function HPChange() { // HP 변화

    FullHP = (HP / 20).toFixed(1);
    emptyHP = 100 - FullHP;
    PlayerHP.textContent = 'HP : ' + HP + ' (' + FullHP + '%)';
    PlayerHP.style.background = 'linear-gradient(to right, #FF6666 ' + FullHP + '%, white ' + emptyHP + '%)';

    setTimeout(bmagicDamage, 500);
    eletricDamage1();
    eletricDamage2();
    eletricDamage3();
    eletricDamage4();
    bossballDamage();
    MapPoisonDamage();
    bossfireDamage();
    SunsapireBallDamage();

    if (HP <= 0) { // HP 음수 방지
        HP = 0;
    }
    if (HP >= MaxHP) { // HP 초과 방지
        HP = MaxHP;
    }
}
function CoolTime() { // 스킬 쿨타임 관리

    ctBlink -= 1;
    ct1 -= 1; // 에너지볼
    ct2 -= 1; // 토네이도
    ct3 -= 1; // 썬더
    ct4 -= 1; // 마나정령
    ct5 -= 1; // 배리어
    ct6 -= 1; // 프리즈
    ct7 -= 1; // 워터페어리
    ct8 -= 1; // 블루메테오
    ct9 -= 1; // 신월의숲

    // 쿨타임 초과 관리
    if (ctBlink <= 0) {
        ctBlink = 0;
    }
    if (ct1 <= 0) {
        ct1 = 0;
    }
    if (ct2 <= 0) {
        ct2 = 0;
    }
    if (ct3 <= 0) {
        ct3 = 0;
    }
    if (ct4 <= 0) {
        ct4 = 0;
    }
    if (ct5 <= 0) {
        ct5 = 0;
    }
    if (ct6 <= 0) {
        ct6 = 0;
    }
    if (ct7 <= 0) {
        ct7 = 0;
    }
    if (ct8 <= 0) {
        ct8 = 0;
    }
    if (ct9 <= 0) {
        ct9 = 0;
    }

    // 쿨타임 표시
    // 에너지 볼
    if (Skill1 == 1) {
        if (ct1 > 0) {
            BasicSkill1.style.backgroundColor = 'gray';
            BS1CoolTime.style.display = 'flex';
            BS1CoolTime.textContent = ct1;
        } else {
            BasicSkill1.style.backgroundColor = 'white';
            BS1CoolTime.style.display = 'none';
        }
    }

    // 토네이도
    if (Skill1 == 1 && Skill2 == 1) {
        if (ct2 > 0) {
            BasicSkill2.style.backgroundColor = 'gray';
            BS2CoolTime.style.display = 'flex';
            BS2CoolTime.textContent = ct2;
        } else {
            BasicSkill2.style.backgroundColor = 'white';
            BS2CoolTime.style.display = 'none';
        }
    } else if ((Skill2 == 1 && Skill3 == 1) || (Skill2 == 1 && Skill4 == 1)) {
        if (ct2 > 0) {
            BasicSkill1.style.backgroundColor = 'gray';
            BS1CoolTime.style.display = 'flex';
            BS1CoolTime.textContent = ct2;
        } else {
            BasicSkill1.style.backgroundColor = 'white';
            BS1CoolTime.style.display = 'none';
        }
    }

    // 썬더
    if ((Skill1 == 1 && Skill3 == 1) || (Skill2 == 1 && Skill3 == 1)) {
        if (ct3 > 0) {
            BasicSkill2.style.backgroundColor = 'gray';
            BS2CoolTime.style.display = 'flex';
            BS2CoolTime.textContent = ct3;
        } else {
            BasicSkill2.style.backgroundColor = 'white';
            BS2CoolTime.style.display = 'none';
        }
    } else if (Skill3 == 1 && Skill4 == 1) {
        if (ct3 > 0) {
            BasicSkill1.style.backgroundColor = 'gray';
            BS1CoolTime.style.display = 'flex';
            BS1CoolTime.textContent = ct3;
        } else {
            BasicSkill1.style.backgroundColor = 'white';
            BS1CoolTime.style.display = 'none';
        }
    }

    // 마나 정령
    if (Skill4 == 1) {
        if (ct4 > 0) {
            BasicSkill2.style.backgroundColor = 'gray';
            BS2CoolTime.style.display = 'flex';
            BS2CoolTime.textContent = ct4;
        } else {
            BasicSkill2.style.backgroundColor = 'white';
            BS2CoolTime.style.display = 'none';
        }
    }

    // 배리어
    if (Skill5 == 1) {
        if (ct5 > 0) {
            MidSkill1.style.backgroundColor = 'gray';
            MS1CoolTime.style.display = 'flex';
            MS1CoolTime.textContent = ct5;
        } else {
            MidSkill1.style.backgroundColor = 'white';
            MS1CoolTime.style.display = 'none';
        }
    }

    // 프리즈
    if (Skill5 == 1 && Skill6 == 1) {
        if (ct6 > 0) {
            MidSkill2.style.backgroundColor = 'gray';
            MS2CoolTime.style.display = 'flex';
            MS2CoolTime.textContent = ct6;
        } else {
            MidSkill2.style.backgroundColor = 'white';
            MS2CoolTime.style.display = 'none';
        }
    } else if (Skill6 == 1 && Skill7 == 1) {
        if (ct6 > 0) {
            MidSkill1.style.backgroundColor = 'gray';
            MS1CoolTime.style.display = 'flex';
            MS1CoolTime.textContent = ct6;
        } else {
            MidSkill1.style.backgroundColor = 'white';
            MS1CoolTime.style.display = 'none';
        }
    }

    // 워터 페어리
    if (Skill7 == 1) {
        if (ct7 > 0) {
            MidSkill2.style.backgroundColor = 'gray';
            MS2CoolTime.style.display = 'flex';
            MS2CoolTime.textContent = ct7;
        } else {
            MidSkill2.style.backgroundColor = 'white';
            MS2CoolTime.style.display = 'none';
        }
    }

    // 블루 메테오
    if (Skill8 == 1) {
        if (ct8 > 0) {
            AdvSkill1.style.backgroundColor = 'gray';
            AS1CoolTime.style.display = 'flex';
            AS1CoolTime.textContent = ct8;
        } else {
            AdvSkill1.style.backgroundColor = 'white';
            AS1CoolTime.style.display = 'none';
        }
    }

    // 신월의 숲
    if (Skill9 == 1) {
        if (ct9 > 0) {
            AdvSkill1.style.backgroundColor = 'gray';
            AS1CoolTime.style.display = 'flex';
            AS1CoolTime.textContent = ct9;
        } else {
            AdvSkill1.style.backgroundColor = 'white';
            AS1CoolTime.style.display = 'none';
        }
    }
}
// 번개 데미지
function eletricDamage1() {

    DamageResult = Math.max(0, Math.ceil((BossATT * 2.8) - ((GUARD + BonusGUARD) * 2.5)));

    if (
        PlayerBody.right > (eletric1Body.left + 15) &&
        PlayerBody.left < (eletric1Body.right - 15) &&
        PlayerBody.bottom > eletric1Body.top &&
        PlayerBody.top < eletric1Body.bottom
    ) {
        HP -= DamageResult;
        Player.style.filter = 'brightness(60%)';
        Damage.textContent = '-' + DamageResult;
        setTimeout(function() {
            Player.style.filter = 'brightness(100%)';
        }, 500);
        setTimeout(function() {
            Damage.textContent = '';
        }, 1500);
        if (HP < 0) { // HP 음수 방지
            HP = 0;
        }
    }
}
function eletricDamage2() {

    DamageResult = Math.max(0, Math.ceil((BossATT * 2.8) - ((GUARD + BonusGUARD) * 2.5)));

    if (
        PlayerBody.right > (eletric2Body.left + 15) &&
        PlayerBody.left < (eletric2Body.right - 15) &&
        PlayerBody.bottom > eletric2Body.top &&
        PlayerBody.top < eletric2Body.bottom
    ) {
        HP -= DamageResult;
        Player.style.filter = 'brightness(60%)';
        Damage.textContent = '-' + DamageResult;
        setTimeout(function() {
            Player.style.filter = 'brightness(100%)';
        }, 500);
        setTimeout(function() {
            Damage.textContent = '';
        }, 1500);
        if (HP < 0) { // HP 음수 방지
            HP = 0;
        }
    }
}
function eletricDamage3() {

    DamageResult = Math.max(0, Math.ceil((BossATT * 2.8) - ((GUARD + BonusGUARD) * 2.5)));

    if (
        PlayerBody.right > (eletric3Body.left + 15) &&
        PlayerBody.left < (eletric3Body.right - 15) &&
        PlayerBody.bottom > eletric3Body.top &&
        PlayerBody.top < eletric3Body.bottom
    ) {
        HP -= DamageResult;
        Player.style.filter = 'brightness(60%)';
        Damage.textContent = '-' + DamageResult;
        setTimeout(function() {
            Player.style.filter = 'brightness(100%)';
        }, 500);
        setTimeout(function() {
            Damage.textContent = '';
        }, 1500);
        if (HP < 0) { // HP 음수 방지
            HP = 0;
        }
    }
}
function eletricDamage4() {

    DamageResult = Math.max(0, Math.ceil((BossATT * 2.8) - ((GUARD + BonusGUARD) * 2.5)));

    if (
        PlayerBody.right > (eletric4Body.left + 15) &&
        PlayerBody.left < (eletric4Body.right - 15) &&
        PlayerBody.bottom > eletric4Body.top &&
        PlayerBody.top < eletric4Body.bottom
    ) {
        HP -= DamageResult;
        Player.style.filter = 'brightness(60%)';
        Damage.textContent = '-' + DamageResult;
        setTimeout(function() {
            Player.style.filter = 'brightness(100%)';
        }, 500);
        setTimeout(function() {
            Damage.textContent = '';
        }, 1500);
        if (HP < 0) { // HP 음수 방지
            HP = 0;
        }
    }
}
// 구체 데미지
function bossballDamage() {

    DamageResult = Math.max(0, Math.ceil((BossATT * 4.9) - ((GUARD + BonusGUARD) * 2)));

    if (
        PlayerBody.right > bossballBody.left &&
        PlayerBody.left < bossballBody.right &&
        PlayerBody.bottom > bossballBody.top &&
        PlayerBody.top < bossballBody.bottom
    ) {
        slowDebuff();
        HP -= DamageResult;
        Player.style.filter = 'brightness(60%)';
        Damage.textContent = '-' + DamageResult;
        setTimeout(function() {
            Player.style.filter = 'brightness(100%)';
        }, 500);
        setTimeout(function() {
            Damage.textContent = '';
        }, 1500);
        if (HP < 0) { // HP 음수 방지
            HP = 0;
        }
    }
}
// 독의 공간
function MapPoisonDamage() {

    DamageResult = Math.max(0, Math.ceil((BossATT * 2.2) - ((GUARD + BonusGUARD) * 2.5)));

    if (
        PlayerBody.right > poisonBody.left &&
        PlayerBody.left < poisonBody.right &&
        PlayerBody.bottom > poisonBody.top &&
        PlayerBody.top < poisonBody.bottom
    ) {
        if (toxic == 0) {
            toxicDebuff();
        }
        HP -= DamageResult;
        Player.style.filter = 'brightness(60%)';
        Damage.textContent = '-' + DamageResult;
        setTimeout(function() {
            Player.style.filter = 'brightness(100%)';
        }, 500);
        setTimeout(function() {
            Damage.textContent = '';
        }, 1500);
        if (HP < 0) { // HP 음수 방지
            HP = 0;
        }
    }
}
// 선사파이어의 구체
function SunsapireBallDamage() {

    DamageResult = Math.max(0, Math.ceil((BossATT * 3.4) - ((GUARD + BonusGUARD) * 2.5)));

    if (
        PlayerBody.right > mapballBody.left &&
        PlayerBody.left < mapballBody.right &&
        PlayerBody.bottom > mapballBody.top &&
        PlayerBody.top < mapballBody.bottom
    ) {
        HP -= DamageResult;
        MP -= 5;
        Player.style.filter = 'brightness(60%)';
        Damage.textContent = '-' + DamageResult;
        setTimeout(function() {
            Player.style.filter = 'brightness(100%)';
        }, 500);
        setTimeout(function() {
            Damage.textContent = '';
        }, 1500);
        if (HP < 0) { // HP 음수 방지
            HP = 0;
        }
    }
}
// 푸른 불꽃 데미지
function bossfireDamage() {

    DamageResult = Math.max(0, Math.ceil((BossATT * 3) - ((GUARD + BonusGUARD) * 2.5)));

    for (let x = 0; x < 14; x++) {
        if (
            PlayerBody.right > bossfireBody[x].left &&
            PlayerBody.left < bossfireBody[x].right &&
            PlayerBody.bottom > bossfireBody[x].top &&
            PlayerBody.top < bossfireBody[x].bottom
        ) {
            HP -= DamageResult;
            Player.style.filter = 'brightness(60%)';
            Damage.textContent = '-' + DamageResult;
            setTimeout(function() {
                Player.style.filter = 'brightness(100%)';
            }, 500);
            setTimeout(function() {
                Damage.textContent = '';
            }, 1500);
            if (HP < 0) { // HP 음수 방지
                HP = 0;
            }
        }
    }
}
// 흑마법 폭주 데미지
function bmagicDamage() {

    DamageResult = Math.max(0, Math.ceil((BossATT * 10) - ((GUARD + BonusGUARD) * 2)));

    if (
        PlayerBody.right > shieldBody.left &&
        PlayerBody.left < shieldBody.right &&
        PlayerBody.bottom > shieldBody.top &&
        PlayerBody.top < shieldBody.bottom && Startbmagic == 1
    ) {
        MP += 5;
    } else if (Startbmagic == 1) {
        HP -= DamageResult;
        MP -= 5;
        Player.style.filter = 'brightness(60%)';
        Damage.textContent = '-' + DamageResult;
        setTimeout(function() {
            Player.style.filter = 'brightness(100%)';
        }, 500);
        setTimeout(function() {
            Damage.textContent = '';
        }, 1500);
        if (HP < 0) { // HP 음수 방지
            HP = 0;
        }
    }
}
function slowDebuff() { // 디버프 감속
    slowness = 1;
    CelineDeBuff2.style.display = 'flex';
    Speed = 10;
    setTimeout(function() {
        slowness = 0;
        CelineDeBuff2.style.display = 'none';
        Speed = 18;
    }, 8000 / (GuardM + 1));
}
function toxicDebuff() { // 디버프 중독
    let toxicDamage;
    toxic = 1; // 중독 상태 체공 불가
    CelineDeBuff1.style.display = 'flex';
    toxicDamage = setInterval(function() {
        Player.style.filter = 'hue-rotate(60deg)'
        HP -= 30;
    }, 2000);
    setTimeout(function() {
        toxic = 0;
        clearInterval(toxicDamage);
        CelineDeBuff1.style.display = 'none';
        Player.style.filter = 'none';
    }, 10000 / (GuardM + 1));
}
