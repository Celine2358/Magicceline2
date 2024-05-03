// 초기 위치 설정
let PlayerX = 40;
let PlayerY = 620; // Y축

// 셀리느 이동속도
let Speed = 18;

// 셀리느 힐량
let healAmount = 300;

// 셀리느 움직임 변수 0:False 1:True
let Left = 0; // 좌측 이동
let Blinking = 0; // 체공
let IsBarrier = 0; // 배리어

// 스킬 로컬 스토리지
let Skill1 = parseInt(localStorage.getItem('Skill1'));
let Skill2 = parseInt(localStorage.getItem('Skill2'));
let Skill3 = parseInt(localStorage.getItem('Skill3'));
let Skill4 = parseInt(localStorage.getItem('Skill4'));
let Skill5 = parseInt(localStorage.getItem('Skill5'));
let Skill6 = parseInt(localStorage.getItem('Skill6'));
let Skill7 = parseInt(localStorage.getItem('Skill7'));
let Skill8 = parseInt(localStorage.getItem('Skill8'));
let Skill9 = parseInt(localStorage.getItem('Skill9'));

// 클리어 타임
let ClearTime = 0;
let minutes = 0;
let seconds = 0;

// 소환수
let IsWisp = 0; // 0:False 1:True
let WispX = 20; // 정령 X축
let WispAppX = 20; // 정령 출현
let wispAttX = 20; // 정령 공격
let IsFairy = 0; // 0:False 1:True
let FairyX = 20; // 페어리 X축
let FairyAppX = 20; // 페어리 출현
let FairyAttX = 20; // 페어리 공격

// 빙결
let IsFreeze = 0; // 0:False 1:True

// 메테오
let IsMeteor = 0; // 0:False 1:True

// 신월의 숲
let IsForest = 0; // 0:False 1:True
let ForestHarming = 0; // 0:False 1:True

const AddInfo = document.getElementById("AddInfo"); // 추가 정보
const PatternInfo1 = document.getElementById("PatternInfo1"); // 보스 패턴 정보
const PatternInfo2 = document.getElementById("PatternInfo2"); // 보스 패턴 정보
const PatternInfo3 = document.getElementById("PatternInfo3"); // 보스 패턴 정보
const Player = document.getElementById("Celine"); // 셀리느 플레이어
const Blink = document.getElementById("Blink"); // 체공 이펙트
const Damage = document.getElementById('Damage'); // 데미지 이펙트
const ball = document.getElementById("Sk1"); // 에너지볼 이펙트
const tor = document.getElementById("Sk2"); // 토네이도 이펙트
const thunder = document.getElementById("Sk3"); // 썬더 이펙트
const wisp = document.getElementById("Sk4"); // 마나 정령 이펙트
const barrier = document.getElementById("Sk5"); // 배리어 이펙트
const freeze = document.getElementById("Sk6"); // 프리즈 이펙트
const fairy = document.getElementById("Sk7"); // 페어리 이펙트
const wispAtt = document.getElementById("WispAttack"); // 정령 공격 이펙트
const wispApp = document.getElementById("WispAppear"); // 정령 소환 이펙트
const fairyAtt = document.getElementById("FairyAttack"); // 페어리 공격 이펙트
const fairyApp = document.getElementById("FairyAppear"); // 페어리 소환 이펙트
const meteor1 = document.getElementById("Sk8"); // 메테오1 이펙트
const meteor2 = document.getElementById("Sk8-1"); // 메테오2 이펙트
const meteor3 = document.getElementById("Sk8-2"); // 메테오3 이펙트
const meteor4 = document.getElementById("Sk8-3"); // 메테오4 이펙트
const leaf = document.getElementById("Sk9"); // 신월의 숲 나뭇잎 이펙트
const heal = document.getElementById("Heal"); // 힐 이펙트
const ice = document.getElementById("ice"); // 빙결 이펙트
const PlayerImg = document.getElementById("CelineImg"); // 셀리느 이미지
const MapImg = document.getElementById("MapImg"); // 맵 이미지

// 스킬 아이콘
const BS1Img = document.getElementById("BS1Img"); // 초급 1 아이콘
const BS2Img = document.getElementById("BS2Img"); // 초급 2 아이콘
const MS1Img = document.getElementById("MS1Img"); // 중급 1 아이콘
const MS2Img = document.getElementById("MS2Img"); // 중급 2 아이콘
const AS1Img = document.getElementById("AS1Img"); // 고급 아이콘

