const Intro0 = document.getElementById('Intro0');
const Intro1 = document.getElementById('Intro1');
const Intro2 = document.getElementById('Intro2');
const Intro3 = document.getElementById('Intro3');
const Intro4 = document.getElementById('Intro4');
const Intro5 = document.getElementById('Intro5');
const Intro6 = document.getElementById('Intro6');
const Chat1 = document.getElementById('Chat1');
const Chat2 = document.getElementById('Chat2');
const MapBGM = document.getElementById('BGM');
const BossAppear = document.getElementById('Appear');

let Celine = document.getElementById('Celine'); // 셀리느 div
let ChatBox = document.getElementById('ChatBox'); // 채팅박스 div
let ChatContent = document.getElementById('ChatContent'); // 채팅박스 div
let Boss = document.getElementById('Boss'); // 보스 div
let CelineImg = document.getElementById('CelineImg'); // 셀리느 img
let StandImg = document.getElementById('StandImg'); // 셀리느 스탠딩 img
let MapImg = document.getElementById('MapImg'); // 맵 img
let ModImg = document.getElementById('ModImg'); // 전투 모드 img
let ModInfo = document.getElementById('ModInfo'); // 전투 모드 div
let Stats = document.getElementById('Stats'); // 셀리느 스탯 div

// 스킬 선택 (0:False 1:True)
let Skill1 = 0;
let Skill2 = 0;
let Skill3 = 0;
let Skill4 = 0;
let Skill5 = 0;
let Skill6 = 0;
let Skill7 = 0;
let Skill8 = 0;
let Skill9 = 0;

// 스킬 선택 이미지
let Basic1 = document.getElementById('Basic1'); // 초급 스킬 1
let Basic2 = document.getElementById('Basic2'); // 초급 스킬 2
let Mid1 = document.getElementById('Mid1'); // 중급 스킬 1
let Mid2 = document.getElementById('Mid2'); // 중급 스킬 2
let Adv1 = document.getElementById('Adv1'); // 고급 스킬

let CelineX = 20; // 셀리느 X축
let CelineY = 620; // 셀리느 Y축
let Op = 0.2; // 투명도
let BossOp = 0.1; // 보스 투명도
let yOp = 0.2; // 보스 설명 투명도

// 음량 50%
MapBGM.volume = 0.5;
BossAppear.volume = 0.5;

// 전투 모드 설정 (0:False 1:True)
let AttMod = 0;
let GuaMod = 0;
let MPMod = 0;

// 스킬 중복 선택 (0:False 1:True)
let BasicSkill = 0; // 초급 스킬
let MidSkill = 0; // 중급 스킬
let AdvSkill = 0; // 고급 스킬

window.onload = function() {
    // 페이지 로드될 때 Skill 변수 초기화
    localStorage.setItem('Skill1', 0);
    localStorage.setItem('Skill2', 0);
    localStorage.setItem('Skill3', 0);
    localStorage.setItem('Skill4', 0);
    localStorage.setItem('Skill5', 0);
    localStorage.setItem('Skill6', 0);
    localStorage.setItem('Skill7', 0);
    localStorage.setItem('Skill8', 0);
    localStorage.setItem('Skill9', 0);
    localStorage.setItem('AttMod', 0);
    localStorage.setItem('GuaMod', 0);
    localStorage.setItem('MPMod', 0);
}

