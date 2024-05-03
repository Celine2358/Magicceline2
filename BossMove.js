// 초기 위치 설정
let BossX = 1500;
let BossY = 360; // Y축

// 보스 움직임 변수 0:False 1:True
let BossLeft = 0; 
let IsTeleport = 0;
let IsEletric = 0;
let IsBall = 0;
let IsFire = 0;
let IsMapBall = 0;

// 흑마법 게이지
let bmcharge = 0; // 0% ~ 100%
let bmempty = 100;

const Boss = document.getElementById('Boss'); // 보스
const BossImg = document.getElementById('KuroImg'); // 보스 이미지
const bmBar = document.getElementById('BlackMagicBar'); // 흑마법 게이지
const KuroDamage = document.getElementById('KuroDamage'); // 데미지 이펙트
const BindDamage = document.getElementById('BindDamage'); // 속박 데미지 이펙트

// 보스 메세지
let Phase2Msg = 0;
let Phase3Msg = 0;
let EndMsg = 0;

// 패턴
const eletric1 = document.getElementById('BossSkill1'); // 번개 1 이미지
const eletric2 = document.getElementById('BossSkill1-1'); // 번개 2 이미지
const eletric3 = document.getElementById('BossSkill1-2'); // 번개 3 이미지
const eletric4 = document.getElementById('BossSkill1-3'); // 번개 4 이미지
const MapPoison = document.getElementById('MapPoison'); // 독의 공간
const bossball = document.getElementById('BossSkill2'); // 구체 이미지
// 푸른 불꽃
const bossfire = [];
for (let i = 0; i < 14; i++) {
    bossfire[i] = document.getElementById(`BossSkill3-${i}`);
}
const MapBall = document.getElementById('MapBall'); // 선사파이어의 구체
const bmagic = document.getElementById('BlackMagic'); // 흑마법 폭주
var Startbmagic = 0;

// 흑마법 보호막
const shield = document.getElementById('Shield'); // 보호막 이미지

// 소리 파일
const BossSound1 = document.getElementById('BossSound1'); // 등장
const BossSound2 = document.getElementById('BossSound2'); // 텔레포트
const BossSound3 = document.getElementById('BossSound3'); // 번개
const BossDisappear = document.getElementById('BossDisappear'); // 소멸
const ASound1 = document.getElementById('BossAtt1Sound'); // 번개 효과음
const BossSound4 = document.getElementById('BossAtt2Sound'); // 구체
const PoisonSound = document.getElementById('PoisonSound'); // 독 효과음
const MapBallSound = document.getElementById('MapBallSound'); // 선사파이어의 구체 효과음
const BlackMagicSound = document.getElementById('BlackMagicSound'); // 흑마법 폭주 효과음

// 충돌 위치
let KuroBody; // 보스
let eletric1Body; // 번개 1
let eletric2Body; // 번개 2
let eletric3Body; // 번개 3
let eletric4Body; // 번개 4
let poisonBody; // 독의 공간
let bossballBody; // 구체
let mapballBody; // 선사파이어의 구체
let shieldBody; // 보호막

// 푸른 불꽃 충돌 위치
let bossfireBody = [];
for (let j = 0; j < 14; j++) {
    bossfireBody[j];
}

// 음량
BossSound1.volume = 0.5;
BossSound2.volume = 0.5;
BossSound3.volume = 0.5;
BossSound4.volume = 0.4;
ASound1.volume = 0.5;
PoisonSound.volume = 0.4;
MapBallSound.volume = 0.35;
BlackMagicSound.volume = 0.5;
BossDisappear.volume = 0.7;