// 소리 파일
const BossBGM = document.getElementById('BGM');
const ForestBGM = document.getElementById('ForestBGM');
const BlinkSound = document.getElementById('BlinkSound'); // 체공 사운드
const ballSound = document.getElementById('Skill1Sound'); // 에너지볼 사운드
const torSound = document.getElementById('Skill2Sound'); // 토네이도 사운드
const thunderSound = document.getElementById('Skill3Sound'); // 썬더 사운드
const wispAttSound = document.getElementById('Skill4Sound'); // 정령 공격 사운드
const barrierSound = document.getElementById('Skill5Sound'); // 배리어 사운드
const freezeSound = document.getElementById('Skill6Sound'); // 프리즈 사운드
const fairySound = document.getElementById('Skill7Sound'); // 페어리 사운드
const meteorSound = document.getElementById('Skill8Sound'); // 메테오 사운드
const healSound = document.getElementById('HealSound'); // 힐 사운드
const fairyAttackSound = document.getElementById('FairyAttackSound'); // 페어리 공격 사운드

// 충돌 위치
let PlayerBody; // 셀리느

// 스킬 충돌 위치
let ballBody;
let torBody;
let thunderBody;
let wispAttBody;
let iceBody;
let fairyAttBody;

// 블루 메테오 발동
let meteorDrop = 0;

// 음량
BossBGM.volume = 0.5;
ForestBGM.volume = 0.45;
BlinkSound.volume = 0.3;
ballSound.volume = 0.3;
torSound.volume = 0.4;
thunderSound.volume = 0.4;
wispAttSound.volume = 0.4;
barrierSound.volume = 0.5;
freezeSound.volume = 0.4;
fairySound.volume = 0.4;
fairyAttackSound.volume = 0.4;
meteorSound.volume = 0.5;