function NextA() {
    Intro0.style.display = 'none';
    Intro1.style.display = 'block';
    MapBGM.play();
    
    setTimeout(function() {
        document.getElementById('a').style.display = 'block';
        Celine.style.display = 'block';
        CelineImg.src = 'CelineWalking.gif'; // 셀리느 이동
        setInterval(function() {
            Op += 0.2;
            document.getElementById('a').style.opacity = Op;
            Celine.style.opacity = Op;
        }, 200);
    }, 1000);
    setTimeout(function() {
        document.getElementById('b').style.display = 'block';
        setInterval(function() {
            Op += 0.2;
            document.getElementById('b').style.opacity = Op;
        }, 200);
    }, 2500);
    setTimeout(function() {
        document.getElementById('c').style.display = 'block';
        CelineImg.src = 'Celine.gif'; // 셀리느 정지
        clearInterval(CelineMoving);
        setInterval(function() {
            Op += 0.2;
            document.getElementById('c').style.opacity = Op;
        }, 200);
    }, 4000);
    setTimeout(function() {
        document.getElementById('d').style.display = 'block';
        setInterval(function() {
            Op += 0.2;
            document.getElementById('d').style.opacity = Op;
        }, 200);
    }, 5500);
    setTimeout(function() {
        document.getElementById('e').style.display = 'block';
        setInterval(function() {
            Op += 0.2;
            document.getElementById('e').style.opacity = Op;
        }, 200);
    }, 7000);
    setTimeout(function() {
        document.getElementById('f').style.display = 'block';
        setInterval(function() {
            Op += 0.2;
            document.getElementById('f').style.opacity = Op;
        }, 200);
    }, 8500);
    setTimeout(function() {
        document.getElementById('next2').style.display = 'block';
    }, 10000);

    let CelineMoving = setInterval(function() {
        CelineX += 5;
        Celine.style.left = CelineX + 'px';
    }, 100);
}

function NextB() {
    Intro1.style.display = 'none';
    Chat1.style.display = 'block';
    Op = 1.0; // 투명도 100%

    document.getElementById('g').style.display = 'block';
    document.getElementById('g').style.opacity = Op;

    setTimeout(function() {
        document.getElementById('g').style.display = 'none';
        document.getElementById('h').style.opacity = Op;
        document.getElementById('h').style.display = 'block';
    }, 3500);
    setTimeout(function() {
        document.getElementById('h').style.display = 'none';
        document.getElementById('i').style.opacity = Op;
        document.getElementById('i').style.display = 'block';
    }, 7000);
    setTimeout(function() {
        document.getElementById('i').style.display = 'none';
        document.getElementById('j').style.opacity = Op;
        document.getElementById('j').style.display = 'block';
    }, 10500);
    setTimeout(function() {
        document.getElementById('j').style.display = 'none';
        document.getElementById('k').style.opacity = Op;
        document.getElementById('k').style.display = 'block';
    }, 14000);
    setTimeout(function() {
        document.getElementById('k').style.display = 'none';
        document.getElementById('l').style.opacity = Op;
        document.getElementById('l').style.display = 'block';
    }, 17500);
    setTimeout(function() {
        document.getElementById('l').style.display = 'none';
        document.getElementById('m').style.opacity = Op;
        document.getElementById('m').style.display = 'block';
    }, 21000);
    setTimeout(function() {
        document.getElementById('m').style.display = 'none';
        Chat1.style.display = 'none';
        document.getElementById('n').style.opacity = Op;
        Intro2.style.display = 'block';
        document.getElementById('n').style.display = 'block';
    }, 24500);
    setTimeout(function() {
        document.getElementById('n').style.display = 'none';
        document.getElementById('o').style.opacity = Op;
        document.getElementById('o').style.display = 'block';
    }, 27500);
    setTimeout(function() {
        document.getElementById('o').style.display = 'none';
        Intro2.style.display = 'none';
        Chat1.style.display = 'block';
        document.getElementById('p').style.opacity = Op;
        document.getElementById('p').style.display = 'block';
        StandImg.src = 'celine3.png';
    }, 30500);
    setTimeout(function() {
        document.getElementById('p').style.display = 'none';
        Chat1.style.display = 'none';
        Boss.style.display = 'block';
        BossAppear.play();

        setInterval(function() {
            BossOp += 0.1;
            Boss.style.opacity = BossOp;
        }, 400);
    }, 34000);
    setTimeout(function() {
        CelineImg.src = 'CelineJump.png';
        let Animation1 = setInterval(function() {
            CelineY -= 10;
            Celine.style.top = CelineY + 'px';
        }, 50);
        setTimeout(function() {
            clearInterval(Animation1);
        }, 500);
    }, 35000);
    setTimeout(function() {
        let Animation2 = setInterval(function() {
            CelineY += 10;
            Celine.style.top = CelineY + 'px';
        }, 50);
        setTimeout(function() {
            clearInterval(Animation2);
        }, 500);
    }, 35500);
    setTimeout(function() {
        Chat2.style.display = 'block';
        Op = 1.0;
        document.getElementById('q').style.opacity = Op;
        document.getElementById('q').style.display = 'block';
    }, 39000);
    setTimeout(function() {
        document.getElementById('q').style.display = 'none';
        document.getElementById('r').style.opacity = Op;
        document.getElementById('r').style.display = 'block';
    }, 42500);
    setTimeout(function() {
        document.getElementById('r').style.display = 'none';
        Chat2.style.display = 'none';
        Chat1.style.display = 'block';
        document.getElementById('s').style.opacity = Op;
        document.getElementById('s').style.display = 'block';
    }, 46000);
    setTimeout(function() {
        document.getElementById('s').style.display = 'none';
        document.getElementById('t').style.opacity = Op;
        document.getElementById('t').style.display = 'block';
    }, 49500);
    setTimeout(function() {
        document.getElementById('t').style.display = 'none';
        Chat1.style.display = 'none';
        Chat2.style.display = 'block';
        document.getElementById('u').style.opacity = Op;
        document.getElementById('u').style.display = 'block';
    }, 53000);
    setTimeout(function() {
        document.getElementById('u').style.display = 'none';
        document.getElementById('v').style.opacity = Op;
        document.getElementById('v').style.display = 'block';
    }, 56500);
    setTimeout(function() {
        document.getElementById('v').style.display = 'none';
        Chat2.style.display = 'none';
        Chat1.style.display = 'block';
        StandImg.src = 'celine2.png';
        document.getElementById('w').style.opacity = Op;
        document.getElementById('w').style.display = 'block';
    }, 60000);
    setTimeout(function() {
        document.getElementById('w').style.display = 'none';
        Chat1.style.display = 'none';
        Intro3.style.display = 'block';

        document.getElementById('y').style.opacity = yOp;
        document.getElementById('y').style.display = 'block';

        setInterval(function() {
            yOp += 0.2;
            document.getElementById('y').style.opacity = yOp;
        }, 200);
        setTimeout(function() {
            CelineImg.src = 'Celine.gif'; // 셀리느 정지
            document.getElementById('next3').style.display = 'block';
        }, 3500);
    }, 63500);
}