document.addEventListener('DOMContentLoaded', function() {

    setInterval(function() {
        if (KuroPhase2 == 1 && Phase2Msg == 0) {
            Phase2Msg = 1;
            PatternInfo3.style.display = 'block';
            PatternInfo3.innerHTML = "가소로운 것... 나의 푸른 불꽃으로 전부 불태워주마...!!!"
            setTimeout(function() {
                PatternInfo3.style.display = 'none';
                PatternInfo3.innerHTML = ""
            }, 4000);
        } else if (KuroPhase3 == 1 && Phase3Msg == 0) {
            Phase3Msg = 1;
            PatternInfo3.style.display = 'block';
            PatternInfo3.innerHTML = "<span style='color: red'>선사파이어의 명예를 걸고... 내 힘을 전부 보여주마!!</span>"
            setTimeout(function() {
                PatternInfo3.style.display = 'none';
                PatternInfo3.innerHTML = ""
            }, 4000);
        } else if (BossHP <= 0 && EndMsg == 0) {
            EndMsg = 1
            PatternInfo3.style.display = 'block';
            PatternInfo3.innerHTML = "<span style='color: white'>내 힘이...!! 최..비령 님에게.. 다가가게 둘 순 없다... 크아아아악...!!!</span>"
            setTimeout(function() {
                PatternInfo3.style.display = 'none';
                PatternInfo3.innerHTML = ""
            }, 5000);
            setTimeout(function() {
                document.getElementById('Ending').style.display = 'block';
                document.getElementById('Time').innerHTML = `<span style="color: blue">ClearTime</span><br>${minutes}분 ${seconds}초`;
            }, 5500);
        }
    }, 1000);

    setInterval(function() { // 보스 위치 업데이트
        Boss.style.left = BossX + 'px';
        Boss.style.top = BossY + 'px';
        KuroDamage.style.left = (BossX + 50) + 'px';
        BindDamage.style.left = (BossX + 50) + 'px';
        KuroBody = Boss.getBoundingClientRect();
    }, 100);

    setInterval(function() { // 보스 방향
        if (IsFreeze == 0 && BossHP > 0) {
            BossStand();
        }
    }, 3000);

    setInterval(function() { // 보스 텔레포트
        if (IsEletric == 0 && IsBall == 0 && IsFire == 0 && IsFreeze == 0 && IsForest == 0 && BossHP > 0) {
            BossTP();
        }
    }, 20000);
    setInterval(function() { // 보스 번개
        if (IsTeleport == 0 && IsBall == 0 && IsFire == 0 && IsFreeze == 0 && IsForest == 0 && BossHP > 0) {
            BossEletric();
        }
    }, 12000 - (KuroPhase3 * 2000));
    setInterval(function() { // 보스 구체
        if (IsEletric == 0 && IsTeleport == 0 && IsFire == 0 && IsFreeze == 0 && IsForest == 0 && BossHP > 0) {
            BossBall();
        }
    }, 14000 - (KuroPhase3 * 4000));
    setInterval(function() { // 보스 푸른 불꽃
        if (IsEletric == 0 && IsTeleport == 0 && IsBall == 0 && IsFreeze == 0 && IsForest == 0 && BossHP > 0 && (KuroPhase2 == 1 || KuroPhase3 == 1)) {
            BossFire();
        }
    }, 25000 - (KuroPhase3 * 8000));
    setInterval(function() { // 맵 패턴 : 독
        if (IsForest == 0 && BossHP > 0) {
            Poison();
        }
    }, 22000 - (KuroPhase3 * 4000));
    setInterval(function() { // 맵 패턴 : 구체
        if ((KuroPhase2 == 1 || KuroPhase3 == 1) && BossHP > 0) {
            SunsapireBall();
        }
    }, 50000 - (KuroPhase3 * 6000));
    // 흑마법 관련
    setInterval(function() {
        if (IsForest == 0 && BossHP > 0) {
            boss_Blackmagic()
        }
    }, 1500 - (KuroPhase3 * 500));

    setTimeout(function() {
        BossSound1.play();
        Boss.style.opacity = 0.2;
        setTimeout(function() {
            Boss.style.opacity = 0.4;
            setTimeout(function() {
                Boss.style.opacity = 0.6;
                setTimeout(function() {
                    Boss.style.opacity = 0.8;
                    setTimeout(function() {
                        Boss.style.opacity = 1.0;
                    }, 500);
                }, 500);
            }, 500);
        }, 500);
    }, 1500);

    function BossStand() {
        if (BossX > 0 && BossX < 740) { // 좌측
            BossLeft = 1;
            Boss.style.transform = 'scaleX(-1)';
        } else if (BossX >= 740) { // 우측
            BossLeft = 0;
            Boss.style.transform = 'scaleX(1)';
        }
        BossSee();
    }
    function BossSee() {  // 셀리느 주시하기
        if ((BossX + 150) < PlayerX) {
            BossLeft = 1;
            Boss.style.transform = 'scaleX(-1)';
        } else if (BossX > PlayerX) {
            BossLeft = 0;
            Boss.style.transform = 'scaleX(1)';
        }
    }
    function BossTP() { // 텔레포트
        BossImg.src = 'BossKuroTP.gif';
        IsTeleport = 1;
        setTimeout(function() {
            BossSound2.play();
            Boss.style.opacity = 0;
            BossX = Math.floor(Math.random() * (1550 - 20 + 1)) + 20;
        }, 2500);
        setTimeout(function() {
            Boss.style.opacity = 1.0;
            BossImg.src = 'BossKuroAppear.gif';
        }, 5500);
        setTimeout(function() {
            BossImg.src = 'KuroStand.gif';
            IsTeleport = 0;
        }, 6200);
    }
    function BossEletric() { // 보스 번개
        BossImg.src = 'BossKuroThunder.gif';
        BossSound3.play();
        IsEletric = 1;
        let eletric1deg = Math.floor(Math.random() * (25 - (-25) + 1)) + (-25);
        let eletric2deg = Math.floor(Math.random() * (25 - (-25) + 1)) + (-25);
        let eletric3deg = Math.floor(Math.random() * (25 - (-25) + 1)) + (-25);
        let eletric4deg = Math.floor(Math.random() * (25 - (-25) + 1)) + (-25);

        setTimeout(function() {
            BossImg.src = 'KuroStand.gif';
            eletric1.style.display = 'block';
            eletric1.style.left = (Math.floor(Math.random() * (1700 - 10 + 1)) + 10) + 'px';
            eletric1.style.transform = 'rotate(' + eletric1deg + 'deg)';

            eletric2.style.display = 'block';
            eletric2.style.left = (Math.floor(Math.random() * (1700 - 10 + 1)) + 10) + 'px';
            eletric2.style.transform = 'rotate(' + eletric2deg + 'deg)';

            eletric3.style.display = 'block';
            eletric3.style.left = (Math.floor(Math.random() * (1700 - 10 + 1)) + 10) + 'px';
            eletric3.style.transform = 'rotate(' + eletric3deg + 'deg)';
            
            if (BossHP < 100000) {
                eletric4.style.display = 'block';
                eletric4.style.left = (Math.floor(Math.random() * (1700 - 10 + 1)) + 10) + 'px';
                eletric4.style.transform = 'rotate(' + eletric4deg + 'deg)';
            }
            
        }, 2400);
        setTimeout(function() {
            IsEletric = 0;
            ASound1.play();
            eletric1.getElementsByTagName('img')[0].src = 'BossAtt1.gif';
            eletric1.style.backgroundColor = 'transparent';
            eletric1.style.filter = 'brightness(60%) hue-rotate(290deg)';
            eletric2.getElementsByTagName('img')[0].src = 'BossAtt1.gif';
            eletric2.style.backgroundColor = 'transparent';
            eletric2.style.filter = 'brightness(60%) hue-rotate(290deg)';
            eletric3.getElementsByTagName('img')[0].src = 'BossAtt1.gif';
            eletric3.style.backgroundColor = 'transparent';
            eletric3.style.filter = 'brightness(60%) hue-rotate(290deg)';
            // 충돌 위치 업데이트
            eletric1Body = eletric1.getBoundingClientRect();
            eletric2Body = eletric2.getBoundingClientRect();
            eletric3Body = eletric3.getBoundingClientRect();

            if (BossHP < 100000) {
                eletric4.getElementsByTagName('img')[0].src = 'BossAtt1.gif';
                eletric4.style.backgroundColor = 'transparent';
                eletric4.style.filter = 'brightness(60%) hue-rotate(290deg)';
                // 충돌 위치 업데이트
                eletric4Body = eletric4.getBoundingClientRect();
            }
            
        }, 4800);
        setTimeout(function() {
            eletric1.getElementsByTagName('img')[0].src = 'empty.png';
            eletric1.style.backgroundColor = 'rgba(178, 34, 34, 0.4)';
            eletric1.style.filter = 'none';
            eletric1.style.display = 'none';

            eletric2.getElementsByTagName('img')[0].src = 'empty.png';
            eletric2.style.backgroundColor = 'rgba(178, 34, 34, 0.4)';
            eletric2.style.filter = 'none';
            eletric2.style.display = 'none';

            eletric3.getElementsByTagName('img')[0].src = 'empty.png';
            eletric3.style.backgroundColor = 'rgba(178, 34, 34, 0.4)';
            eletric3.style.filter = 'none';
            eletric3.style.display = 'none';

            eletric4.getElementsByTagName('img')[0].src = 'empty.png';
            eletric4.style.backgroundColor = 'rgba(178, 34, 34, 0.4)';
            eletric4.style.filter = 'none';
            eletric4.style.display = 'none';

            // 충돌 위치 업데이트
            eletric1Body = eletric1.getBoundingClientRect();
            eletric2Body = eletric2.getBoundingClientRect();
            eletric3Body = eletric3.getBoundingClientRect();
            eletric4Body = eletric4.getBoundingClientRect();
        }, 7200);
    }
    function Poison() {
        MapPoison.style.display = 'block';
        MapPoison.style.left = (Math.floor(Math.random() * (1550 - 10 + 1)) + 10) + 'px';
        setTimeout(function() {
            PoisonSound.play();
            MapPoison.getElementsByTagName('img')[0].src = 'poison.gif';
            MapPoison.style.backgroundColor = 'transparent';
            // 충돌 위치 업데이트
            poisonBody = MapPoison.getBoundingClientRect();
        }, 2000);
        setTimeout(function() {
            MapPoison.style.display = 'none';
            MapPoison.getElementsByTagName('img')[0].src = 'empty.png';
            MapPoison.style.backgroundColor = 'rgba(152, 251, 152, 0.4)';
            // 충돌 위치 업데이트
            poisonBody = MapPoison.getBoundingClientRect();
        }, 10000);
    }
    function BossBall() { // 보스 구체
        let bossballX = BossX;
        let bossballAtt;
        let bossballLeft;
        BossImg.src = 'BossKuroSkill1.gif';
        BossSound4.play();
        IsBall = 1;
        setTimeout(function() {
            BossImg.src = 'KuroStand.gif';
            IsBall = 0;
            if (BossLeft == 0) {
                bossball.style.left = bossballX + 'px';
                bossballAtt = setInterval(function() {
                    bossball.style.display = 'block';
                    bossballX -= 11;
                    bossball.style.left = bossballX + 'px';
                    setInterval(function() {
                        // 스킬 충돌 감지
                        bossballBody = bossball.getBoundingClientRect();
                    }, 10);
                }, 20);
            } else if (BossLeft == 1) {
                bossballX = (BossX + 150);
                bossball.style.left = (bossballX + 150) + 'px';
                bossballLeft = setInterval(function() {
                    bossball.style.display = 'block';
                    bossballX += 11;
                    bossball.style.left = bossballX + 'px';
                    setInterval(function() {
                        // 스킬 충돌 감지
                        bossballBody = bossball.getBoundingClientRect();
                    }, 10);
                }, 20);
            }
        }, 2000);
        setTimeout(function() {
            clearInterval(bossballAtt);
            clearInterval(bossballLeft);
            bossball.style.display = 'none';
            // 스킬 충돌 감지
            bossballBody = bossball.getBoundingClientRect();
        }, 7000);
    }
    function BossFire() { // 푸른 불꽃
        let FireRandom = Math.floor(Math.random() * 12 + 3);
        let FireXRandom = [];
        BossImg.src = 'BossKuroSkill2.gif';
        IsFire = 1;
        for(let a=0; a < FireRandom; a++) {
            FireXRandom[a] = Math.ceil(Math.random() * (1750 + 1) / 10) * 10;
        }
        setTimeout(function() {
            for (let b=0; b < FireRandom; b++) {
                bossfire[b].style.display = 'block';
                bossfire[b].style.left = FireXRandom[b] + 'px';
            }
        }, 2000);
        setTimeout(function() {
            BossImg.src = 'KuroStand.gif';
            IsFire = 0;
            BossSound1.play();
            for (let c=0; c < FireRandom; c++) {
                bossfire[c].style.opacity = 1.0;
                // 스킬 충돌 감지
                bossfireBody[c] = bossfire[c].getBoundingClientRect();
            }
        }, 6000);
        setTimeout(function() {
            for (let d=0; d < FireRandom; d++) {
                bossfire[d].style.display = 'none';
                bossfire[d].style.opacity = 0.35;
                // 스킬 충돌 감지
                bossfireBody[d] = bossfire[d].getBoundingClientRect();
            }
        }, 13000);
    }
    function SunsapireBall() { // 선사파이어의 구체
        let MapBallOp = 0.1;
        let MapBallX = 5;
        let MapBallY = 5;
        MapBall.style.display = 'block';
        MapBall.style.left = MapBallX + 'px';
        MapBall.style.top = MapBallY + 'px';
        IsMapBall = 1;
        setInterval(function() {
            MapBallOp += 0.1;
            MapBall.style.opacity = MapBallOp;
        }, 200);
        bounceA();
        function bounceA() {
            let bouncerA = setInterval(function() {
                MapBallX += 6.25;
                MapBallY += 15;
                MapBall.style.left = MapBallX + 'px';
                MapBall.style.top = MapBallY + 'px';
                // 스킬 충돌 감지
                mapballBody = MapBall.getBoundingClientRect();
            }, 100);
            setTimeout(function() {
                clearInterval(bouncerA);
                MapBallSound.play();
                bounceB();
            }, 4000);
        }
        function bounceB() {
            let bouncerB = setInterval(function() {
                MapBallX += 6.25;
                MapBallY -= 15;
                MapBall.style.left = MapBallX + 'px';
                MapBall.style.top = MapBallY + 'px';
                // 스킬 충돌 감지
                mapballBody = MapBall.getBoundingClientRect();
            }, 100);
            setTimeout(function() {
                clearInterval(bouncerB);
                MapBallSound.play();
                bounceC();
            }, 4000);
        }
        function bounceC() {
            let bouncerC = setInterval(function() {
                MapBallX += 6.25;
                MapBallY += 15;
                MapBall.style.left = MapBallX + 'px';
                MapBall.style.top = MapBallY + 'px';
                // 스킬 충돌 감지
                mapballBody = MapBall.getBoundingClientRect();
            }, 100);
            setTimeout(function() {
                clearInterval(bouncerC);
                MapBallSound.play();
                bounceD();
            }, 4000);
        }
        function bounceD() {
            let bouncerD = setInterval(function() {
                MapBallX += 6.25;
                MapBallY -= 15;
                MapBall.style.left = MapBallX + 'px';
                MapBall.style.top = MapBallY + 'px';
                // 스킬 충돌 감지
                mapballBody = MapBall.getBoundingClientRect();
            }, 100);
            setTimeout(function() {
                clearInterval(bouncerD);
                MapBallSound.play();
                bounceE();
            }, 4000);
        }
        function bounceE() {
            let bouncerE = setInterval(function() {
                MapBallX += 6.25;
                MapBallY += 15;
                MapBall.style.left = MapBallX + 'px';
                MapBall.style.top = MapBallY + 'px';
                // 스킬 충돌 감지
                mapballBody = MapBall.getBoundingClientRect();
            }, 100);
            setTimeout(function() {
                clearInterval(bouncerE);
                MapBallSound.play();
                bounceF();
            }, 4000);
        }
        function bounceF() {
            let bouncerF = setInterval(function() {
                MapBallX += 6.25;
                MapBallY -= 15;
                MapBall.style.left = MapBallX + 'px';
                MapBall.style.top = MapBallY + 'px';
                // 스킬 충돌 감지
                mapballBody = MapBall.getBoundingClientRect();
            }, 100);
            setTimeout(function() {
                clearInterval(bouncerF);
                MapBallSound.play();
                bounceG();
            }, 4000);
        }
        function bounceG() {
            let bouncerG = setInterval(function() {
                MapBallX += 6.25;
                MapBallY += 15;
                MapBall.style.left = MapBallX + 'px';
                MapBall.style.top = MapBallY + 'px';
                // 스킬 충돌 감지
                mapballBody = MapBall.getBoundingClientRect();
            }, 100);
            setTimeout(function() {
                clearInterval(bouncerG);
                MapBallSound.play();
                MapBall.style.display = 'none';
                MapBall.style.opacity = 0.1;
                // 스킬 충돌 감지
                mapballBody = MapBall.getBoundingClientRect();
                IsMapBall = 0;
            }, 4000);
        }
    }
    function boss_Blackmagic() { // 흑마법 게이지

        bmcharge += 1;
        bmempty -= 1;

        bmBar.style.background = 'linear-gradient(to right, black ' + bmcharge + '%, white ' + bmempty + '%)';
        bmBar.textContent = bmcharge + '%';

        if (bmcharge == 99) {
            BlackmagicBoom();
        }

        if (bmcharge > 99) { // 초과 방지
            bmcharge = 99;
            bmempty = 1;
        }

        function BlackmagicBoom() {
            PatternInfo2.style.display = 'block';
            bmBar.style.boxShadow = '0 0 30px crimson';
            shield.style.display = 'block';
            shield.style.left = (Math.floor(Math.random() * (1700 - 10 + 1)) + 10) + 'px';
            // 스킬 충돌 감지
            shieldBody = shield.getBoundingClientRect();
            setTimeout(function() {
                PatternInfo2.style.display = 'none';
                Startbmagic = 1;
                bmagic.style.display = 'block';
                BlackMagicSound.play();
                // 게이지 초기화
                bmcharge = 0;
                bmempty = 100;
            }, 5000);
            setTimeout(function() {
                bmagic.style.display = 'none';
                bmBar.style.background = 'linear-gradient(to right, black ' + bmcharge + '%, white ' + bmempty + '%)';
                bmBar.style.boxShadow = '0 0 25px white';
                shield.style.display = 'none';
                Startbmagic = 0;
                // 스킬 충돌 감지
                shieldBody = shield.getBoundingClientRect();
            }, 7400);
        }
    }
})