document.addEventListener('DOMContentLoaded', function() {

    setInterval(function() {
        document.getElementById('StatInfo').innerHTML = 
        "<span style='color: red'>공격력</span> : " + Math.ceil(ATT) + "<br><span style='color: blue'>방어력</span> : " + Math.ceil(GUARD) + "<br><span style='color: crimson'>크리티컬</span> : " + CRI + '%';
    }, 500);

    setInterval(function() { // 클리어 타임
        UpdateClearTime();
    }, 1000);

    function UpdateClearTime() {
        if (BossHP > 0) {
            ClearTime += 1;
            minutes = Math.floor(ClearTime / 60);
            seconds = ClearTime % 60;
        }
    }

    setTimeout(function() {
        AddInfo.style.opacity = 0.7;
        setTimeout(function() {
            AddInfo.style.opacity = 0.4;
            setTimeout(function() {
                AddInfo.style.opacity = 0.2;
                setTimeout(function() {
                    AddInfo.style.display = 'none';
                    PatternInfo1.style.display = 'block'
                }, 500);
            }, 500);
        }, 500);
    }, 4000);
    setTimeout(function() {
        PatternInfo1.style.opacity = 0.7;
        setTimeout(function() {
            PatternInfo1.style.opacity = 0.4;
            setTimeout(function() {
                PatternInfo1.style.opacity = 0.2;
                setTimeout(function() {
                    PatternInfo1.style.display = 'none';
                }, 500);
            }, 500);
        }, 500);
    }, 9000);

    setInterval(function() {
        Damage.style.left = (PlayerX + 5) + 'px';
        Damage.style.top = (PlayerY - 60) + 'px';
    }, 100);

    // 초급
    if (Skill1 == 1 && Skill2 == 1) {
        BS1Img.src = 'Skillicon1.png';
        BS2Img.src = 'Skillicon2.png';
        document.getElementById('BS1').innerHTML = 'Z<br><br><br><span style="color: blue">3%</span>';
        document.getElementById('BS2').innerHTML = 'X<br><br><br><span style="color: blue">6%</span>';

    } else if (Skill1 == 1 && Skill3 == 1) {
        BS1Img.src = 'Skillicon1.png';
        BS2Img.src = 'Skillicon3.png';
        document.getElementById('BS1').innerHTML = 'Z<br><br><br><span style="color: blue">3%</span>';
        document.getElementById('BS2').innerHTML = 'C<br><br><br><span style="color: blue">10%</span>';

    } else if (Skill1 == 1 && Skill4 == 1) {
        BS1Img.src = 'Skillicon1.png';
        BS2Img.src = 'Skillicon4.png';
        document.getElementById('BS1').innerHTML = 'Z<br><br><br><span style="color: blue">3%</span>';
        document.getElementById('BS2').innerHTML = 'A<br><br><br><span style="color: blue">15%</span>';

    } else if (Skill2 == 1 && Skill3 == 1) {
        BS1Img.src = 'Skillicon2.png';
        BS2Img.src = 'Skillicon3.png';
        document.getElementById('BS1').innerHTML = 'X<br><br><br><span style="color: blue">6%</span>';
        document.getElementById('BS2').innerHTML = 'C<br><br><br><span style="color: blue">10%</span>';

    } else if (Skill2 == 1 && Skill4 == 1) {
        BS1Img.src = 'Skillicon2.png';
        BS2Img.src = 'Skillicon4.png';
        document.getElementById('BS1').innerHTML = 'X<br><br><br><span style="color: blue">6%</span>';
        document.getElementById('BS2').innerHTML = 'A<br><br><br><span style="color: blue">15%</span>';

    } else if (Skill3 == 1 && Skill4 == 1) {
        BS1Img.src = 'Skillicon3.png';
        BS2Img.src = 'Skillicon4.png';
        document.getElementById('BS1').innerHTML = 'C<br><br><br><span style="color: blue">10%</span>';
        document.getElementById('BS2').innerHTML = 'A<br><br><br><span style="color: blue">15%</span>';
    }

    // 중급
    if (Skill5 == 1 && Skill6 == 1) {
        MS1Img.src = 'Skillicon5.png';
        MS2Img.src = 'Skillicon6.png';
        document.getElementById('MS1').innerHTML = 'S<br><br><br><span style="color: blue">25%</span>';
        document.getElementById('MS2').innerHTML = 'D<br><br><br><span style="color: blue">30%</span>';

    } else if (Skill5 == 1 && Skill7 == 1) {
        MS1Img.src = 'Skillicon5.png';
        MS2Img.src = 'Skillicon7.png';
        document.getElementById('MS1').innerHTML = 'S<br><br><br><span style="color: blue">25%</span>';
        document.getElementById('MS2').innerHTML = 'W<br><br><br><span style="color: blue">30%</span>';

    } else if (Skill6 == 1 && Skill7 == 1) {
        MS1Img.src = 'Skillicon6.png';
        MS2Img.src = 'Skillicon7.png';
        document.getElementById('MS1').innerHTML = 'D<br><br><br><span style="color: blue">30%</span>';
        document.getElementById('MS2').innerHTML = 'W<br><br><br><span style="color: blue">30%</span>';
    }

    // 고급
    if (Skill8 == 1) {
        AS1Img.src = 'Skillicon8.png';
        document.getElementById('AS1').style.color = 'white';
        document.getElementById('AS1').innerHTML = 'Q<br><br><br><span style="color: blue">45%</span>';
    } else if (Skill9 == 1) {
        AS1Img.src = 'Skillicon9.png';
        document.getElementById('AS1').style.color = 'black';
        document.getElementById('AS1').innerHTML = 'E<br><br><br><span style="color: blue">50%</span>';
    }

    document.addEventListener('keydown', function(event) {

        if (IsForest == 0) {
            BossBGM.play();
        }
        if (HP <= 0) {
            PlayerImg.src = 'celineSitdown.gif';
        }

        if (event.key === 'ArrowRight' && Blinking == 0 && HP > 0) { // 오른쪽 이동

            Left = 0;

            PlayerImg.src = 'CelineWalking.gif';
            Player.style.transform = 'scaleX(1)';
            PlayerX += Speed;
            if (PlayerX > 1800) { /* 거리 제한 */
              PlayerX = 1800;
            }
            setTimeout(function() {
                PlayerImg.src = 'Celine.gif';
                if (HP <= 0) {
                    PlayerImg.src = 'celineSitdown.gif';
                }
            }, 1500);

        } else if (event.key === 'ArrowLeft' && Blinking == 0 && HP > 0) { // 왼쪽 이동

            Left = 1;

            PlayerImg.src = 'CelineWalking.gif';
            Player.style.transform = 'scaleX(-1)';
            PlayerX -= Speed;
            if (PlayerX <= 10) { /* 거리 제한 */
              PlayerX = 10;
            }
            setTimeout(function() {
                PlayerImg.src = 'Celine.gif';
                if (HP <= 0) {
                    PlayerImg.src = 'celineSitdown.gif';
                }
            }, 1500);

        } else if (event.key === 'ArrowUp' && ctBlink == 0 && toxic == 0 && HP > 0) { // 체공 (2.5초 지속)
            
            ctBlink += 4;

            if (PlayerY == 620) {
                BlinkSound.play();
                Blinking = 1;

                PlayerImg.src = 'CelineJump.png';
                PlayerY -= 200;
                Player.style.filter = 'drop-shadow(0px 0px 14px rgba(0, 210, 255, 1))';
                Player.style.top = PlayerY + 'px';

                // 체공 이펙트 위치
                Blink.style.display = 'block';
                Blink.style.left = PlayerX + 'px';
                Blink.style.top = (PlayerY + 10) + 'px';

                setTimeout(function() {
                    Blink.style.display = 'none';
                }, 500);
            
                setTimeout(function() {
                    Blinking = 0;
                    PlayerY += 200;
                    Player.style.top = PlayerY + 'px';
                    PlayerImg.src = 'Celine.gif';
                    Player.style.filter = 'none';

                    // 체공 이펙트 위치
                    Blink.style.display = 'block';
                    Blink.style.left = PlayerX + 'px';
                    Blink.style.top = (PlayerY + 10) + 'px';
                    setTimeout(function() {
                        Blink.style.display = 'none';
                    }, 500);
                }, 2500);
            }
        } else if (event.key === 'z' && Skill1 == 1 && Blinking == 0) { // 에너지 볼
            if (MP >= 3 && ct1 == 0 && HP > 0) {
                Skill_ball();
            }
        } else if (event.key === 'x' && Skill2 == 1 && Blinking == 0) { // 토네이도
            if (MP >= 6 && ct2 == 0 && HP > 0) {
                Skill_tor();
            }
        } else if (event.key === 'c' && Skill3 == 1 && Blinking == 0) { // 썬더
            if (MP >= 10 && ct3 == 0 && HP > 0) {
                Skill_thunder();
            }
        } else if (event.key === 'a' && Skill4 == 1 && Blinking == 0) { // 마나 정령
            if (MP >= 15 && ct4 == 0 && HP > 0) {
                Skill_wisp();
            }
        } else if (event.key === 's' && Skill5 == 1 && Blinking == 0) { // 배리어
            if (MP >= 25 && ct5 == 0 && HP > 0) {
                Skill_barrier();
            }
        } else if (event.key === 'd' && Skill6 == 1 && Blinking == 0) { // 프리즈
            if (MP >= 30 && ct6 == 0 && HP > 0) {
                Skill_freeze();
            }
        } else if (event.key === 'w' && Skill7 == 1 && Blinking == 0) { // 워터 페어리
            if (MP >= 30 && ct7 == 0 && HP > 0) {
                Skill_fairy();
            }
        } else if (event.key === 'q' && Skill8 == 1 && Blinking == 0) { // 메테오
            if (MP >= 45 && ct8 == 0 && HP > 0) {
                Skill_meteor();
            }
        } else if (event.key === 'e' && Skill9 == 1 && Blinking == 0) { // 신월의 숲
            if (MP >= 50 && ct9 == 0 && HP > 0) {
                Skill_forest();
            }
        } else if (event.key === 'Control') { // 힐
            if (MP >= 10 && HP < MaxHP && HP > 0) {
                Skill_heal();
            }
        }
        // 캐릭터 위치 업데이트
        Player.style.left = PlayerX + "px";
        // 캐릭터 충돌 감지
        PlayerBody = Player.getBoundingClientRect();
    });

    function Skill_ball() { // 에너지 볼 MP 3%

        ct1 += 2;

        if (MpM == 0) {
            MP -= 3;
            FullMP -= 3;
            emptyMP += 3;
        } else if (MpM == 1) {
            MP -= 3;
            FullMP -= 2.4;
            emptyMP += 2.4;
        }

        let ballX = PlayerX;
        let ballAtt;
        let ballLeft;
        ballSound.play();
        PlayerImg.src = 'CelineAttack.gif';

        if (Left == 0) {
            ballAtt = setInterval(function() {
                ball.style.display = 'block';
                ball.style.transform = 'scaleX(-1)';
                ballX += 15;
                ball.style.left = ballX + "px";
                setInterval(function() {
                    // 스킬 충돌 감지
                    ballBody = ball.getBoundingClientRect();
                }, 10);
            }, 20);
    
            setTimeout(function() {
                clearInterval(ballAtt);
                ballX = PlayerX;
                ball.style.display = 'none';
                // 스킬 충돌 감지
                ballBody = ball.getBoundingClientRect();
            }, 1000);

        } else if (Left == 1) { // 좌측
            ballLeft = setInterval(function() {
                ball.style.display = 'block';
                ball.style.transform = 'scaleX(1)';
                ballX -= 15;
                ball.style.left = ballX + "px";
                setInterval(function() {
                    // 스킬 충돌 감지
                    ballBody = ball.getBoundingClientRect();
                }, 10);
            }, 20);
    
            setTimeout(function() {
                clearInterval(ballLeft);
                ballX = PlayerX;
                ball.style.display = 'none';
                // 스킬 충돌 감지
                ballBody = ball.getBoundingClientRect();
            }, 1000);
        }
        setTimeout(function() {
            PlayerImg.src = 'Celine.gif';
        }, 1500);
    }

    function Skill_tor() { // 토네이도 MP 6%

        ct2 += 5;

        if (MpM == 0) {
            MP -= 6;
            FullMP -= 6;
            emptyMP += 6;
        } else if (MpM == 1) {
            MP -= 6;
            FullMP -= 4.8;
            emptyMP += 4.8;
        }

        torSound.play();
        PlayerImg.src = 'CelineAttack.gif';

        if (Left == 0) {
            let torX = (PlayerX + 130);
            tor.style.display = 'block';
            tor.style.transform = 'scaleX(1)';
            tor.style.left = torX + 'px';
            // 스킬 충돌 감지
            torBody = tor.getBoundingClientRect();
            setTimeout(function() {
                tor.style.display = 'none';
                tor.style.left = torX + 'px';
                // 스킬 충돌 감지
                torBody = tor.getBoundingClientRect();
            }, 3000);
        } else if (Left == 1) { // 좌측
            let torX = (PlayerX - 390);
            tor.style.display = 'block';
            tor.style.transform = 'scaleX(-1)';
            tor.style.left = torX + 'px';
            // 스킬 충돌 감지
            torBody = tor.getBoundingClientRect();
            setTimeout(function() {
                tor.style.display = 'none';
                tor.style.left = torX + 'px';
                // 스킬 충돌 감지
                torBody = tor.getBoundingClientRect();
            }, 3000);
        }
        setTimeout(function() {
            PlayerImg.src = 'Celine.gif';
        }, 1500);
    }

    function Skill_thunder() { // 썬더 MP 10%

        ct3 += 10;

        if (MpM == 0) {
            MP -= 10;
            FullMP -= 10;
            emptyMP += 10;
        } else if (MpM == 1) {
            MP -= 10;
            FullMP -= 8;
            emptyMP += 8;
        }

        thunderSound.play();
        PlayerImg.src = 'CelineAttack.gif';

        let thunderX = (BossX - 50);
        thunder.style.display = 'block';
        thunder.style.left = thunderX + 'px';
        // 스킬 충돌 감지
        thunderBody = thunder.getBoundingClientRect();

        setTimeout(function() {
            thunder.style.display = 'none';
            // 스킬 충돌 감지
            thunderBody = thunder.getBoundingClientRect();
            PlayerImg.src = 'Celine.gif';
        }, 1400);
    }

    function Skill_wisp() { // 마나 정령 MP 15%

        ct4 += 40;

        if (MpM == 0) {
            MP -= 15;
            FullMP -= 15;
            emptyMP += 15;
        } else if (MpM == 1) {
            MP -= 15;
            FullMP -= 12;
            emptyMP += 12;
        }

        ballSound.play();
        PlayerImg.src = 'CelineAttack.gif';
        setTimeout(function() {
            PlayerImg.src = 'Celine.gif';
        }, 1500);
        
        if (Left == 0 || Left == 1) {
            WispX = (PlayerX + 115);
            WispAppX = (PlayerX + 120);
            wisp.style.transform = 'scaleX(1)';
            wispApp.style.display = 'block';
            wispApp.style.left = WispAppX + 'px';

            setTimeout(function() {
                
                wispApp.style.display = 'none';
                wisp.style.display = 'block';
                wisp.style.left = WispX + 'px';
                IsWisp = 1; // 정령 소환
                if (Math.abs(BossX - WispX) <= 400) { // 정령의 공격 사거리 400

                    setInterval(function() {
                        if (IsWisp == 1) {
                            wispAttacking();
                        }
                    }, 3000);

                } else if (Math.abs(BossX - WispX) > 400) { // 정령의 사거리 밖
                    if ((BossX - WispX) > 400) { // 보스 추적 AI
                        let wispMove = setInterval(function() {
                            wisp.style.transform = 'scaleX(1)';
                            WispX += 10;
                            wisp.style.display = 'block';
                            wisp.style.left = WispX + 'px';
                            if ((BossX - WispX) <= 350) {
                                clearInterval(wispMove);
                                setInterval(function() {
                                    if (IsWisp == 1) {
                                        wispAttacking();
                                    }
                                }, 3000);
                            }
                        }, 100);
                    } else if ((WispX - BossX) > 550) {
                        let wispReverse = setInterval(function() {
                            wisp.style.transform = 'scaleX(-1)';
                            WispX -= 10;
                            wisp.style.display = 'block';
                            wisp.style.left = WispX + 'px';
                            if ((WispX - BossX) <= 500) {
                                clearInterval(wispReverse);
                                setInterval(function() {
                                    if (IsWisp == 1) {
                                        wispAttacking();
                                    }
                                }, 3000);
                            }
                        }, 100);
                    }
                }
                setTimeout(function() {
                    IsWisp = 0; // 정령 소멸
                    wispAtt.style.display = 'none';
                    wispAtt.style.left = wispAttX + 'px';
                    wispAttSound.play();
                    // 스킬 충돌 감지
                    wispAttBody = wispAtt.getBoundingClientRect();
                    setTimeout(function() {
                        wisp.style.display = 'none';
                        wispApp.style.display = 'block';
                        wispApp.style.left = (WispX + 5) + 'px';
                    }, 1000);
                    setTimeout(function() {
                        wispApp.style.display = 'none';
                    }, 2000);
                }, 28000);
            }, 1500);
        }
        function wispAttacking() {
            wispAttX = (BossX + 50);
            wispAtt.style.display = 'block';
            wisp.style.filter = 'drop-shadow(0px 0px 15px rgba(25, 0, 255, 1))';
            wispAtt.style.left = wispAttX + 'px';
            wispAttSound.play();
            // 스킬 충돌 감지
            wispAttBody = wispAtt.getBoundingClientRect();
            if (BossX > WispX) {
                wisp.style.transform = 'scaleX(1)';
            } else if (BossX < WispX) {
                wisp.style.transform = 'scaleX(-1)';
            }
            setTimeout(function() {
                wispAtt.style.display = 'none';
                wisp.style.filter = 'none';
                // 스킬 충돌 감지
                wispAttBody = wispAtt.getBoundingClientRect();
            }, 1500);
        }
    }

    function Skill_barrier() { // 배리어 MP 25%

        ct5 += 30;

        if (MpM == 0) {
            MP -= 25;
            FullMP -= 25;
            emptyMP += 25;
        } else if (MpM == 1) {
            MP -= 25;
            FullMP -= 20;
            emptyMP += 20;
        }

        let BarrierX = 20;
        let BarrierY = 585;
        barrier.style.filter = 'drop-shadow(0px 0px 10px rgba(0, 120, 255, 0.6))';
        IsBarrier = 1; // 배리어 발동
        barrierSound.play();
        let BarrierOn = setInterval(function() {
            BarrierX = (PlayerX - 50);
            BarrierY = (PlayerY - 35);
            barrier.style.display = 'block';
            barrier.style.left = BarrierX + 'px';
            barrier.style.top = BarrierY + 'px';
        }, 50);
        setTimeout(function() {
            clearInterval(BarrierOn);
            barrier.style.filter = 'none';
            barrier.style.display = 'none';
            IsBarrier = 0; // 배리어 해제
        }, 20000);
    }

    function Skill_freeze() { // 프리즈 MP 30%

        ct6 += 50;

        if (MpM == 0) {
            MP -= 30;
            FullMP -= 30;
            emptyMP += 30;
        } else if (MpM == 1) {
            MP -= 30;
            FullMP -= 24;
            emptyMP += 24;
        }

        let freezeX = (BossX + 60);
        let iceX = (BossX - 150);
        freeze.style.display = 'block';
        freeze.style.left = freezeX + 'px';
        PlayerImg.src = 'CelineAttack.gif';
        setTimeout(function() {
            IsFreeze = 1; // 빙결
            freezeSound.play();
            freeze.style.display = 'none';
            ice.style.display = 'block';
            ice.style.left = iceX + 'px';
            PlayerImg.src = 'Celine.gif';
            // 스킬 충돌 감지
            iceBody = ice.getBoundingClientRect();
            setTimeout(function() {
                IsFreeze = 0;
                ice.style.display = 'none';
                // 스킬 충돌 감지
                iceBody = ice.getBoundingClientRect();
            }, 12000);
        }, 1500);
    }

    function Skill_fairy() { // 워터 페어리 MP 30%

        ct7 += 50;

        if (MpM == 0) {
            MP -= 30;
            FullMP -= 30;
            emptyMP += 30;
        } else if (MpM == 1) {
            MP -= 30;
            FullMP -= 24;
            emptyMP += 24;
        }

        FairyAppX = (PlayerX - 175);
        if (PlayerX < 175) {
            FairyAppX = 1;
        }
        FairyX = (PlayerX - 170);
        if (PlayerX < 170) {
            FairyX = 1;
        }
        fairySound.play();
        PlayerImg.src = 'CelineAttack.gif';
        fairyApp.style.display = 'block';
        fairyApp.style.left = FairyAppX + 'px';
        setTimeout(function() {
            PlayerImg.src = 'Celine.gif';
            fairyApp.style.display = 'none';
            fairy.style.display = 'block';
            fairy.style.left = FairyX + 'px';
            IsFairy = 1; // 페어리 소환
            setInterval(function() {
                FairyX = (PlayerX - 170);
                   if (PlayerX < 170) {
                   FairyX = 1;
                }
                fairy.style.left = FairyX + 'px';
                fairy.style.transform = 'scaleX(1)';
                if (Left == 1) {
                    FairyX = (PlayerX + 110);
                    fairy.style.left = FairyX + 'px';
                    fairy.style.transform = 'scaleX(-1)';
                }
            }, 50);

            Fairy_Heal();

        }, 1500);
        setTimeout(function() {
            IsFairy = 0;
            if (Left == 0) {
                FairyAppX = (PlayerX - 175);
                if (PlayerX < 175) {
                    FairyAppX = 1;
                }
            } else if (Left == 1) {
                FairyAppX = (PlayerX + 115);
            }
            fairy.style.display = 'none';
            fairyApp.style.display = 'block';
            fairyApp.style.left = FairyAppX + 'px';
            setTimeout(function() {
                fairyApp.style.display = 'none';
            }, 1500);
        }, 35000);

        function Fairy_Heal() { // 페어리 회복
            if (IsFairy == 1) {
                HP += (healAmount / 2);
                if (HP >= MaxHP) { // HP 초과 방지
                    HP = MaxHP;
                }        
                Damage.textContent = '+' + (healAmount / 2);
                Damage.style.color = 'skyblue';
                fairySound.play();
                document.getElementById('FairyImg').src = 'WaterFairySkill1.gif';
                setTimeout(function() {
                    document.getElementById('FairyImg').src = 'WaterFairy.gif';
                    Damage.textContent = '';
                    Damage.style.color = '#FF6666';
                }, 2500);
                setTimeout(function() {
                    Fairy_Attack();
                }, 4000);
            }
        }
        function Fairy_Attack() { // 페어리 공격
            let fairyballAtt;
            if (IsFairy == 1) {
                fairyAttackSound.play();
                document.getElementById('FairyImg').src = 'WaterFairySkill2.gif';
            setTimeout(function() {
                fairyAttackSound.play();
                document.getElementById('FairyImg').src = 'WaterFairy.gif';
                fairyAtt.style.display = 'block';
                fairyAtt.style.left = FairyAttX + 'px';
                if (Left == 0) {
                    FairyAttX = (FairyX + 70);
                    fairyballAtt = setInterval(function() {
                        fairyAtt.style.transform = 'scaleX(-1)';
                        FairyAttX += 17;
                        fairyAtt.style.left = FairyAttX + "px";
                        setInterval(function() {
                            // 스킬 충돌 감지
                            fairyAttBody = fairyAtt.getBoundingClientRect();
                        }, 10);
                    }, 20);
            
                    setTimeout(function() {
                        clearInterval(fairyballAtt);
                        FairyAttX = (FairyX + 70);
                        fairyAtt.style.display = 'none';
                        // 스킬 충돌 감지
                        fairyAttBody = fairyAtt.getBoundingClientRect();
                    }, 1000);
                } else if (Left == 1) { // 좌측
                    FairyAttX = (FairyX - 70);
                    fairyballAtt = setInterval(function() {
                        fairyAtt.style.transform = 'scaleX(1)';
                        FairyAttX -= 17;
                        fairyAtt.style.left = FairyAttX + "px";
                        setInterval(function() {
                            // 스킬 충돌 감지
                            fairyAttBody = fairyAtt.getBoundingClientRect();
                        }, 10);
                    }, 20);
            
                    setTimeout(function() {
                        clearInterval(fairyballAtt);
                        FairyAttX = (FairyX - 70);
                        fairyAtt.style.display = 'none';
                        // 스킬 충돌 감지
                        fairyAttBody = fairyAtt.getBoundingClientRect();
                    }, 1000);
                }
            }, 2500);
            setTimeout(function() {
                Fairy_Heal();
            }, 4000);
            }
        }
    }

    function Skill_meteor() { // 메테오 MP 45%

        ct8 += 60;

        if (MpM == 0) {
            MP -= 45;
            FullMP -= 45;
            emptyMP += 45;
        } else if (MpM == 1) {
            MP -= 45;
            FullMP -= 36;
            emptyMP += 36;
        }

        let meteor1X = 0;
        let meteor2X = 150;
        let meteor3X = 350;
        let meteor4X = 600;

        meteorSound.play();
        PlayerImg.src = 'CelineAttack.gif';
        setTimeout(function() {
            setInterval(function() {
                meteor1X = Math.floor(Math.random() * 200) + 1; // 메테오 1 X축
                meteor2X = Math.floor(Math.random() * (450 - 200 + 1)) + 200; // 메테오 2 X축
                meteor3X = Math.floor(Math.random() * (700 - 400 + 1)) + 400; // 메테오 3 X축
                meteor4X = Math.floor(Math.random() * (1100 - 700 + 1)) + 700; // 메테오 4 X축

                meteor1.style.left = meteor1X + 'px';
                meteor2.style.left = meteor2X + 'px';
                meteor3.style.left = meteor3X + 'px';
                meteor4.style.left = meteor4X + 'px';
            }, 2000);
            PlayerImg.src = 'Celine.gif';
            meteor1.style.display = 'block';
            meteor2.style.display = 'block';
            meteor3.style.display = 'block';
            meteor4.style.display = 'block';
            setTimeout(function() {
                meteor1.style.display = 'none';
                meteor2.style.display = 'none';
                meteor3.style.display = 'none';
                meteor4.style.display = 'none';
                meteorDrop = 0;
            }, 6600);
            meteorDrop = 1;
            IsMeteor = 1;
        }, 2000);
        setTimeout(function() {
            meteorDrop = 0;
        }, 3000);
        setTimeout(function() {
            meteorDrop = 1;
        }, 4000);
        setTimeout(function() {
            meteorDrop = 0;
        }, 5000);
        setTimeout(function() {
            meteorDrop = 1;
        }, 6000);
        setTimeout(function() {
            IsMeteor = 0;
        }, 17000);
    }

    function Skill_forest() { // 신월의 숲 MP 50%

        ct9 += 60;

        if (MpM == 0) {
            MP -= 50;
            FullMP -= 50;
            emptyMP += 50;
        } else if (MpM == 1) {
            MP -= 50;
            FullMP -= 40;
            emptyMP += 40;
        }

        let LeafX = (BossX + 55);
        BossBGM.pause() // BGM 변경
        PlayerImg.src = 'CelineAttack.gif';
        setTimeout(function() {
            IsForest = 1; // 신월의 숲 상태
            PlayerImg.src = 'Celine.gif';
            ForestBGM.play() // 신월의 숲 BGM
            MapImg.src = 'forest.gif';
            leaf.style.display = 'block';
            leaf.style.left = LeafX + 'px';
            ForestHarming = 1;
        }, 1500)
        setTimeout(function() {
            IsForest = 0;
            ForestBGM.pause() // BGM 변경
            BossBGM.play() // 보스 BGM
            MapImg.src = 'Map2.png';
            leaf.style.display = 'none';
        }, 27000)

        setTimeout(function() {
            ForestHarming = 0;
        }, 3000);
        setTimeout(function() {
            ForestHarming = 1;
        }, 7500);
        setTimeout(function() {
            ForestHarming = 0;
        }, 9000);
        setTimeout(function() {
            ForestHarming = 1;
        }, 13500);
        setTimeout(function() {
            ForestHarming = 0;
        }, 15000);
        setTimeout(function() {
            ForestHarming = 1;
        }, 19500);
        setTimeout(function() {
            ForestHarming = 0;
        }, 21000);
        setTimeout(function() {
            ForestHarming = 1;
        }, 25500);
        setTimeout(function() {
            ForestHarming = 0;
        }, 27000);
    }

    function Skill_heal() { // 힐 MP 10%

        HP += healAmount;

        if (MpM == 0) {
            MP -= 10;
            FullMP -= 10;
            emptyMP += 10;
        } else if (MpM == 1) {
            MP -= 10;
            FullMP -= 8;
            emptyMP += 8;
        }
        if (HP >= MaxHP) { // HP 초과 방지
            HP = MaxHP;
        }

        Damage.textContent = '+' + healAmount;
        Damage.style.color = 'yellowgreen';

        let healX = (PlayerX + 10);
        let healY = (PlayerY + 20);
        heal.style.display = 'block';
        heal.style.left = healX + 'px';
        heal.style.top = healY + 'px';
        healSound.play();
        setTimeout(function() {
            heal.style.display = 'none';
        }, 800);
        setTimeout(function() {
            Damage.textContent = '';
            Damage.style.color = '#FF6666';
        }, 1500);
    }
});