function Skip() { // 스토리 스킵
    MapBGM.play();
    setTimeout(function() {
        Intro0.style.display = 'none';
        Intro3.style.display = 'block';
        CelineImg.src = 'CelineWalking.gif'; // 셀리느 이동
        Celine.style.display = 'block';
        Boss.style.display = 'block';

        Boss.style.opacity = 1.0;
        document.getElementById('y').style.opacity = yOp;
        document.getElementById('y').style.display = 'block';

        setInterval(function() {
            Op += 0.2;
            yOp += 0.2;
            document.getElementById('y').style.opacity = yOp;
            Celine.style.opacity = Op;
        }, 200);
        setTimeout(function() {
            clearInterval(CelineMoving);
            CelineImg.src = 'Celine.gif'; // 셀리느 정지
            document.getElementById('next3').style.display = 'block';
        }, 3500);
    }, 1000);
    let CelineMoving = setInterval(function() {
        CelineX += 5;
        Celine.style.left = CelineX + 'px';
    }, 100);
}

function NextC() {
    document.getElementById('y').style.display = 'none';
    Intro3.style.display = 'none';
    Intro4.style.display = 'block';
    ChatBox.style.display = 'block';
}

function AttackUp() {

    if (GuaMod == 1 || MPMod == 1) {
        ChatContent.textContent = '하나만 골라줘!!';
    } else if (AttMod == 1) {
        AttMod = 0; // 공격 모드 취소
        document.getElementById('AttackMod').style.border = '3px solid black';
        ChatContent.textContent = '전투방식을 골라줘!'
    } else {
        AttMod = 1; // 공격 모드

        document.getElementById('AttackMod').style.border = '3px solid red';
        ChatContent.textContent = '공격 모드를 골랐어!';
    }
}
function GuardUp() {

    if (AttMod == 1 || MPMod == 1) {
        ChatContent.textContent = '하나만 골라줘!!';
    } else if (GuaMod == 1) {
        GuaMod = 0; // 방어 모드 취소
        document.getElementById('GuardMod').style.border = '3px solid black';
        ChatContent.textContent = '전투방식을 골라줘!'
    } else {
        GuaMod = 1; // 방어 모드

        document.getElementById('GuardMod').style.border = '3px solid red';
        ChatContent.textContent = '방어 모드를 골랐어!';
    }
}
function MPUp() {

    if (AttMod == 1 || GuaMod == 1) {
        ChatContent.textContent = '하나만 골라줘!!';
    } else if (MPMod == 1) {
        MPMod = 0; // 공격 모드 취소
        document.getElementById('MPMod').style.border = '3px solid black';
        ChatContent.textContent = '전투방식을 골라줘!'
    } else {
        MPMod = 1; // 마나 모드

        document.getElementById('MPMod').style.border = '3px solid red';
        ChatContent.textContent = 'MP 모드를 골랐어!';
    }
}

