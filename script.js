document.addEventListener('DOMContentLoaded', () => {
  // 初始化GSAP时间轴
  const tl = gsap.timeline({ defaults: { ease: "sine.inOut" } });
  let userName = '';
  let q1Choice = null, q2Choice = null, q3Choice = null, q4Choice = null, q5Choice = null;

  // 提前获取按钮引用
  const startBtn = document.getElementById('start-btn');

  // 界面1入场动画
  tl.to('.bg-layer', { opacity: 1, duration: 1.5, ease: "power3.out" }, 0);
  tl.to('.top-deco-layer', { opacity: 1, duration: 1.8, ease: "power3.out" }, 0.3);
  tl.to('.desk-layer', { opacity: 1, duration: 1.2, ease: "power3.out" }, 0.3);
  tl.to('.sign-layer', { opacity: 1, y: 0, duration: 1.0, ease: "power3.out" }, 0.6);
  tl.fromTo('.note-layer', { opacity: 0, x: -60 }, { opacity: 1, x: 0, duration: 0.9, ease: "power3.out" }, 0.8);
  tl.fromTo('.tips-layer', { opacity: 0, x: 60 }, { opacity: 1, x: 0, duration: 0.9, ease: "power3.out" }, 0.8);
  tl.to('.doctor-layer', { opacity: 1, y: -30, duration: 1.2, ease: "power3.out" }, 0.9);
  tl.to('.copy-layer', { opacity: 1, y: -10, duration: 1.0, ease: "power3.out" }, 1.0);
  tl.to('.float-1', { opacity: 0.6, duration: 1.2 }, 1.2);
  tl.to('.float-2', { opacity: 0.7, duration: 1.2 }, 1.3);
  tl.to('.float-3', { opacity: 0.5, duration: 1.2 }, 1.4);
  tl.to('.float-4', { opacity: 0.8, duration: 1.2 }, 1.5);
  tl.to('.float-5', { opacity: 0.65, duration: 1.2 }, 1.6);
  tl.to('.input-layer', { opacity: 1, y: -15, duration: 0.8, ease: "power3.out" }, 1.5);
  tl.to('.bubble-layer', { opacity: 1, y: -8, duration: 0.8, ease: "power3.out" }, 1.5);

  // 挂牌持续摇摆
  gsap.to('.sign-layer', { rotation: 2, duration: 4, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1.6 });

  // 医生呼吸漂浮
  gsap.to('.doctor-layer', { y: -38, duration: 3.6, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 2.1 });

  // 医生眨眼序列帧动画
  const doctorAnim = document.getElementById('doctor-anim');
  const frames = ['images/界面1/doctor1.png', 'images/界面1/doctor2.png'];
  let currentFrame = 0;
  setInterval(() => {
    currentFrame = (currentFrame + 1) % frames.length;
    doctorAnim.src = frames[currentFrame];
  }, 600);

  // 漂浮装饰持续浮动
  const floatItems = document.querySelectorAll('.float-item');
  floatItems.forEach((item, index) => {
    const duration = 5 + Math.random() * 4;
    const delay = 2.5 + index * 0.2;
    gsap.to(item, { y: -12, rotation: 3, duration: duration, repeat: -1, yoyo: true, ease: "sine.inOut", delay: delay });
  });

  // 输入框呼吸光
  gsap.to('.input-wrapper', { boxShadow: '0 0 30px rgba(255, 248, 230, 0.3)', duration: 2.5, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 2.3 });

  // 按钮初始隐藏，等待用户输入名字
  const buttonLayer = document.querySelector('.button-layer');
  gsap.set(buttonLayer, { opacity: 0, scale: 0.8 });
  startBtn.style.pointerEvents = 'none';

  const nameInput = document.querySelector('.name-input');
  nameInput.addEventListener('input', () => {
    if (nameInput.value.trim().length > 0) {
      buttonLayer.style.pointerEvents = 'auto';
      startBtn.style.pointerEvents = 'auto';
      gsap.to(buttonLayer, { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.6)" });
    } else {
      buttonLayer.style.pointerEvents = 'none';
      startBtn.style.pointerEvents = 'none';
      gsap.to(buttonLayer, { opacity: 0, scale: 0.8, duration: 0.3, ease: "power2.in" });
    }
  });

  // 按钮呼吸光
  gsap.to('.start-btn', { filter: 'drop-shadow(0 4px 20px rgba(255, 223, 186, 0.4))', duration: 3, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 2.6 });

  // 木桌台灯呼吸光
  gsap.to('.desk-light', { opacity: 0.72, duration: 3, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.5 });

  // 按钮hover效果
  startBtn.addEventListener('mouseenter', () => gsap.to(startBtn, { y: -2, duration: 0.3, ease: "power2.out" }));
  startBtn.addEventListener('mouseleave', () => gsap.to(startBtn, { y: 0, duration: 0.3, ease: "power2.out" }));

  // ==================== 界面1 → 界面2 过渡 ====================
  startBtn.addEventListener('click', (e) => {
    e.preventDefault();
    userName = nameInput.value.trim();
    startBtn.style.pointerEvents = 'none';

    const scene1 = document.getElementById('scene1');
    const scene2 = document.getElementById('scene2');

    const transTl = gsap.timeline();

    transTl.to(startBtn, { scale: 0.96, duration: 0.1, ease: "power2.in", onComplete: () => gsap.to(startBtn, { scale: 1, duration: 0.3, ease: "power2.out" }) });
    transTl.to(scene1, { y: -100, opacity: 0, duration: 1.0, ease: "power3.in" }, "+=0.1");
    transTl.fromTo(scene2, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: "power3.out", onComplete: () => { scene2.style.pointerEvents = 'auto'; gsap.set('.text', { opacity: 0, y: 20 }); } }, "+=0.15");

    transTl.add(() => {
      gsap.fromTo('.s2-question-deco', { opacity: 0, x: -80 }, { opacity: 1, x: 0, duration: 0.9, ease: "power3.out" });
      gsap.fromTo('.s2-person', { opacity: 0, x: -80 }, { opacity: 1, x: 0, duration: 0.9, ease: "power3.out" });
      gsap.fromTo('.s2-question-text', { opacity: 0, x: 80 }, { opacity: 1, x: 0, duration: 0.9, ease: "power3.out" });
      gsap.fromTo('.s2-option-1', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(2)", delay: 0.7 });
      gsap.fromTo('.s2-option-2', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(2)", delay: 1.4 });
      gsap.fromTo('.s2-option-3', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(2)", delay: 2.1 });
    }, "+=1.0");
  });

  // ==================== 选项切换 + 人物/提示词动画 + 继续按钮 ====================
  const personImg = document.querySelector('.s2-person img');
  const textArea = document.querySelector('.text');
  const tip1 = document.querySelector('.tip1 img');
  const tip2 = document.querySelector('.tip2 img');
  const continueBtn = document.querySelector('.continue');
  let continueShown = false;   // 控制继续按钮只显示一次

  const option1 = document.querySelector('.s2-option-1');
  const option2 = document.querySelector('.s2-option-2');
  const option3 = document.querySelector('.s2-option-3');

  const optionConfig = {
    opt1: {
      normal: 'images/界面2/选项1.png',
      active: 'images/界面2/选中选项1.png',
      person: 'images/界面2/选中选项1人物姿态.png',
      tip1: 'images/界面2/选中选项1提示词图案.png',
      tip2: 'images/界面2/选中选项1提示词文字.png'
    },
    opt2: {
      normal: 'images/界面2/选项2.png',
      active: 'images/界面2/选中选项2.png',
      person: 'images/界面2/选中选项2人物姿态.png',
      tip1: 'images/界面2/选中选项2提示词图案.png',
      tip2: 'images/界面2/选中选项2提示词文字.png'
    },
    opt3: {
      normal: 'images/界面2/选项3.png',
      active: 'images/界面2/选中选项3.png',
      person: 'images/界面2/选中选项3人物姿态.png',
      tip1: 'images/界面2/选中选项3提示词图案.png',
      tip2: 'images/界面2/选中选项3提示词文字.png'
    }
  };
  const defaultPerson = 'images/界面2/未选择时人物姿态.png';

  function resetAllOptions() {
    if (option1) option1.querySelector('img').src = optionConfig.opt1.normal;
    if (option2) option2.querySelector('img').src = optionConfig.opt2.normal;
    if (option3) option3.querySelector('img').src = optionConfig.opt3.normal;
    if (textArea) {
      gsap.killTweensOf(textArea);
      gsap.set(textArea, { opacity: 0, y: 20 });
    }
  }

  function bindOption(optionEl, config, optNum) {
    if (!optionEl) return;
    optionEl.addEventListener('click', () => {
      const currentImg = optionEl.querySelector('img');
      if (currentImg.src.includes(config.active)) return; // 已选中则不再重复

      q1Choice = optNum;

      resetAllOptions();

      // 显示继续按钮（仅第一次）
      if (!continueShown && continueBtn) {
        continueShown = true;
        gsap.to(continueBtn, { opacity: 1, duration: 0.5, ease: "power2.out", onComplete: () => { continueBtn.style.pointerEvents = 'auto'; } });
      }

      // 选项图片切换动画
      gsap.to(currentImg, {
        opacity: 0, scale: 0.9, duration: 0.2, onComplete: () => {
          currentImg.src = config.active;
          gsap.fromTo(currentImg, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.4)" });
        }
      });

      // 人物切换动画
      gsap.to(personImg, {
        opacity: 0, scale: 0.95, duration: 0.3, onComplete: () => {
          personImg.src = config.person;
          gsap.to(personImg, { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" });
        }
      });

      // 更新提示词并显示区域
      tip1.src = config.tip1;
      tip2.src = config.tip2;
      gsap.killTweensOf(textArea);
      gsap.fromTo(textArea, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", delay: 0.2 });
    });
  }

  bindOption(option1, optionConfig.opt1, 1);
  bindOption(option2, optionConfig.opt2, 2);
  bindOption(option3, optionConfig.opt3, 3);

  // ==================== 界面2 → 界面3 过渡 ====================
  const scene3 = document.getElementById('scene3');
  const swipeArea = document.getElementById('swipe-area');
  let touchStartY = 0;
  let canTransitionToScene3 = false; // 只有选中选项后才能跳转

  // 检查是否可以跳转到界面3（选中了选项且继续按钮已显示）
  function checkCanTransition() {
    return continueShown;
  }

  // 跳转到界面3的函数
  function goToScene3() {
    if (!checkCanTransition()) return;

    const scene2 = document.getElementById('scene2');

    gsap.to(scene2, {
      opacity: 0, duration: 0.6, ease: "power2.in", onComplete: () => {
        scene2.style.pointerEvents = 'none';
      }
    });
    gsap.fromTo(scene3, { opacity: 0 }, {
      opacity: 1, duration: 0.8, ease: "power3.out", onComplete: () => {
        scene3.style.pointerEvents = 'auto';
      }
    });
  }

  // 继续键点击跳转
  if (continueBtn) {
    continueBtn.addEventListener('click', goToScene3);
  }

  // 底部上划手势跳转
  if (swipeArea) {
    swipeArea.addEventListener('touchstart', (e) => {
      touchStartY = e.touches[0].clientY;
    }, { passive: true });

    swipeArea.addEventListener('touchend', (e) => {
      const touchEndY = e.changedTouches[0].clientY;
      const swipeDistance = touchStartY - touchEndY;

      // 向上滑动超过80px触发跳转
      if (swipeDistance > 80) {
        goToScene3();
      }
    }, { passive: true });

    // 兼容鼠标拖拽（桌面端测试）
    let mouseStartY = 0;
    let isMouseDown = false;

    swipeArea.addEventListener('mousedown', (e) => {
      mouseStartY = e.clientY;
      isMouseDown = true;
    });

    swipeArea.addEventListener('mouseup', (e) => {
      if (isMouseDown) {
        const mouseEndY = e.clientY;
        const swipeDistance = mouseStartY - mouseEndY;

        if (swipeDistance > 80) {
          goToScene3();
        }
        isMouseDown = false;
      }
    });

    swipeArea.addEventListener('mouseleave', () => {
      isMouseDown = false;
    });
  }

  // ==================== 界面3 窗帘拉开动画 ====================
  const curtain1 = document.getElementById('curtain1');
  const curtain2 = document.getElementById('curtain2');
  const s3Person = document.getElementById('s3-person');
  const s3QuestionDeco = document.getElementById('s3-question-deco');
  const s3QuestionText = document.getElementById('s3-question-text');
  const s3Option1 = document.getElementById('s3-option1');
  const s3Option2 = document.getElementById('s3-option2');
  const s3Option3 = document.getElementById('s3-option3');
  const s3PersonOpt1 = document.getElementById('s3-person-opt1');
  const s3PersonOpt2 = document.getElementById('s3-person-opt2');
  const s3PersonOpt3 = document.getElementById('s3-person-opt3');
  const s3Option1Default = s3Option1.querySelector('.s3-opt-default');
  const s3Option1Selected = s3Option1.querySelector('.s3-opt-selected');
  const s3Option2Default = s3Option2.querySelector('.s3-opt-default');
  const s3Option2Selected = s3Option2.querySelector('.s3-opt-selected');
  const s3Option3Default = s3Option3.querySelector('.s3-opt-default');
  const s3Option3Selected = s3Option3.querySelector('.s3-opt-selected');
  const s3PersonDefault = s3Person.querySelector('.s3-person-default');
  const s3TipPattern1 = document.getElementById('s3-tip-pattern-1');
  const s3TipPattern2 = document.getElementById('s3-tip-pattern-2');
  const s3TipPattern3 = document.getElementById('s3-tip-pattern-3');
  const s3ContinueBtn = document.getElementById('s3-continue');
  let curtainStep = 0;  // 0: 窗帘1显示, 1: 窗帘2显示, 2: 窗帘全部消失
  let scene3TouchStartY = 0;
  let scene3MouseDown = false;
  let scene3MouseStartY = 0;

  // 窗帘过渡函数
  function curtainTransition() {
    if (curtainStep === 0) {
      // 第一次滑动：窗帘1淡出，窗帘2淡入
      curtainStep = 1;
      gsap.to(curtain1, {
        opacity: 0, duration: 0.8, ease: "power2.inOut", onComplete: () => {
          curtain1.style.pointerEvents = 'none';  // 让点击穿透
        }
      });
      gsap.to(curtain2, { opacity: 1, duration: 0.8, ease: "power2.inOut" });
    } else if (curtainStep === 1) {
      // 第二次滑动：窗帘2淡出，露出背景，显示人物
      curtainStep = 2;
      gsap.to(curtain2, {
        opacity: 0, duration: 0.8, ease: "power2.inOut", onComplete: () => {
          curtain2.style.pointerEvents = 'none';  // 让点击穿透
        }
      });
      // 错落入场：人物 → 问题2 → 问题文字
      gsap.fromTo(s3Person, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.2, ease: "power3.out", delay: 1.0 });
      gsap.fromTo(s3QuestionDeco, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1.0, ease: "power3.out", delay: 1.3 });
      gsap.fromTo(s3QuestionText, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1.0, ease: "power3.out", delay: 1.6 });
      // 选项逐个翻转入场
      gsap.fromTo(s3Option1, { opacity: 0, rotateY: 90 }, {
        opacity: 1, rotateY: 0, duration: 0.8, ease: "power2.out", delay: 2.8, onComplete: () => {
          s3Option1.style.pointerEvents = 'auto';
        }
      });
      gsap.fromTo(s3Option2, { opacity: 0, rotateY: 90 }, {
        opacity: 1, rotateY: 0, duration: 0.8, ease: "power2.out", delay: 3.1, onComplete: () => {
          s3Option2.style.pointerEvents = 'auto';
        }
      });
      gsap.fromTo(s3Option3, { opacity: 0, rotateY: 90 }, {
        opacity: 1, rotateY: 0, duration: 0.8, ease: "power2.out", delay: 3.4, onComplete: () => {
          s3Option3.style.pointerEvents = 'auto';
        }
      });
    }
  }

  // ==================== 选项点击动画 ====================
  let optionSelected = null;

  function handleOptionClick(optionNum, selectedOption, defaultOption, selectedPerson, otherOption1, otherOption2, tipPattern) {
    if (optionSelected !== null || curtainStep !== 2) return;
    optionSelected = optionNum;
    q2Choice = optionNum;

    // 1. 人物推入推出
    gsap.to(s3PersonDefault, { x: 60, opacity: 0, duration: 0.6, ease: "power2.inOut" });
    gsap.fromTo(selectedPerson, { x: -60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, ease: "power2.inOut" });

    // 2. 选中选项弹跳脉冲
    gsap.fromTo(selectedOption, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" });
    gsap.to(defaultOption, { opacity: 0, duration: 0.3, ease: "power2.in" });

    // 3. 其他选项向两侧滑出
    gsap.to(otherOption1, { x: -80, opacity: 0, duration: 0.5, ease: "power2.in" });
    gsap.to(otherOption2, { x: 80, opacity: 0, duration: 0.5, ease: "power2.in" });

    // 4. 提示词图案入场
    gsap.fromTo(tipPattern, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", delay: 0.3 });

    // 5. 继续键缩放弹出
    gsap.fromTo(s3ContinueBtn, { opacity: 0, scale: 0 }, {
      opacity: 1, scale: 1, duration: 0.6, ease: "back.out(2)", delay: 0.6, onComplete: () => {
        s3ContinueBtn.style.pointerEvents = 'auto';
      }
    });
  }

  if (s3Option1) {
    s3Option1.addEventListener('click', () => {
      handleOptionClick(1, s3Option1Selected, s3Option1Default, s3PersonOpt1, s3Option2, s3Option3, s3TipPattern1);
    });
  }
  if (s3Option2) {
    s3Option2.addEventListener('click', () => {
      handleOptionClick(2, s3Option2Selected, s3Option2Default, s3PersonOpt2, s3Option1, s3Option3, s3TipPattern2);
    });
  }
  if (s3Option3) {
    s3Option3.addEventListener('click', () => {
      handleOptionClick(3, s3Option3Selected, s3Option3Default, s3PersonOpt3, s3Option1, s3Option2, s3TipPattern3);
    });
  }

  // ==================== 界面3 → 界面4 翻书转场 ====================
  const scene4 = document.getElementById('scene4');
  let isFlippingToScene4 = false;

  function goToScene4() {
    if (isFlippingToScene4) return;
    isFlippingToScene4 = true;

    // 界面3像书页一样向左翻过去
    gsap.to(scene3, { rotateY: -85, opacity: 0, duration: 0.8, ease: "power2.inOut" });
    // 界面4像下一页一样从右边翻进来
    gsap.fromTo(scene4, { rotateY: 85, opacity: 0 }, {
      rotateY: 0, opacity: 1, duration: 0.8, ease: "power2.inOut", onComplete: () => {
        scene3.style.pointerEvents = 'none';
        scene4.style.pointerEvents = 'auto';
        // 问题3迷你翻转入场
        gsap.fromTo(s4QuestionDeco, { opacity: 0, rotateY: 90 }, { opacity: 1, rotateY: 0, duration: 0.6, ease: "power2.out" });
        // 人物迷你翻转入场（延迟0.25s形成序列）
        gsap.fromTo(s4Person, { opacity: 0, rotateY: 90 }, { opacity: 1, rotateY: 0, duration: 0.6, ease: "power2.out", delay: 0.25 });
        // 问题文字从左往右渐显（延迟0.5s形成序列）
        gsap.fromTo(s4QuestionText, { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 0.7, ease: "power2.out", delay: 0.5 });
        // 选项纸牌弹落入场：依次从上方掉落
        gsap.fromTo(s4Option1, { opacity: 0, y: -60 }, { opacity: 1, y: 0, duration: 0.8, ease: "back.out(1.5)", delay: 1.5, onComplete: () => { s4Option1.style.pointerEvents = 'auto'; } });
        gsap.fromTo(s4Option2, { opacity: 0, y: -60 }, { opacity: 1, y: 0, duration: 0.8, ease: "back.out(1.5)", delay: 1.8, onComplete: () => { s4Option2.style.pointerEvents = 'auto'; } });
        gsap.fromTo(s4Option3, { opacity: 0, y: -60 }, { opacity: 1, y: 0, duration: 0.8, ease: "back.out(1.5)", delay: 2.1, onComplete: () => { s4Option3.style.pointerEvents = 'auto'; } });
        // 长按提示词淡入上浮
        gsap.fromTo(s4TipHold, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", delay: 2.5 });
      }
    });
  }

  if (s3ContinueBtn) {
    s3ContinueBtn.addEventListener('click', goToScene4);
  }

  const s4QuestionDeco = document.getElementById('s4-question-deco');
  const s4Person = document.getElementById('s4-person');
  const s4QuestionText = document.getElementById('s4-question-text');
  const s4Option1 = document.getElementById('s4-option1');
  const s4Option2 = document.getElementById('s4-option2');
  const s4Option3 = document.getElementById('s4-option3');
  const s4TipHold = document.getElementById('s4-tip-hold');
  const s4TipPattern1 = document.getElementById('s4-tip-pattern-1');
  const s4TipPattern2 = document.getElementById('s4-tip-pattern-2');
  const s4TipPattern3 = document.getElementById('s4-tip-pattern-3');
  const s4ContinueBtn = document.getElementById('s4-continue');

  // 触摸滑动监听（scene3整个区域）
  scene3.addEventListener('touchstart', (e) => {
    scene3TouchStartY = e.touches[0].clientY;
  }, { passive: true });

  scene3.addEventListener('touchend', (e) => {
    const touchEndY = e.changedTouches[0].clientY;
    const swipeDistance = scene3TouchStartY - touchEndY;

    // 向上滑动超过80px触发窗帘过渡
    if (swipeDistance > 80 && curtainStep < 2) {
      curtainTransition();
    }
  }, { passive: true });

  // 鼠标拖拽监听（桌面端测试）
  scene3.addEventListener('mousedown', (e) => {
    scene3MouseStartY = e.clientY;
    scene3MouseDown = true;
  });

  scene3.addEventListener('mouseup', (e) => {
    if (scene3MouseDown) {
      const mouseEndY = e.clientY;
      const swipeDistance = scene3MouseStartY - mouseEndY;

      if (swipeDistance > 80 && curtainStep < 2) {
        curtainTransition();
      }
      scene3MouseDown = false;
    }
  });

  scene3.addEventListener('mouseleave', () => {
    scene3MouseDown = false;
  });

  // ==================== 界面4 长按选择交互 ====================
  const s4Option1Default = s4Option1.querySelector('.s4-opt-default');
  const s4Option1Selected = s4Option1.querySelector('.s4-opt-selected');
  const s4Option2Default = s4Option2.querySelector('.s4-opt-default');
  const s4Option2Selected = s4Option2.querySelector('.s4-opt-selected');
  const s4Option3Default = s4Option3.querySelector('.s4-opt-default');
  const s4Option3Selected = s4Option3.querySelector('.s4-opt-selected');

  const ring1Fill = s4Option1.querySelector('.progress-ring-fill');
  const ring2Fill = s4Option2.querySelector('.progress-ring-fill');
  const ring3Fill = s4Option3.querySelector('.progress-ring-fill');
  const ring1 = s4Option1.querySelector('.progress-ring');
  const ring2 = s4Option2.querySelector('.progress-ring');
  const ring3 = s4Option3.querySelector('.progress-ring');

  let s4OptionChosen = null;   // 已选中的选项编号
  let holdTimer = null;
  let holdStartTime = 0;
  const HOLD_DURATION = 800;   // 0.8秒

  // 语音文件映射
  const voiceMap = {
    1: new Audio('images/界面4/选项1语音.MP3'),
    2: new Audio('images/界面4/选项2语音.MP3'),
    3: new Audio('images/界面4/选项3语音.MP3')
  };

  function getOptionElements(num) {
    if (num === 1) return { el: s4Option1, def: s4Option1Default, sel: s4Option1Selected, ringFill: ring1Fill, ring: ring1, others: [s4Option2, s4Option3] };
    if (num === 2) return { el: s4Option2, def: s4Option2Default, sel: s4Option2Selected, ringFill: ring2Fill, ring: ring2, others: [s4Option1, s4Option3] };
    if (num === 3) return { el: s4Option3, def: s4Option3Default, sel: s4Option3Selected, ringFill: ring3Fill, ring: ring3, others: [s4Option1, s4Option2] };
  }

  function startHold(optionNum) {
    if (s4OptionChosen !== null) return;  // 已选中则忽略
    const { ring, ringFill } = getOptionElements(optionNum);
    holdStartTime = Date.now();
    holdTimer = optionNum;

    // 显示环形进度条，动画填充
    gsap.set(ring, { opacity: 1 });
    gsap.fromTo(ringFill, { strokeDashoffset: 276 }, { strokeDashoffset: 0, duration: HOLD_DURATION / 1000, ease: "linear" });

    // 播放语音
    const audio = voiceMap[optionNum];
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(() => { });
    }
  }

  function cancelHold(optionNum) {
    const { ring, ringFill } = getOptionElements(optionNum);
    holdTimer = null;
    gsap.killTweensOf(ringFill);
    gsap.set(ring, { opacity: 0 });
    gsap.set(ringFill, { strokeDashoffset: 276 });

    const audio = voiceMap[optionNum];
    if (audio) { audio.pause(); audio.currentTime = 0; }
  }

  function completeHold(optionNum) {
    holdTimer = null;
    s4OptionChosen = optionNum;
    const { el, def, sel, ring, ringFill, others } = getOptionElements(optionNum);

    // 隐藏进度环
    gsap.set(ring, { opacity: 0 });
    gsap.set(ringFill, { strokeDashoffset: 276 });

    // 计算选项容器中心位置（选项2的位置作为中心参考）
    const containerRect = s4Option2.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    const centerY = containerRect.top + containerRect.height / 2;
    const elCenterY = elRect.top + elRect.height / 2;
    const dropDistance = centerY - elCenterY;

    // 1. 选项闪烁→选中态替换
    gsap.to(def, { opacity: 0, duration: 0.2, ease: "power2.in" });
    gsap.fromTo(sel, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(1.5)" });

    // 2. 弹跳掉落到中心
    if (Math.abs(dropDistance) > 5) {
      gsap.to(el, { y: dropDistance, duration: 0.6, ease: "bounce.out", delay: 0.2 });
    }

    // 3. 其他两个选项向两侧滑出
    gsap.to(others[0], { x: -80, opacity: 0, duration: 0.5, ease: "power2.in" });
    gsap.to(others[1], { x: 80, opacity: 0, duration: 0.5, ease: "power2.in" });

    // 4. 选中提示词图案：缩放弹入（选项落地后出现）
    const tipMap = { 1: s4TipPattern1, 2: s4TipPattern2, 3: s4TipPattern3 };
    const targetTip = tipMap[optionNum];
    gsap.fromTo(targetTip, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)", delay: 0.6 });

    // 5. 翻牌交换：提示词翻出 → 继续键翻入
    gsap.to(targetTip, { opacity: 0, rotateY: -90, duration: 0.5, ease: "power2.in", delay: 1.5 });
    gsap.to(s4TipHold, { opacity: 0, y: -20, duration: 0.5, ease: "power2.in", delay: 1.5 });
    gsap.fromTo(s4ContinueBtn, { opacity: 0, rotateY: 90 }, {
      opacity: 1, rotateY: 0, duration: 0.5, ease: "power2.out", delay: 1.6, onComplete: () => {
        s4ContinueBtn.style.pointerEvents = 'auto';
      }
    });
  }

  // 为三个选项绑定事件
  [s4Option1, s4Option2, s4Option3].forEach((optEl, i) => {
    const num = i + 1;

    // 触摸事件
    optEl.addEventListener('touchstart', (e) => {
      e.preventDefault();
      startHold(num);
    });
    optEl.addEventListener('touchend', (e) => {
      e.preventDefault();
      if (holdTimer === num) {
        const elapsed = Date.now() - holdStartTime;
        if (elapsed >= HOLD_DURATION) {
          completeHold(num);
        } else {
          cancelHold(num);
        }
      }
    });
    optEl.addEventListener('touchcancel', () => {
      if (holdTimer === num) cancelHold(num);
    });

    // 鼠标事件
    optEl.addEventListener('mousedown', (e) => {
      e.preventDefault();
      startHold(num);
    });
    optEl.addEventListener('mouseup', (e) => {
      e.preventDefault();
      if (holdTimer === num) {
        const elapsed = Date.now() - holdStartTime;
        if (elapsed >= HOLD_DURATION) {
          completeHold(num);
        } else {
          cancelHold(num);
        }
      }
    });
    optEl.addEventListener('mouseleave', () => {
      if (holdTimer === num) cancelHold(num);
    });
  });

  // ==================== 界面4 → 界面5 幕布拉开转场 ====================
  const scene5 = document.getElementById('scene5');
  const s5QuesDeco = document.getElementById('s5-question-deco');
  const s5BottomDeco = document.getElementById('s5-bottom-deco');
  const s5TopNote = document.getElementById('s5-top-note');
  const s5Person = document.getElementById('s5-person');
  const s5QuestionText = document.getElementById('s5-question-text');
  const s5CloudRose = document.getElementById('s5-cloud-rose');
  const s5CloudShoe = document.getElementById('s5-cloud-shoe');
  const s5CloudBlock = document.getElementById('s5-cloud-block');
  const s5ItemRose = document.getElementById('s5-item-rose');
  const s5ItemShoe = document.getElementById('s5-item-shoe');
  const s5ItemBlock = document.getElementById('s5-item-block');
  const s5Bubble = document.getElementById('s5-bubble');
  const s5DragHint = document.getElementById('s5-drag-hint');
  const s5LabelRose = document.getElementById('s5-label-rose');
  const s5LabelShoe = document.getElementById('s5-label-shoe');
  const s5LabelBlock = document.getElementById('s5-label-block');
  let isAtScene5 = false;

  function goToScene5() {
    if (isAtScene5) return;
    isAtScene5 = true;

    // 界面4像幕布从中间向两侧拉开
    gsap.to(scene4, {
      scaleX: 0, opacity: 0, duration: 0.8, ease: "power2.inOut", transformOrigin: "center center", onComplete: () => {
        scene4.style.pointerEvents = 'none';
      }
    });
    // 界面5从幕后露出
    gsap.fromTo(scene5, { opacity: 0 }, {
      opacity: 1, duration: 0.8, ease: "power2.inOut", onComplete: () => {
        scene5.style.pointerEvents = 'auto';
        // 幕布拉开后，三个元素依次入场
        // 1. 问题4：上方飘落淡入
        gsap.fromTo(s5QuesDeco, { opacity: 0, y: -40 }, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" });
        // 2. 底部装饰：底部滑入淡入
        gsap.fromTo(s5BottomDeco, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out", delay: 0.2 });
        // 3. 顶部便签：掉落弹摆入场
        gsap.fromTo(s5TopNote, { opacity: 0, y: -80, rotate: -15 }, {
          opacity: 1, y: 0, rotate: 0, duration: 0.8, ease: "bounce.out", delay: 0.4, onComplete: () => {
            s5TopNote.style.animation = 'noteSwing 3s ease-in-out infinite';
          }
        });
        // 4. 人物：笔刷描绘（clip-path 从左往右刷出）
        gsap.fromTo(s5Person, { opacity: 1, clipPath: 'inset(0 100% 0 0)' }, { opacity: 1, clipPath: 'inset(0 0% 0 0)', duration: 1.0, ease: "power2.inOut", delay: 1.0 });
        // 5. 问题文字：反向擦除（clip-path 从右往左擦出）
        gsap.fromTo(s5QuestionText, { opacity: 1, clipPath: 'inset(0 0 0 100%)' }, { opacity: 1, clipPath: 'inset(0 0 0 0%)', duration: 1.0, ease: "power2.inOut", delay: 1.5 });
        // 6. 三个白云依次泡泡弹开
        gsap.fromTo(s5CloudRose, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(2)", delay: 2.5 });
        gsap.fromTo(s5CloudShoe, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(2)", delay: 2.75 });
        gsap.fromTo(s5CloudBlock, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(2)", delay: 3.0 });
        // 7. 三个物品依次闪光瞬现（白云出现后）
        gsap.fromTo(s5ItemRose, { opacity: 0, scale: 0, filter: 'brightness(3)' }, { opacity: 1, scale: 1, filter: 'brightness(1)', duration: 0.5, ease: "power2.out", delay: 3.8, onComplete: () => { s5ItemRose.style.pointerEvents = 'auto'; } });
        gsap.fromTo(s5ItemShoe, { opacity: 0, scale: 0, filter: 'brightness(3)' }, { opacity: 1, scale: 1, filter: 'brightness(1)', duration: 0.5, ease: "power2.out", delay: 4.05, onComplete: () => { s5ItemShoe.style.pointerEvents = 'auto'; } });
        gsap.fromTo(s5ItemBlock, { opacity: 0, scale: 0, filter: 'brightness(3)' }, { opacity: 1, scale: 1, filter: 'brightness(1)', duration: 0.5, ease: "power2.out", delay: 4.3, onComplete: () => { s5ItemBlock.style.pointerEvents = 'auto'; } });
        // 8. 三个标签依次向上翻转入场
        gsap.fromTo(s5LabelRose, { opacity: 0, rotateX: -90 }, { opacity: 1, rotateX: 0, duration: 0.5, ease: "power2.out", delay: 5.0 });
        gsap.fromTo(s5LabelShoe, { opacity: 0, rotateX: -90 }, { opacity: 1, rotateX: 0, duration: 0.5, ease: "power2.out", delay: 5.2 });
        gsap.fromTo(s5LabelBlock, { opacity: 0, rotateX: -90 }, { opacity: 1, rotateX: 0, duration: 0.5, ease: "power2.out", delay: 5.4 });
        // 9. 问题提示气泡：吹气膨胀淡入（scale从小变大）
        gsap.fromTo(s5Bubble, { opacity: 0, scale: 0.3 }, { opacity: 1, scale: 1, duration: 0.7, ease: "back.out(1.3)", delay: 5.8 });
        // 10. 拖动提示键：闪烁渐入
        gsap.fromTo(s5DragHint, { opacity: 0 }, {
          opacity: 1, duration: 0.15, ease: "power2.in", delay: 5.5,
          onComplete: () => {
            gsap.to(s5DragHint, {
              opacity: 0.2, duration: 0.15, ease: "power2.in", onComplete: () => {
                gsap.to(s5DragHint, {
                  opacity: 1, duration: 0.15, ease: "power2.in", onComplete: () => {
                    gsap.to(s5DragHint, {
                      opacity: 0.3, duration: 0.15, ease: "power2.in", onComplete: () => {
                        gsap.to(s5DragHint, { opacity: 1, duration: 0.2, ease: "power2.out" });
                      }
                    });
                  }
                });
              }
            });
          }
        });
      }
    });
  }

  // 继续键点击 → 进入界面5
  if (s4ContinueBtn) {
    s4ContinueBtn.addEventListener('click', goToScene5);
  }

  // ==================== 界面5 拖拽选择交互 ====================
  const s5PersonDefault = document.querySelector('.s5-person-default');
  const s5PersonOpt1 = document.getElementById('s5-person-opt1');
  const s5PersonOpt2 = document.getElementById('s5-person-opt2');
  const s5PersonOpt3 = document.getElementById('s5-person-opt3');
  const s5LightPillar = document.getElementById('s5-light-pillar');
  const s5Sparkles = document.getElementById('s5-sparkles');
  const s5SelectTip = document.getElementById('s5-select-tip');
  const s5Continue = document.getElementById('s5-continue');
  const s5TipPattern1 = document.getElementById('s5-tip-pattern-1');
  const s5TipPattern2 = document.getElementById('s5-tip-pattern-2');
  const s5TipPattern3 = document.getElementById('s5-tip-pattern-3');

  let s5DragChosen = null;
  let dragItem = null;
  let dragStartX = 0, dragStartY = 0;
  let dragOrigLeft = '', dragOrigBottom = '';
  let isDragging = false;

  const itemMap = {
    rose: { el: s5ItemRose, person: s5PersonOpt1, label: s5LabelRose, cloud: s5CloudRose, tipPattern: s5TipPattern1 },
    shoe: { el: s5ItemShoe, person: s5PersonOpt2, label: s5LabelShoe, cloud: s5CloudShoe, tipPattern: s5TipPattern2 },
    block: { el: s5ItemBlock, person: s5PersonOpt3, label: s5LabelBlock, cloud: s5CloudBlock, tipPattern: s5TipPattern3 }
  };

  function spawnSparkles() {
    const count = 20;
    s5Sparkles.innerHTML = '';
    for (let i = 0; i < count; i++) {
      const dot = document.createElement('div');
      dot.className = 's5-sparkle';
      dot.style.left = '50%';
      dot.style.top = '50%';
      s5Sparkles.appendChild(dot);
    }
    const dots = s5Sparkles.querySelectorAll('.s5-sparkle');
    dots.forEach(dot => {
      const angle = Math.random() * Math.PI * 2;
      const dist = 40 + Math.random() * 80;
      gsap.fromTo(dot, { x: 0, y: 0, scale: 1, opacity: 1 }, { x: Math.cos(angle) * dist, y: Math.sin(angle) * dist, scale: 0, opacity: 0, duration: 0.8, ease: "power2.out" });
    });
  }

  function startDrag(itemName, e) {
    if (s5DragChosen !== null) return;
    const item = itemMap[itemName];
    if (!item) return;
    dragItem = item.el;
    isDragging = true;
    const rect = dragItem.getBoundingClientRect();
    dragOrigLeft = dragItem.style.left;
    dragOrigBottom = dragItem.style.bottom;
    const cx = e.touches ? e.touches[0].clientX : e.clientX;
    const cy = e.touches ? e.touches[0].clientY : e.clientY;
    dragStartX = cx - rect.left;
    dragStartY = cy - rect.top;
    dragItem.style.zIndex = '520';
    dragItem.style.transition = 'none';
  }

  function moveDrag(e) {
    if (!isDragging || !dragItem) return;
    const cx = e.touches ? e.touches[0].clientX : e.clientX;
    const cy = e.touches ? e.touches[0].clientY : e.clientY;
    const sr = scene5.getBoundingClientRect();
    dragItem.style.left = (cx - dragStartX - sr.left) + 'px';
    dragItem.style.bottom = (sr.bottom - cy + dragStartY - sr.top) + 'px';
  }

  function endDrag(e) {
    if (!isDragging || !dragItem) return;
    isDragging = false;
    dragItem.style.transition = '';
    const ir = dragItem.getBoundingClientRect();
    const pr = s5Person.getBoundingClientRect();
    const icx = ir.left + ir.width / 2, icy = ir.top + ir.height / 2;
    const hit = icx > pr.left && icx < pr.right && icy > pr.top && icy < pr.bottom;

    if (hit) {
      let hitName = null;
      for (const [k, v] of Object.entries(itemMap)) {
        if (v.el === dragItem) { hitName = k; break; }
      }
      if (hitName) { completeDrag(hitName); return; }
    }
    dragItem.style.left = dragOrigLeft;
    dragItem.style.bottom = dragOrigBottom;
    dragItem.style.zIndex = '516';
  }

  function completeDrag(itemName) {
    const item = itemMap[itemName];
    s5DragChosen = itemName;

    // 星光爆发
    spawnSparkles();
    // 光柱
    gsap.fromTo(s5LightPillar, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.in" });
    gsap.to(s5LightPillar, { opacity: 0, duration: 0.6, delay: 0.8, ease: "power2.out" });
    // 人物切换+放大+下移
    gsap.to(s5PersonDefault, { opacity: 0, duration: 0.3, ease: "power2.in" });
    gsap.to(s5Person, { scale: 1.15, y: 34, duration: 0.5, ease: "back.out(1.5)", delay: 0.3 });
    gsap.fromTo(item.person, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.5)", delay: 0.6 });
    // 选中物品的白云缩放退场 + 标签翻转退场
    gsap.to(item.cloud, { opacity: 0, scale: 0, duration: 0.5, ease: "power2.in" });
    gsap.to(item.label, { opacity: 0, rotateX: 90, duration: 0.5, ease: "power2.in" });
    // 其他物品+白云+标签退场
    Object.keys(itemMap).filter(k => k !== itemName).forEach(k => {
      const o = itemMap[k];
      gsap.to(o.el, { opacity: 0, y: -30, duration: 0.5, ease: "power2.in" });
      gsap.to(o.cloud, { opacity: 0, scale: 0, duration: 0.5, ease: "power2.in" });
      gsap.to(o.label, { opacity: 0, y: 10, duration: 0.5, ease: "power2.in" });
    });
    gsap.to(dragItem, { opacity: 0, scale: 0, duration: 0.4, ease: "power2.in" });
    // 气泡缩退 + 选中提示词弹入
    gsap.to(s5Bubble, { opacity: 0, scale: 0, duration: 0.4, ease: "power2.in", delay: 0.3 });
    gsap.fromTo(s5SelectTip, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)", delay: 0.6 });
    // 拖动键缩小退出 + 继续键放大弹入
    gsap.to(s5DragHint, { opacity: 0, scale: 0, duration: 0.4, ease: "power2.in", delay: 0.3 });
    gsap.fromTo(s5Continue, { opacity: 0, scale: 0 }, {
      opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)", delay: 0.7, onComplete: () => {
        s5Continue.style.pointerEvents = 'auto';
      }
    });
    // 底部装饰向下滑出
    gsap.to(s5BottomDeco, { opacity: 0, y: 60, duration: 0.6, ease: "power2.in", delay: 0.3 });
    // 选中选项提示词图案：星光凝聚成形（模糊→清晰+缩放）
    gsap.fromTo(item.tipPattern, { opacity: 0, scale: 0, filter: 'blur(12px)' }, { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.7, ease: "power2.out", delay: 1.0 });
  }

  // 绑定拖拽事件
  Object.entries(itemMap).forEach(([name, obj]) => {
    obj.el.style.cursor = 'grab';
    obj.el.addEventListener('touchstart', (e) => { e.preventDefault(); startDrag(name, e); }, { passive: false });
    obj.el.addEventListener('mousedown', (e) => { e.preventDefault(); startDrag(name, e); });
  });

  document.addEventListener('touchmove', (e) => { if (isDragging) e.preventDefault(); moveDrag(e); }, { passive: false });
  document.addEventListener('touchend', (e) => endDrag(e));
  document.addEventListener('mousemove', (e) => moveDrag(e));
  document.addEventListener('mouseup', (e) => endDrag(e));

  // ==================== 界面5 → 界面6 魔法阵传送门转场 ====================
  const scene6 = document.getElementById('scene6');
  const scene7 = document.getElementById('scene7');
  const scene8 = document.getElementById('scene8');
  const s6MagicCircle = document.getElementById('s6-magic-circle');
  const s6QuesDeco = document.getElementById('s6-question-deco');
  const s6QuesText = document.getElementById('s6-question-text');
  const s6Person = document.getElementById('s6-person');
  const s6Bubble = document.getElementById('s6-bubble');
  const s6ItemCape = document.getElementById('s6-item-cape');
  const s6ItemDoor = document.getElementById('s6-item-door');
  const s6ItemWheel = document.getElementById('s6-item-wheel');
  const s6LabelCape = document.getElementById('s6-label-cape');
  const s6LabelDoor = document.getElementById('s6-label-door');
  const s6LabelWheel = document.getElementById('s6-label-wheel');
  const s6MagicKey = document.getElementById('s6-magic-key');
  let isAtScene6 = false;

  function goToScene6() {
    if (isAtScene6) return;
    isAtScene6 = true;

    // 魔法阵从继续键位置扩散
    const btnRect = s5Continue.getBoundingClientRect();
    const cx = btnRect.left + btnRect.width / 2;
    const cy = btnRect.top + btnRect.height / 2;
    s6MagicCircle.style.left = cx + 'px';
    s6MagicCircle.style.top = cy + 'px';
    s6MagicCircle.style.width = '20px';
    s6MagicCircle.style.height = '20px';
    s6MagicCircle.style.opacity = '1';

    // 魔法阵扩大
    gsap.to(s6MagicCircle, { width: '200vw', height: '200vw', opacity: 0, duration: 1.0, ease: "power2.in" });

    // scene5被吸入
    gsap.to(scene5, {
      scale: 0.3, opacity: 0, duration: 0.8, ease: "power2.inOut", transformOrigin: `${cx}px ${cy}px`, onComplete: () => {
        scene5.style.pointerEvents = 'none';
      }
    });
    // scene6从传送门浮现
    gsap.fromTo(scene6, { scale: 1.5, opacity: 0 }, {
      scale: 1, opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.4, onComplete: () => {
        scene6.style.pointerEvents = 'auto';
        // 问题5：旋转飘落淡入
        gsap.fromTo(s6QuesDeco, { opacity: 0, y: -60, rotate: -15 }, { opacity: 1, y: 0, rotate: 0, duration: 0.8, ease: "power2.out" });
        // 问题文字：魔法显现淡入
        gsap.fromTo(s6QuesText, { opacity: 0, filter: 'brightness(2) blur(4px)' }, { opacity: 1, filter: 'brightness(1) blur(0px)', duration: 0.7, ease: "power2.out", delay: 0.3 });
        // 人物：魔法火花点燃显现（clip-path从下往上+闪光）
        gsap.fromTo(s6Person, { opacity: 1, clipPath: 'inset(100% 0 0 0)', filter: 'brightness(3)' }, { opacity: 1, clipPath: 'inset(0% 0 0 0)', filter: 'brightness(1)', duration: 1.0, ease: "power2.inOut", delay: 0.6 });
        // 气泡：飘落弹跳淡入
        gsap.fromTo(s6Bubble, { opacity: 0, y: -40 }, { opacity: 1, y: 0, duration: 0.7, ease: "bounce.out", delay: 1.2 });
        // 三个物品魔法光圈降落
        gsap.fromTo(s6ItemCape, { opacity: 0, y: -80, rotate: 180, scale: 0, filter: 'brightness(2)' }, { opacity: 1, y: 0, rotate: 0, scale: 1, filter: 'brightness(1)', duration: 0.8, ease: "back.out(1.5)", delay: 1.6, onComplete: () => { s6ItemCape.style.pointerEvents = 'auto'; } });
        gsap.fromTo(s6ItemDoor, { opacity: 0, y: -80, rotate: 180, scale: 0, filter: 'brightness(2)' }, { opacity: 1, y: 0, rotate: 0, scale: 1, filter: 'brightness(1)', duration: 0.8, ease: "back.out(1.5)", delay: 1.9, onComplete: () => { s6ItemDoor.style.pointerEvents = 'auto'; } });
        gsap.fromTo(s6ItemWheel, { opacity: 0, y: -80, rotate: 180, scale: 0, filter: 'brightness(2)' }, { opacity: 1, y: 0, rotate: 0, scale: 1, filter: 'brightness(1)', duration: 0.8, ease: "back.out(1.5)", delay: 2.2, onComplete: () => { s6ItemWheel.style.pointerEvents = 'auto'; } });
        // 三个标签飘出旋落入场
        gsap.fromTo(s6LabelCape, { opacity: 0, y: 20, rotate: 8 }, { opacity: 1, y: 0, rotate: 0, duration: 0.6, ease: "power2.out", delay: 2.6, onComplete: () => { s6LabelCape.style.pointerEvents = 'auto'; } });
        gsap.fromTo(s6LabelDoor, { opacity: 0, y: 20, rotate: 8 }, { opacity: 1, y: 0, rotate: 0, duration: 0.6, ease: "power2.out", delay: 2.8, onComplete: () => { s6LabelDoor.style.pointerEvents = 'auto'; } });
        gsap.fromTo(s6LabelWheel, { opacity: 0, y: 20, rotate: 8 }, { opacity: 1, y: 0, rotate: 0, duration: 0.6, ease: "power2.out", delay: 3.0, onComplete: () => { s6LabelWheel.style.pointerEvents = 'auto'; } });
        // 魔法键：缩放弹出+光晕
        gsap.fromTo(s6MagicKey, { opacity: 0, scale: 0, filter: 'drop-shadow(0 0 30px rgba(255,200,80,0))' }, {
          opacity: 1, scale: 1, filter: 'drop-shadow(0 0 30px rgba(255,200,80,0.8))', duration: 0.6, ease: "back.out(2)", delay: 3.5, onComplete: () => {
            s6MagicKey.style.pointerEvents = 'auto';
            // 光晕消退
            gsap.to(s6MagicKey, { filter: 'drop-shadow(0 0 10px rgba(255,200,80,0.2))', duration: 0.8, ease: "power2.out" });
          }
        });
      }
    });
  }

  // 继续键点击 → 进入界面6
  if (s5Continue) {
    s5Continue.addEventListener('click', goToScene6);
  }

  // ==================== 界面6 物品选择交互（披风 / 任意门） ====================
  const s6Overlay = document.getElementById('s6-overlay');
  const s6GifContainer = document.getElementById('s6-gif-container');
  const s6GifImg = document.getElementById('s6-gif-img');
  const s6PersonCape = document.getElementById('s6-person-cape');
  const s6CapeBubble = document.getElementById('s6-cape-bubble');
  const s6CapeTooltip = document.getElementById('s6-cape-tooltip');
  const s6PersonDoor = document.getElementById('s6-person-door');
  const s6DoorBubble = document.getElementById('s6-door-bubble');
  const s6DoorTooltip = document.getElementById('s6-door-tooltip');
  const s6PersonWheel = document.getElementById('s6-person-wheel');
  const s6WheelBubble = document.getElementById('s6-wheel-bubble');
  const s6WheelTooltip = document.getElementById('s6-wheel-tooltip');
  const s6SwipeHint = document.getElementById('s6-swipe-hint');
  const capeAudio = new Audio('images/界面6/披风音频.MP3');
  const doorAudio = new Audio('images/界面6/任意门音频.MP3');
  const wheelAudio = new Audio('images/界面6/摩天轮音频.MP3');
  let s6ItemChosen = null;
  let s6ItemsClickable = false;
  let canSwipeToScene7 = false;
  let isAtScene7 = false;
  setTimeout(() => { s6ItemsClickable = true; }, 5000);

  const s6ItemConfigs = {
    cape: {
      itemEl: s6ItemCape,
      gifSrc: 'images/界面6/披风gif视频.gif',
      gifWidth: '60vw',
      audio: capeAudio,
      personSelected: s6PersonCape,
      bubble: s6CapeBubble,
      tooltip: s6CapeTooltip
    },
    door: {
      itemEl: s6ItemDoor,
      gifSrc: 'images/界面6/任意门gif视频.gif',
      gifWidth: '100vw',
      audio: doorAudio,
      personSelected: s6PersonDoor,
      bubble: s6DoorBubble,
      tooltip: s6DoorTooltip
    },
    wheel: {
      itemEl: s6ItemWheel,
      gifSrc: 'images/界面6/摩天轮gif视频.gif',
      gifWidth: '60vw',
      audio: wheelAudio,
      personSelected: s6PersonWheel,
      bubble: s6WheelBubble,
      tooltip: s6WheelTooltip
    }
  };

  function selectItem(itemName) {
    if (!s6ItemsClickable || s6ItemChosen !== null) return;
    const cfg = s6ItemConfigs[itemName];
    if (!cfg) return;
    s6ItemChosen = itemName;

    // 魔法阵爆发+闪光
    gsap.to(cfg.itemEl, {
      scale: 1.2, filter: 'brightness(3)', duration: 0.2, ease: "power2.in", onComplete: () => {
        gsap.to(cfg.itemEl, { scale: 1, filter: 'brightness(1)', duration: 0.5, ease: "power2.out" });
      }
    });
    // 暗屏
    gsap.to(s6Overlay, { background: 'rgba(0,0,0,0.85)', duration: 0.6, ease: "power2.inOut" });
    // 裂空而出
    s6GifImg.src = cfg.gifSrc;
    s6GifImg.style.width = cfg.gifWidth;
    setTimeout(() => {
      gsap.fromTo(s6GifContainer, { opacity: 0, scale: 0.1, clipPath: 'inset(0 45% 0 45%)' }, {
        opacity: 1, scale: 1, clipPath: 'inset(0 0% 0 0%)', duration: 0.8, ease: "power2.inOut", onComplete: () => {
          cfg.audio.currentTime = 0;
          cfg.audio.play().catch(() => { });
          // 播放一次后自动退出
          setTimeout(() => {
            if (s6ItemChosen === itemName) closeItemGif(itemName);
          }, 3500);
        }
      });
    }, 700);
  }

  // 关闭gif回归界面
  function closeItemGif(itemName) {
    const cfg = s6ItemConfigs[itemName];
    if (!cfg) return;
    cfg.audio.pause();
    cfg.audio.currentTime = 0;

    gsap.to(s6GifContainer, { opacity: 0, scale: 0.5, duration: 0.5, ease: "power2.in" });
    gsap.to(s6Overlay, { background: 'rgba(0,0,0,0)', duration: 0.5, ease: "power2.out", delay: 0.3 });

    setTimeout(() => {
      gsap.to([s6ItemCape, s6ItemDoor, s6ItemWheel], { opacity: 0, scale: 0, rotate: -180, y: -80, duration: 0.7, ease: "power2.in" });
      gsap.to([s6LabelCape, s6LabelDoor, s6LabelWheel], { opacity: 0, scale: 0, rotate: 180, y: -60, duration: 0.7, ease: "power2.in" });
      gsap.to(s6MagicKey, { opacity: 0, scale: 0, duration: 0.5, ease: "power2.in" });
      gsap.to(s6Bubble, { opacity: 0, duration: 0.3, ease: "power2.in" });

      setTimeout(() => {
        gsap.to(s6Person, { opacity: 0, duration: 0.3, ease: "power2.in" });
        gsap.fromTo(cfg.personSelected, { opacity: 0, scale: 0.8, filter: 'brightness(2)' }, { opacity: 1, scale: 1.15, filter: 'brightness(1)', duration: 0.7, ease: "back.out(1.3)" });
        gsap.fromTo(cfg.bubble, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "bounce.out", delay: 0.4 });
        // 提示词：跟魔法键一致的缩放弹出+光晕动效
        gsap.fromTo(cfg.tooltip, { opacity: 0, scale: 0, filter: 'drop-shadow(0 0 30px rgba(255,200,80,0))' }, {
          opacity: 1, scale: 1, filter: 'drop-shadow(0 0 30px rgba(255,200,80,0.8))', duration: 0.6, ease: "back.out(2)", delay: 0.8, onComplete: () => {
            cfg.tooltip.style.pointerEvents = 'auto';
            gsap.to(cfg.tooltip, { filter: 'drop-shadow(0 0 10px rgba(255,200,80,0.2))', duration: 0.8, ease: "power2.out" });
            // 上滑提示渐入
            gsap.to(s6SwipeHint, {
              opacity: 1, duration: 0.5, ease: "power2.out", delay: 0.2, onComplete: () => {
                canSwipeToScene7 = true;
              }
            });
          }
        });
      }, 500);
    }, 300);
  }

  s6ItemCape.addEventListener('click', () => selectItem('cape'));
  s6LabelCape.addEventListener('click', () => selectItem('cape'));
  s6ItemDoor.addEventListener('click', () => selectItem('door'));
  s6LabelDoor.addEventListener('click', () => selectItem('door'));
  s6ItemWheel.addEventListener('click', () => selectItem('wheel'));
  s6LabelWheel.addEventListener('click', () => selectItem('wheel'));

  // 点击gif也可以手动退出
  s6GifContainer.addEventListener('click', () => {
    if (s6ItemChosen) closeItemGif(s6ItemChosen);
  });

  // ==================== 界面6 → 界面7 上滑转场 + 粒子拼图 ====================
  let s6TouchStartY = 0, s6MouseDown3 = false, s6MouseStartY3 = 0;

  scene6.addEventListener('touchstart', (e) => {
    s6TouchStartY = e.touches[0].clientY;
  }, { passive: true });

  scene6.addEventListener('touchend', (e) => {
    if (!canSwipeToScene7 || isAtScene7) return;
    if (s6TouchStartY - e.changedTouches[0].clientY > 80) goToScene7();
  }, { passive: true });

  scene6.addEventListener('mousedown', (e) => {
    s6MouseStartY3 = e.clientY;
    s6MouseDown3 = true;
  });

  scene6.addEventListener('mouseup', (e) => {
    if (!canSwipeToScene7 || isAtScene7 || !s6MouseDown3) return;
    if (s6MouseStartY3 - e.clientY > 80) goToScene7();
    s6MouseDown3 = false;
  });

  scene6.addEventListener('mouseleave', () => { s6MouseDown3 = false; });

  function goToScene7() {
    if (isAtScene7) return;
    isAtScene7 = true;

    gsap.to(scene6, {
      y: -100, opacity: 0, duration: 0.6, ease: "power2.inOut", onComplete: () => {
        scene6.style.pointerEvents = 'none';
      }
    });
    gsap.to(scene7, {
      opacity: 1, duration: 0.4, ease: "power2.out", onComplete: () => {
        scene7.style.pointerEvents = 'auto';
        startPuzzle();
      }
    });
  }

  function startPuzzle() {
    const s7Puzzle = document.getElementById('s7-puzzle');
    const s7Bg = document.getElementById('s7-bg');
    const s7Content = document.getElementById('s7-content');
    const bgUrl = 'images/界面7/背景图.png';
    const cols = 5, rows = 8;
    const w = scene7.clientWidth, h = scene7.clientHeight;
    const tw = w / cols, th = h / rows;
    const tiles = [];

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const tile = document.createElement('div');
        tile.className = 's7-tile';
        tile.style.width = tw + 'px';
        tile.style.height = th + 'px';
        tile.style.backgroundImage = `url(${bgUrl})`;
        tile.style.backgroundSize = `${w}px ${h}px`;
        tile.style.backgroundPosition = `-${c * tw}px -${r * th}px`;
        s7Puzzle.appendChild(tile);

        const angle = Math.random() * Math.PI * 2;
        const dist = 300 + Math.random() * 600;
        gsap.set(tile, {
          left: c * tw, top: r * th,
          x: Math.cos(angle) * dist, y: Math.sin(angle) * dist,
          rotation: (Math.random() - 0.5) * 360, scale: 0, opacity: 0
        });
        tiles.push(tile);
      }
    }

    // 碎片飞入拼合
    gsap.to(tiles, {
      x: 0, y: 0, rotation: 0, scale: 1, opacity: 1,
      duration: 1.2, stagger: { each: 0.025, from: "random" }, ease: "back.out(1.5)",
      onComplete: () => {
        // 溶解拼图，显露真实背景
        gsap.to(tiles, {
          opacity: 0, duration: 0.3, ease: "power2.in", onComplete: () => {
            s7Puzzle.innerHTML = '';
          }
        });
        gsap.to(s7Bg, { opacity: 1, duration: 0.5, ease: "power2.out" });
        // 内容元素逐个上浮淡入
        gsap.to(s7Content, {
          opacity: 1, duration: 0.3, ease: "power2.out", delay: 0.3, onComplete: () => {
            s7Content.style.pointerEvents = 'auto';
          }
        });
        gsap.fromTo(s7Content.children, { opacity: 0, y: 30 }, {
          opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "power2.out", delay: 0.5,
          onComplete: () => startProgress()
        });
      }
    });
  }

  function startProgress() {
    const fill = document.getElementById('progress-fill');
    const text = document.getElementById('progress-text');
    if (!fill || !text) return;

    const obj = { val: 0 };
    gsap.to(obj, {
      val: 100,
      duration: 5,
      ease: "power1.inOut",
      onUpdate: () => {
        const v = Math.round(obj.val);
        fill.style.width = v + '%';
        text.textContent = v + '%';
      },
      onComplete: () => {
        setTimeout(() => goToScene8(), 600);
      }
    });
  }

  // ==================== 界面7 → 界面8 双手递呈卷轴 ====================
  function determineReport(q1, q2, q3, q4, q5) {
    if (q4 === 'block') return 'A';
    const isD =
      (q1 == 1 && q2 == 3) ||
      (q1 == 2 && q2 == 1 && (q3 == 2 || q3 == 3)) ||
      (q1 == 3 && q2 == 1 && q3 == 2);
    if (isD) return 'D';
    if (q4 === 'shoe') return 'B';
    if (q4 === 'rose') return 'C';
    return 'A';
  }

  let reportType = 'A';

  function goToScene8() {
    // 捕获Q3/Q4/Q5，计算报告类型
    q3Choice = s4OptionChosen;
    q4Choice = s5DragChosen;
    q5Choice = s6ItemChosen;
    reportType = determineReport(q1Choice, q2Choice, q3Choice, q4Choice, q5Choice);

    // 动态切换报告图和保存键
    const reportImg = document.getElementById('s8-report-img');
    const saveImg = document.getElementById('s8-save-img');
    const nameEl = document.getElementById('s8-name');
    if (reportImg) reportImg.src = `images/界面8/报告${reportType}.png`;
    if (saveImg) saveImg.src = `images/界面8/报告${reportType}保存图片键.png`;
    // 根据报告类型设置名字层的 class，便于分别调位置
    if (nameEl) {
      nameEl.className = 's8-name s8-name-' + reportType;
    }

    // 界面7淡出
    gsap.to(scene7, {
      opacity: 0, duration: 0.5, ease: "power2.in", onComplete: () => {
        scene7.style.pointerEvents = 'none';
      }
    });
    // 界面8暗场浮现
    gsap.to(scene8, {
      opacity: 1, duration: 0.6, ease: "power2.out", onComplete: () => {
        scene8.style.pointerEvents = 'auto';
        startScrollCeremony();
      }
    });
  }

  function startScrollCeremony() {
    const hands = document.getElementById('s8-hands');
    const scroll = document.getElementById('s8-scroll');
    const scrollInner = document.getElementById('s8-scroll-inner');
    const saveBtn = document.getElementById('s8-save');

    // 1. 双手从底部升起，托着卷轴一同出现
    gsap.to(hands, { opacity: 1, bottom: '10%', duration: 1.2, ease: "power2.out" });
    gsap.to(scroll, {
      opacity: 1, y: -20, duration: 1.2, ease: "power2.out", delay: 0.3,
      onComplete: () => {
        // 2. 光爆粒子
        spawnS8Particles();

        // 3. 卷轴从顶部向下展开
        gsap.to(scrollInner, {
          clipPath: 'inset(0 0 0% 0)',
          duration: 1.4,
          ease: "power2.inOut",
          delay: 0.3,
          onComplete: () => {
            // 4. 双手化作光点消散
            gsap.to(hands, { opacity: 0, bottom: '20%', duration: 0.8, ease: "power2.in" });
            // 5. 用户名一笔一划写出
            if (userName) setTimeout(() => animateNameWriting(userName), 400);
            // 6. 保存键淡入
            gsap.to(saveBtn, {
              opacity: 1, duration: 0.5, ease: "power2.out", delay: 0.6, onComplete: () => {
                saveBtn.style.pointerEvents = 'auto';
              }
            });
            // 保存键点击：合成图片保存
            saveBtn.addEventListener('click', saveReport);
          }
        });
      }
    });
  }

  function saveReport() {
    const reportImg = document.getElementById('s8-report-img');
    const nameEl = document.getElementById('s8-name');
    if (!reportImg || !userName) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const natW = reportImg.naturalWidth;
    const natH = reportImg.naturalHeight;
    canvas.width = natW;
    canvas.height = natH;

    // 绘制报告图
    ctx.drawImage(reportImg, 0, 0, natW, natH);

    // 计算名字在原图上的像素位置
    const imgRect = reportImg.getBoundingClientRect();
    const nameRect = nameEl.getBoundingClientRect();
    const scaleX = natW / imgRect.width;
    const scaleY = natH / imgRect.height;
    const nameCX = (nameRect.left + nameRect.width / 2 - imgRect.left) * scaleX;
    const nameCY = (nameRect.top + nameRect.height / 2 - imgRect.top) * scaleY;

    // 手写字体绘名字
    // 取 SVG text 的屏幕实际高度来定 Canvas 字号
    const svgText = nameEl.querySelector('text');
    const realFontSize = svgText ? svgText.getBoundingClientRect().height * scaleY : 33 * scaleX;

    ctx.font = `${Math.round(realFontSize)}px 'Ma Shan Zheng', 'STXingkai', 'KaiTi', cursive`;
    ctx.fillStyle = '#3a2010';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(userName, nameCX, nameCY);

    // 导出并触发下载
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `疗愈报告_${userName}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    }, 'image/png');
  }

  function animateNameWriting(name) {
    const container = document.getElementById('s8-name');
    if (!container || !name) return;
    container.innerHTML = '';

    const svgns = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgns, 'svg');
    const text = document.createElementNS(svgns, 'text');

    const fontSize = 36;
    text.textContent = name;
    text.setAttribute('x', '50%');
    text.setAttribute('y', '50%');
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('dominant-baseline', 'central');
    text.setAttribute('font-size', fontSize);
    text.setAttribute('stroke', '#4a3020');
    text.setAttribute('stroke-width', '1.2');
    text.setAttribute('fill', 'none');
    text.setAttribute('stroke-linecap', 'round');
    text.setAttribute('stroke-linejoin', 'round');
    text.setAttribute('opacity', '0.9');

    svg.appendChild(text);
    // SVG 尺寸给足余量
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', (fontSize * 2) + 'px');
    svg.setAttribute('viewBox', '0 0 300 ' + (fontSize * 2));
    container.appendChild(svg);

    // 等 DOM 挂载后取文字长度
    requestAnimationFrame(() => {
      const length = text.getComputedTextLength();
      text.setAttribute('stroke-dasharray', length);
      text.setAttribute('stroke-dashoffset', length);

      // 描边写出
      gsap.to(text, {
        strokeDashoffset: 0,
        duration: Math.max(length / 50, 1.5),
        ease: "power2.out",
        onComplete: () => {
          // 填充渐变显现
          text.setAttribute('fill', '#3a2010');
          gsap.fromTo(text, { opacity: 0.7 }, { opacity: 1, duration: 0.4, ease: "power2.out" });
        }
      });
    });
  }

  function spawnS8Particles() {
    const container = document.getElementById('s8-particles');
    container.innerHTML = '';
    const count = 35;
    for (let i = 0; i < count; i++) {
      const dot = document.createElement('div');
      dot.className = 's8-particle';
      dot.style.left = (30 + Math.random() * 40) + '%';
      dot.style.top = (55 + Math.random() * 30) + '%';
      container.appendChild(dot);

      const angle = Math.random() * Math.PI * 2;
      const dist = 60 + Math.random() * 140;
      gsap.fromTo(dot,
        { x: 0, y: 0, scale: 1.5, opacity: 1 },
        {
          x: Math.cos(angle) * dist, y: Math.sin(angle) * dist - 40, scale: 0, opacity: 0,
          duration: 0.9 + Math.random() * 0.6, ease: "power2.out"
        }
      );
    }
  }

  // ==================== 全局背景音乐控制 ====================
  const bgmAudio = new Audio('images/界面1/背景音乐.MP3');
  bgmAudio.loop = true;
  bgmAudio.volume = 0.5;
  const bgmBtn = document.getElementById('bgm-btn');
  let bgmPlaying = true;
  let bgmStarted = false;

  // 进入页面立即尝试播放
  function startBgm() {
    if (bgmStarted) return;
    bgmAudio.play().then(() => {
      bgmStarted = true;
      bgmPlaying = true;
      bgmBtn.classList.remove('muted');
    }).catch(() => {
      // 浏览器拦截了自动播放，等用户首次点击
      document.addEventListener('click', startBgm, { once: true });
      document.addEventListener('touchstart', startBgm, { once: true });
    });
  }
  startBgm();

  // 按钮切换静音
  bgmBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (!bgmStarted) {
      startBgm();
      return;
    }
    if (bgmPlaying) {
      bgmAudio.pause();
      bgmPlaying = false;
      bgmBtn.classList.add('muted');
    } else {
      bgmAudio.play().catch(() => {});
      bgmPlaying = true;
      bgmBtn.classList.remove('muted');
    }
  });
});