function NextD() {
    
    if (AttMod == 1 || GuaMod == 1 || MPMod == 1) {
        Intro4.style.display = 'none';
        ChatBox.style.display = 'none';
        Intro5.style.display = 'block';
    } else {
        alert('셀리느의 전투 모드를 골라주세요!');
    }
}
function Info1() { // 에너지 볼 설명
    document.getElementById('Skill1Info').style.display = 'block';
    document.getElementById('Skill2Info').style.display = 'none';
    document.getElementById('Skill3Info').style.display = 'none';
    document.getElementById('Skill4Info').style.display = 'none';
    document.getElementById('Skill5Info').style.display = 'none';
    document.getElementById('Skill6Info').style.display = 'none';
    document.getElementById('Skill7Info').style.display = 'none';
    document.getElementById('Skill8Info').style.display = 'none';
    document.getElementById('Skill9Info').style.display = 'none';
}
function Info2() { // 토네이도 설명
    document.getElementById('Skill2Info').style.display = 'block';
    document.getElementById('Skill1Info').style.display = 'none';
    document.getElementById('Skill3Info').style.display = 'none';
    document.getElementById('Skill4Info').style.display = 'none';
    document.getElementById('Skill5Info').style.display = 'none';
    document.getElementById('Skill6Info').style.display = 'none';
    document.getElementById('Skill7Info').style.display = 'none';
    document.getElementById('Skill8Info').style.display = 'none';
    document.getElementById('Skill9Info').style.display = 'none';
}
function Info3() { // 썬더 설명
    document.getElementById('Skill3Info').style.display = 'block';
    document.getElementById('Skill2Info').style.display = 'none';
    document.getElementById('Skill1Info').style.display = 'none';
    document.getElementById('Skill4Info').style.display = 'none';
    document.getElementById('Skill5Info').style.display = 'none';
    document.getElementById('Skill6Info').style.display = 'none';
    document.getElementById('Skill7Info').style.display = 'none';
    document.getElementById('Skill8Info').style.display = 'none';
    document.getElementById('Skill9Info').style.display = 'none';
}
function Info4() { // 마나 정령 설명
    document.getElementById('Skill4Info').style.display = 'block';
    document.getElementById('Skill2Info').style.display = 'none';
    document.getElementById('Skill3Info').style.display = 'none';
    document.getElementById('Skill1Info').style.display = 'none';
    document.getElementById('Skill5Info').style.display = 'none';
    document.getElementById('Skill6Info').style.display = 'none';
    document.getElementById('Skill7Info').style.display = 'none';
    document.getElementById('Skill8Info').style.display = 'none';
    document.getElementById('Skill9Info').style.display = 'none';
}
function Info5() { // 배리어 설명
    document.getElementById('Skill5Info').style.display = 'block';
    document.getElementById('Skill2Info').style.display = 'none';
    document.getElementById('Skill3Info').style.display = 'none';
    document.getElementById('Skill4Info').style.display = 'none';
    document.getElementById('Skill1Info').style.display = 'none';
    document.getElementById('Skill6Info').style.display = 'none';
    document.getElementById('Skill7Info').style.display = 'none';
    document.getElementById('Skill8Info').style.display = 'none';
    document.getElementById('Skill9Info').style.display = 'none';
}
function Info6() { // 프리즈 설명
    document.getElementById('Skill6Info').style.display = 'block';
    document.getElementById('Skill2Info').style.display = 'none';
    document.getElementById('Skill3Info').style.display = 'none';
    document.getElementById('Skill4Info').style.display = 'none';
    document.getElementById('Skill5Info').style.display = 'none';
    document.getElementById('Skill1Info').style.display = 'none';
    document.getElementById('Skill7Info').style.display = 'none';
    document.getElementById('Skill8Info').style.display = 'none';
    document.getElementById('Skill9Info').style.display = 'none';
}
function Info7() { // 워터 페어리 설명
    document.getElementById('Skill7Info').style.display = 'block';
    document.getElementById('Skill2Info').style.display = 'none';
    document.getElementById('Skill3Info').style.display = 'none';
    document.getElementById('Skill4Info').style.display = 'none';
    document.getElementById('Skill5Info').style.display = 'none';
    document.getElementById('Skill6Info').style.display = 'none';
    document.getElementById('Skill1Info').style.display = 'none';
    document.getElementById('Skill8Info').style.display = 'none';
    document.getElementById('Skill9Info').style.display = 'none';
}
function Info8() { // 블루 메테오 설명
    document.getElementById('Skill8Info').style.display = 'block';
    document.getElementById('Skill2Info').style.display = 'none';
    document.getElementById('Skill3Info').style.display = 'none';
    document.getElementById('Skill4Info').style.display = 'none';
    document.getElementById('Skill5Info').style.display = 'none';
    document.getElementById('Skill6Info').style.display = 'none';
    document.getElementById('Skill7Info').style.display = 'none';
    document.getElementById('Skill1Info').style.display = 'none';
    document.getElementById('Skill9Info').style.display = 'none';
}
function Info9() { // 신월의 숲 설명
    document.getElementById('Skill9Info').style.display = 'block';
    document.getElementById('Skill2Info').style.display = 'none';
    document.getElementById('Skill3Info').style.display = 'none';
    document.getElementById('Skill4Info').style.display = 'none';
    document.getElementById('Skill5Info').style.display = 'none';
    document.getElementById('Skill6Info').style.display = 'none';
    document.getElementById('Skill7Info').style.display = 'none';
    document.getElementById('Skill8Info').style.display = 'none';
    document.getElementById('Skill1Info').style.display = 'none';
}

function Select1() {
    
    if (BasicSkill == 0 || BasicSkill == 1) {
        BasicSkill += 1;
        Skill1 += 1; // 에너지 볼 선택
        localStorage.setItem('Skill1', 1);
        document.getElementById('Skill1').style.border = '3px solid red';
    } else if (BasicSkill <= 2) {
        alert('초급 스킬은 2가지만 고를 수 있습니다!');
    }
}
function Select2() {
    
    if (BasicSkill == 0 || BasicSkill == 1) {
        BasicSkill += 1;
        Skill2 += 1; // 토네이도 선택
        localStorage.setItem('Skill2', 1);
        document.getElementById('Skill2').style.border = '3px solid red';
    } else if (BasicSkill <= 2) {
        alert('초급 스킬은 2가지만 고를 수 있습니다!');
    }
}
function Select3() {
    
    if (BasicSkill == 0 || BasicSkill == 1) {
        BasicSkill += 1;
        Skill3 += 1; // 썬더 선택
        localStorage.setItem('Skill3', 1);
        document.getElementById('Skill3').style.border = '3px solid red';
    } else if (BasicSkill <= 2) {
        alert('초급 스킬은 2가지만 고를 수 있습니다!');
    }
}
function Select4() {
    
    if (BasicSkill == 0 || BasicSkill == 1) {
        BasicSkill += 1;
        Skill4 += 1; // 마나 정령 선택
        localStorage.setItem('Skill4', 1);
        document.getElementById('Skill4').style.border = '3px solid red';
    } else if (BasicSkill <= 2) {
        alert('초급 스킬은 2가지만 고를 수 있습니다!');
    }
}
function Select5() {
    
    if (MidSkill == 0 || MidSkill == 1) {
        MidSkill += 1;
        Skill5 += 1; // 배리어 선택
        localStorage.setItem('Skill5', 1);
        document.getElementById('Skill5').style.border = '3px solid red';
    } else if (MidSkill <= 2) {
        alert('중급 스킬은 2가지만 고를 수 있습니다!');
    }
}
function Select6() {
    
    if (MidSkill == 0 || MidSkill == 1) {
        MidSkill += 1;
        Skill6 += 1; // 프리즈 선택
        localStorage.setItem('Skill6', 1);
        document.getElementById('Skill6').style.border = '3px solid red';
    } else if (MidSkill <= 2) {
        alert('중급 스킬은 2가지만 고를 수 있습니다!');
    }
}
function Select7() {
    
    if (MidSkill == 0 || MidSkill == 1) {
        MidSkill += 1;
        Skill7 += 1; // 워터 페어리 선택
        localStorage.setItem('Skill7', 1);
        document.getElementById('Skill7').style.border = '3px solid red';
    } else if (MidSkill <= 2) {
        alert('중급 스킬은 2가지만 고를 수 있습니다!');
    }
}
function Select8() {
    
    if (AdvSkill == 0) {
        AdvSkill += 1;
        Skill8 += 1; // 블루 메테오 선택
        localStorage.setItem('Skill8', 1);
        document.getElementById('Skill8').style.border = '3px solid red';
    } else if (AdvSkill <= 1) {
        alert('고급 스킬은 1가지만 고를 수 있습니다!');
    }
}
function Select9() {
    
    if (AdvSkill == 0) {
        AdvSkill += 1;
        Skill9 += 1; // 신월의 숲 선택
        localStorage.setItem('Skill9', 1);
        document.getElementById('Skill9').style.border = '3px solid red';
    } else if (AdvSkill <= 1) {
        alert('고급 스킬은 1가지만 고를 수 있습니다!');
    }
}

function SkillReset() { // 스킬 세팅 초기화

    Skill1 = 0;
    Skill2 = 0;
    Skill3 = 0;
    Skill4 = 0;
    Skill5 = 0;
    Skill6 = 0;
    Skill7 = 0;
    Skill8 = 0;
    Skill9 = 0;
    
    localStorage.setItem('Skill1', 0);
    localStorage.setItem('Skill2', 0);
    localStorage.setItem('Skill3', 0);
    localStorage.setItem('Skill4', 0);
    localStorage.setItem('Skill5', 0);
    localStorage.setItem('Skill6', 0);
    localStorage.setItem('Skill7', 0);
    localStorage.setItem('Skill8', 0);
    localStorage.setItem('Skill9', 0);

    BasicSkill = 0;
    MidSkill = 0;
    AdvSkill = 0;

    document.getElementById('Skill1').style.border = '3px solid black';
    document.getElementById('Skill2').style.border = '3px solid black';
    document.getElementById('Skill3').style.border = '3px solid black';
    document.getElementById('Skill4').style.border = '3px solid black';
    document.getElementById('Skill5').style.border = '3px solid black';
    document.getElementById('Skill6').style.border = '3px solid black';
    document.getElementById('Skill7').style.border = '3px solid black';
    document.getElementById('Skill8').style.border = '3px solid black';
    document.getElementById('Skill9').style.border = '3px solid black';
}

function NextE() {

    if (BasicSkill == 2 && MidSkill == 2 && AdvSkill == 1) {
        document.getElementById('Skill1Info').style.display = 'none';
        document.getElementById('Skill2Info').style.display = 'none';
        document.getElementById('Skill3Info').style.display = 'none';
        document.getElementById('Skill4Info').style.display = 'none';
        document.getElementById('Skill5Info').style.display = 'none';
        document.getElementById('Skill6Info').style.display = 'none';
        document.getElementById('Skill7Info').style.display = 'none';
        document.getElementById('Skill8Info').style.display = 'none';
        document.getElementById('Skill9Info').style.display = 'none';

        Intro5.style.display = 'none';
        Intro6.style.display = 'block';

        if (AttMod == 1) { // 공격 모드
            localStorage.setItem('AttMod', 1);
            ModImg.src = 'celineSword.png';
            ModInfo.innerHTML = 
            '<br><span style="color: crimson; font-size: 28px;">공격 모드</span><br><br>공격력이 30% 증가합니다!<br>치명타 확률이 10% 증가합니다!';
            Stats.innerHTML = 
            'HP : 2000<br>MP : 100%<br>공격력 : <span style="color: red">65</span><br>방어력 : 50<br>치명타 확률 : <span style="color: red">20%</span><br>이동속도 : 2단계'
        } else if (GuaMod == 1) { // 방어 모드
            localStorage.setItem('GuaMod', 1);
            ModImg.src = 'celineGuard.png';
            ModInfo.innerHTML = 
            '<br><span style="color: green; font-size: 28px;">방어 모드</span><br><br>방어력이 40% 증가합니다!<br>디버프 지속이 절반으로 감소합니다!';
            Stats.innerHTML = 
            'HP : 2000<br>MP : 100%<br>공격력 : 50<br>방어력 : <span style="color: red">70</span><br>치명타 확률 : 10%<br>이동속도 : 2단계'
        } else if (MPMod == 1) { // MP 모드
            localStorage.setItem('MPMod', 1);
            ModImg.src = 'celineMana.png';
            ModInfo.innerHTML = 
            '<br><span style="color: blue; font-size: 28px;">MP 모드</span><br><br>최대 MP가 25% 증가합니다!<br>MP 회복 속도가 20% 증가합니다!';
            Stats.innerHTML = 
            'HP : 2000<br>MP : <span style="color: blue">125%</span><br>공격력 : 50<br>방어력 : 50<br>치명타 확률 : 10%<br>이동속도 : 2단계'
        }

        if (Skill1 == 1 && Skill2 == 1) { // 초급 스킬
            Basic1.src = 'Skillicon1.png';
            Basic2.src = 'Skillicon2.png';
        } else if (Skill1 == 1 && Skill3 == 1) {
            Basic1.src = 'Skillicon1.png';
            Basic2.src = 'Skillicon3.png';
        } else if (Skill1 == 1 && Skill4 == 1) {
            Basic1.src = 'Skillicon1.png';
            Basic2.src = 'Skillicon4.png';
        } else if (Skill2 == 1 && Skill3 == 1) {
            Basic1.src = 'Skillicon2.png';
            Basic2.src = 'Skillicon3.png';
        } else if (Skill2 == 1 && Skill4 == 1) {
            Basic1.src = 'Skillicon2.png';
            Basic2.src = 'Skillicon4.png';
        } else if (Skill3 == 1 && Skill4 == 1) {
            Basic1.src = 'Skillicon3.png';
            Basic2.src = 'Skillicon4.png';
        }

        if (Skill5 == 1 && Skill6 == 1) { // 중급 스킬
            Mid1.src = 'Skillicon5.png';
            Mid2.src = 'Skillicon6.png';
        } else if (Skill5 == 1 && Skill7 == 1) {
            Mid1.src = 'Skillicon5.png';
            Mid2.src = 'Skillicon7.png';
        } else if (Skill6 == 1 && Skill7 == 1) {
            Mid1.src = 'Skillicon6.png';
            Mid2.src = 'Skillicon7.png';
        }

        if (Skill8 == 1) { // 고급 스킬
            Adv1.src = 'Skillicon8.png';
        } else if (Skill9 == 1) {
            Adv1.src = 'Skillicon9.png';
        }
    } else {
        alert('셀리느가 사용할 스킬들을 골라주세요!');
    }
}

function Normal() { // 노말 모드
    let NormalGo = confirm('고대의 마법사 쿠로 노말 모드에 도전하시겠습니까?');

    if (NormalGo) {
        window.location.href = 'NormalKuro.html';
    } else {
    }
}

function Hard() { // 하드 모드
    alert('고대의 마법사 쿠로 하드 모드는 준비중입니다!');
}