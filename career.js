(function () {
  'use strict';
  const data = window.PORTFOLIO;
  const copy = {
    zh: {
      title: '钟颍杉 Cynthia | 创意策划 · 产品运营 · 市场营销',
      description: '钟颍杉 Cynthia 的创意策划、产品运营与市场营销实习求职作品集。研0，已保研至华东师范大学设计学院。',
      skip: '跳至正文', navWork: '实践精选', navExperience: '实习经历', navAbout: '关于我', navContact: '联系',
      status: '研0 · 实习求职中',
      heroTitle: '把想法，<br>变成<span class="blue-word">好内容<svg viewBox="0 0 360 22" aria-hidden="true"><path d="M4 13C84 2 231 3 351 12M17 19C152 13 245 11 336 18"/></svg></span>。',
      roles: '创意策划岗位 / 产品运营岗位 / 市场营销岗位',
      heroIntro: '有设计的视角，也有内容与传播的实践。\n从用户洞察、创意脚本到视觉制作与执行，让想法一步步成形。',
      viewWork: '看我的实践', getInTouch: '聊聊实习机会', incoming: '已保研至华东师范大学设计学院', educationBase: '北京工业大学 · 建筑学五年制背景',
      boardAction: '把想法\n往前推一步。', boardCaption: '观察 · 策划 · 制作 · 迭代', heroBottom: '一点好奇心，一些执行力。',
      workEyebrow: '01 / 实践精选', workTitle: '从一个想法，<br>到具体的工作。', workIntro: '三段与创意、内容和传播直接相关的实习实践。了解我参与了什么，以及如何把需求推进成内容。',
      experienceEyebrow: '02 / 实习经历', experienceTitle: '在真实项目里，积累手感。', experienceIntro: '经历横跨 AI 内容产品、海外广告、社交媒体与视频制作，熟悉从需求梳理到内容执行的协作过程。', otherExperience: '其他设计实践 · 北京市建筑设计研究院',
      aboutEyebrow: '04 / 关于我', aboutIdentity: '设计背景 / 内容实践 / 持续好奇', aboutTitle: '用设计的眼睛观察，<br>用内容与人沟通。', aboutDescription: '五年建筑学训练让我习惯从复杂信息中梳理逻辑，也培养了视觉表达与审美判断。在创意、内容与运营实习中，我把这些能力延伸到用户研究、创意脚本、图文视频制作和项目协作。',
      nextLabel: '下一站 / 研0', educationLabel: '教育背景', schoolNext: '华东师范大学 · 设计', admission: '已保研，待入学', schoolBase: '北京工业大学 · 建筑学', undergraduateMeta: '2022–2027 / 五年制 · 北京', academic: '专业排名 4/49 · GPA 3.97/4 · 英语六级 525', skillsTitle: '我可以参与的工作',
      visualEyebrow: '03 / 空间与视觉作品', visualTitle: '另一种表达方式。', visualIntro: '本科阶段的四个个人设计项目，记录我的研究方法、视觉组织与叙事表达。点击查看完整图面。', honorsTitle: '竞赛与荣誉',
      contactEyebrow: '06 / LET’S TALK', contactStatus: '正在寻找实习机会', contactTitle: '下一个好点子，<br><em>一起实现。</em><span aria-hidden="true">↗</span>', emailLabel: '邮箱', phoneLabel: '电话', wechatLabel: '微信', backTop: '回到顶部 ↑',
      caseButton: '查看工作内容', caseWork: '我参与的工作', caseContact: '联系我聊聊这个方向', close: '关闭详情', copySuccess: '微信号已复制：Cynthia1534', copyFallback: '微信号：Cynthia1534，可长按或选中复制。', personalProject: '本科个人项目',
      shortCompanies: {0:'北京市建筑设计研究院',1:'蓝色光标',2:'飞书深诺',3:'天下秀',4:'乐视'},
      skills: [
        '熟练使用 **ChatGPT / Codex、Gemini / Antigravity** 等前沿生成式 AI 工具，具备 **AI Agent 与 MCP 工作流应用能力**；能够将 AI Agent 应用于资料检索与分析、设计研究、方案推演、参数化辅助、代码与脚本生成、软件操作、模型处理、图像生成与编辑、文本及汇报材料整理等任务，并根据设计需求组合不同模型与工具构建自动化工作流，提升建筑设计全过程的效率与迭代能力。',
        '具备较强的视觉设计与新媒体制作能力，熟练运用 **PS、AI** 等设计软件进行**海报及视觉物料设计**，具有良好的设计感与审美能力；熟练掌握**剪映、PR、AE**等视频剪辑工具，能够独立完成**视频脚本策划、素材剪辑及场景调色**工作；具备动态歌词排版、LUT 色链制作等视频视觉效果处理能力，能够完成**从创意构思到成片输出**的完整流程。',
        '具备扎实的建筑数字化设计能力，熟练运用 **AutoCAD、SketchUp、Rhino、Revit** 等建筑设计与建模软件，能够完成**二维制图、三维建模、空间推演及建筑场景搭建**。熟练掌握 **Grasshopper** 参数化设计工具，具备参数逻辑构建、形体生成、立面优化及方案快速迭代能力。熟练运用 **Twinmotion** 等建筑可视化软件，能够完成材质表现、灯光调节、场景搭建及建筑效果图制作，具备从设计推演到视觉呈现的完整实践能力。'
      ],
      cases: [
        {source:1,company:'蓝色光标',title:'让 AI 视频，从创意走向可用',description:'围绕年会、电商与数字人场景，参与视频内容策划、模板设计、提示词撰写和生成效果测试。',tags:['内容策划','AI 视频','测试迭代'],overview:'在 AI 视频生成类产品中，将创意构思转化为模板、分镜与可替换字段，并根据生成效果进行测试和优化。'},
        {source:2,company:'飞书深诺',title:'把创意需求，推进到执行',description:'在海外广告项目中协助创意 PM，串联需求梳理、脚本撰写、进度跟进与素材质量检查。',tags:['创意脚本','海外广告','项目协作'],overview:'围绕海外广告项目，参与从需求到执行的协作链路，结合市场趋势与监测数据反馈支持创意内容的调整。'},
        {source:3,company:'天下秀',title:'让内容，贴近账号与用户',description:'负责三个小红书账号的内容运营，并参与公众号内容输出、视觉制作与投流策略执行。',tags:['新媒体运营','图文内容','投流策略'],overview:'根据平台热点、账号调性和用户偏好组织图文内容与发布时间，同时参与公众号运营及跨部门沟通。'}
      ]
    },
    en: {
      title: 'Cynthia Zhong | Creative Planning · Product Operations · Marketing',
      description: 'Creative planning, product operations and marketing internship portfolio of Cynthia Zhong. Incoming postgraduate at the School of Design, East China Normal University.',
      skip:'Skip to content',navWork:'Selected work',navExperience:'Experience',navAbout:'About',navContact:'Contact',status:'Incoming postgraduate · Seeking internships',
      heroTitle:'Good ideas.<br><span class="blue-word">Great content<svg viewBox="0 0 360 22" aria-hidden="true"><path d="M4 13C84 2 231 3 351 12M17 19C152 13 245 11 336 18"/></svg></span>.',
      roles:'Creative Planning / Product Operations / Marketing',heroIntro:'A design perspective, with hands-on content experience.\nFrom audience research and scripts to visual production, I help ideas take shape.',viewWork:'Explore my work',getInTouch:'Let’s talk',incoming:'Admitted to the School of Design, East China Normal University',educationBase:'Five-year architecture background · BJUT',boardAction:'Take the idea\none step further.',boardCaption:'OBSERVE · PLAN · MAKE · ITERATE',heroBottom:'A curious mind. A practical approach.',
      workEyebrow:'01 / SELECTED PRACTICE',workTitle:'From the first idea<br>to the work itself.',workIntro:'Three internships at the intersection of creativity, content and communication. A closer look at my responsibilities and working process.',
      experienceEyebrow:'02 / EXPERIENCE',experienceTitle:'Learning through real projects.',experienceIntro:'Experience across AI content products, overseas advertising, social media and video production, from understanding a brief to coordinating execution.',otherExperience:'Additional design experience · BIAD',
      aboutEyebrow:'04 / ABOUT ME',aboutIdentity:'DESIGN BACKGROUND / CONTENT PRACTICE / CURIOSITY',aboutTitle:'Observe through design.<br>Connect through content.',aboutDescription:'Five years of architectural training shaped how I organize complex information and make visual decisions. Through creative and content internships, I have applied that perspective to audience research, scripts, visual production and project coordination.',nextLabel:'NEXT CHAPTER',educationLabel:'BACKGROUND',schoolNext:'East China Normal University · Design',admission:'Admitted via recommendation · Awaiting enrolment',schoolBase:'Beijing University of Technology · Architecture',undergraduateMeta:'2022–2027 / Five-year programme · Beijing',academic:'Rank 4/49 · GPA 3.97/4 · CET-6 525',skillsTitle:'What I can contribute',
      visualEyebrow:'03 / SPATIAL & VISUAL WORK',visualTitle:'Another way to tell a story.',visualIntro:'Four individual undergraduate design projects, showing research, visual organization and spatial storytelling. Open each project to view the complete drawings.',honorsTitle:'Competitions & honors',
      contactEyebrow:'06 / LET’S TALK',contactStatus:'Seeking internship opportunities',contactTitle:'The next good idea?<br><em>Let’s make it happen.</em><span aria-hidden="true">↗</span>',emailLabel:'Email',phoneLabel:'Phone',wechatLabel:'WeChat',backTop:'Back to top ↑',caseButton:'Explore my contribution',caseWork:'What I worked on',caseContact:'Get in touch',close:'Close details',copySuccess:'WeChat ID copied: Cynthia1534',copyFallback:'WeChat ID: Cynthia1534. Select the text to copy it.',personalProject:'Individual academic project',
      shortCompanies:{0:'BIAD',1:'BlueFocus',2:'MeetSocial',3:'Inmyshow',4:'Le.com'},
      skills:[
        'Proficient with generative AI tools including **ChatGPT / Codex and Gemini / Antigravity**, with experience applying **AI Agent and MCP workflows**. I use AI agents for research and analysis, design research, concept development, parametric support, code and script generation, software tasks, model processing, image generation and editing, and writing and presentation materials. I combine models and tools into automated workflows to improve efficiency and iteration throughout architectural design.',
        'Strong visual design and new media production skills. I use **Photoshop and Illustrator** to create **posters and visual assets**, with a strong eye for design and aesthetics. With **Jianying, Premiere Pro and After Effects**, I can independently handle **video scripting, editing and colour grading**. I also work with kinetic typography and LUT colour workflows, covering the **full process from concept to final video**.',
        'A solid foundation in digital architectural design. I use **AutoCAD, SketchUp, Rhino and Revit** for **2D drafting, 3D modelling, spatial studies and architectural scene building**. With **Grasshopper**, I can build parametric logic, generate forms, refine facades and iterate designs quickly. I use **Twinmotion** for materials, lighting, scenes and architectural visualisations, connecting design exploration with visual presentation.'
      ],
      cases:[
        {source:1,company:'BlueFocus',title:'From AI concepts to usable video',description:'Content planning, templates, prompts and output testing for event, e-commerce and digital-human video products.',tags:['Content planning','AI video','Iteration'],overview:'Translated creative ideas into video templates, storyboards and replaceable fields, then tested and refined generated outputs.'},
        {source:2,company:'MeetSocial',title:'Moving a creative brief forward',description:'Supported creative PMs on overseas advertising projects through scripts, requirement tracking, schedules and asset QC.',tags:['Creative scripts','Advertising','Coordination'],overview:'Contributed across the project workflow, using market trends and monitoring feedback to support creative content development and execution.'},
        {source:3,company:'Inmyshow',title:'Content shaped around its audience',description:'Operated three Xiaohongshu accounts and supported WeChat content, visual production and media strategy execution.',tags:['Social media','Editorial content','Media strategy'],overview:'Organized content and publishing schedules around platform trends, account identity and audience preferences, while supporting WeChat operations and cross-team coordination.'}
      ]
    }
  };
  Object.assign(copy.zh, {
    navAbout:'专业技能',navPortfolio:'作品集',profileAdmission:'已保研 · 2027.9 入学 · 上海',graduateTier:'985 高校',undergraduateTier:'211 高校',profileExperience:'查看实习经历',profilePortfolio:'查看作品集',strengthsLabel:'个人特长',intentLabel:'求职意向',
    strength1Title:'AI智能创作与数字化设计',strength1Body:'具备较强的 AI 工具应用能力，熟练运用 ChatGPT、Gemini、Stable Diffusion 等辅助创意生成、内容优化与设计探索，能够结合 AI 技术提升创作效率与设计创新能力。',
    strength2Title:'创意策划与视觉表达',strength2Body:'具备良好的设计审美与创意策划能力，熟练运用 Photoshop、Illustrator、InDesign、Premiere 等设计与制作软件，能够完成从创意构思、视觉设计到图文排版、视频制作的完整流程。',
    strength3Title:'三维建模与计算性设计',strength3Body:'具备数字化设计能力，熟练掌握 Rhino、Grasshopper 等三维建模与参数化设计工具，能够进行模型构建、形态生成、参数逻辑搭建及方案快速迭代。',
    strength4Title:'跨领域学习与创新能力',strength4Body:'持续关注人工智能、数字技术与设计领域的发展，具备快速学习新工具、新方法的能力，能够将技术应用于实际项目并推动创新实践。',
    experienceEyebrow:'02 / 实习经历',experienceTitle:'实习经历',visualEyebrow:'03 / 作品集',visualTitle:'空间与视觉作品',aboutEyebrow:'04 / 专业技能',skillsTitle:'专业技能',contactEyebrow:'06 / 联系',contactTitle:'联系我<span aria-hidden="true">↗</span>'
  });
  Object.assign(copy.en, {
    navAbout:'Skills',navPortfolio:'Portfolio',profileAdmission:'Admitted via recommendation · Entry Sep 2027 · Shanghai',graduateTier:'Project 985 university',undergraduateTier:'Project 211 university',profileExperience:'View experience',profilePortfolio:'View portfolio',strengthsLabel:'CORE STRENGTHS',intentLabel:'SEEKING INTERNSHIPS IN',
    strength1Title:'AI creation & digital design',strength1Body:'Skilled in using ChatGPT, Gemini and Stable Diffusion to support idea generation, content refinement and design exploration, applying AI to improve creative efficiency and design innovation.',
    strength2Title:'Creative planning & visual communication',strength2Body:'Strong design sensibility and creative planning skills. Proficient in Photoshop, Illustrator, InDesign and Premiere, covering the full process from ideation and visual design to editorial layout and video production.',
    strength3Title:'3D modeling & computational design',strength3Body:'Skilled in Rhino, Grasshopper and other 3D and parametric design tools for model building, form generation, parametric logic and rapid design iteration.',
    strength4Title:'Cross-disciplinary learning & innovation',strength4Body:'Follow developments in AI, digital technology and design, learn new tools and methods quickly, and apply them to practical projects and innovative work.',
    experienceEyebrow:'02 / EXPERIENCE',experienceTitle:'Internship experience',visualEyebrow:'03 / PORTFOLIO',visualTitle:'Spatial & visual work',aboutEyebrow:'04 / SKILLS',skillsTitle:'Professional skills',contactEyebrow:'06 / CONTACT',contactTitle:'Get in touch<span aria-hidden="true">↗</span>'
  });
  Object.assign(copy.zh, {visualTitle:'作品集',visualIntro:'视频剪辑、动态歌词排版与空间设计作品。',videoHeading:'视频剪辑',spatialHeading:'空间与视觉设计'});
  Object.assign(copy.en, {visualTitle:'Portfolio',visualIntro:'Video editing, kinetic typography and spatial design projects.',videoHeading:'Video editing',spatialHeading:'Spatial & visual design'});
  const videoWorks = [{"zh": "大宋少年志2", "en": "Young Blood 2", "typeZh": "群像剪辑 · 台词向", "typeEn": "Ensemble edit · Dialogue", "url": "https://www.bilibili.com/video/BV14z4y137NC/", "platform": "Bilibili", "poster": "assets/video-works/covers-top.jpg", "position": "left"}, {"zh": "现在拨打的电话", "en": "When the Phone Rings", "typeZh": "剧情剪辑 · 双声道", "typeEn": "Drama edit · Dual-channel audio", "url": "https://www.bilibili.com/video/BV1SucJeaE1d/", "platform": "Bilibili", "poster": "assets/video-works/covers-top.jpg", "position": "center"}, {"zh": "与恶魔有约", "en": "My Demon", "typeZh": "剧情剪辑 · 完结纪念", "typeEn": "Drama edit · Finale tribute", "url": "https://www.bilibili.com/video/BV1NN4y1J7FS/", "platform": "Bilibili", "poster": "assets/video-works/covers-top.jpg", "position": "right"}, {"zh": "REBIRTH", "en": "REBIRTH", "typeZh": "《财阀家的小儿子》人物剪辑", "typeEn": "Reborn Rich · Character edit", "url": "https://www.bilibili.com/video/BV1xA411S7S3/", "platform": "Bilibili", "poster": "assets/video-works/covers-bottom.png", "position": "left"}, {"zh": "庆余年2", "en": "Joy of Life 2", "typeZh": "短频快剪", "typeEn": "Short-form edit", "url": "https://v.douyin.com/iMJ5K9Nf/", "platform": "Douyin", "poster": "assets/video-works/covers-bottom.png", "position": "center"}, {"zh": "你不知道的事", "en": "Things You Don’t Know", "typeZh": "动态歌词排版", "typeEn": "Kinetic typography", "url": "https://www.bilibili.com/video/BV1FK421e74W/", "platform": "Bilibili", "poster": "assets/video-works/covers-bottom.png", "position": "right"}];
  Object.assign(copy.zh, {badgeRoles:'创意策划岗位\n产品运营岗位\n市场营销岗位',badgeUndergraduate:'本科',badgeUndergradMeta:'2022–2027 · 五年制 · 北京·211',badgeEducation:'硕士',badgeAdmission:'已保研 · 2027.9入学 · 上海·985',badgeSchool:'华东师范大学 · 设计',badgeDate:'已保研 / 2027.09 入学',badgeHelp:'点击轻晃 · 拖动回弹 · Enter 晃动 / Esc 复位'});
  Object.assign(copy.en, {badgeRoles:'Creative planning\nProduct operations\nMarketing',badgeUndergraduate:'UNDERGRADUATE',badgeUndergradMeta:'2022–27 · 5 years · Beijing · 211',badgeEducation:'MASTER’S',badgeAdmission:'Admitted · Sep 2027 · Shanghai · 985',badgeSchool:'ECNU · Design',badgeDate:'Admitted / Entry Sep 2027',badgeHelp:'Click to sway · Drag & release · Enter to sway / Esc to reset'});
  Object.assign(copy.en, {schoolBaseShort:'BJUT · Architecture',schoolNextShort:'ECNU · Design'});
  Object.assign(copy.zh, {orbitSkills:'专业技能',orbitPortfolio:'作品集',orbitExperience:'实习经历',orbitContact:'联系我',orbitProfile:'个人信息'});
  Object.assign(copy.en, {orbitSkills:'Skills',orbitPortfolio:'Portfolio',orbitExperience:'Experience',orbitContact:'Contact',orbitProfile:'Personal info'});
  Object.assign(copy.zh, {
    honorsTitle:'所获荣誉',
    honorsEyebrow:'05 / 所获荣誉',
    skillHeadings:['生成式 AI 与工作流','视觉设计与视频制作','建筑数字化与参数化设计'],
    honors:[
      '英语**四级548**  英语**六级525**',
      '“米兰设计周”非命题赛场**一等奖**',
      '在**产品训练营**中荣获“**最佳创意**”奖',
      '亚洲设计学年奖**优秀奖**',
      '**校级**学习优秀奖学金',
      '国家**二级**运动员',
      '中国大学生文化创意设计大赛**一等奖**',
      'NCDA未来设计师竞赛非命题赛道**二等奖**',
      '“华夏奖”文化艺术设计大赛**金奖**',
      '全国大学生学术英语词汇竞赛**二等奖**',
      'UAD全国大学生城市设计大赛**二等奖**',
      '北京市居家适老化改造设计创新大赛**三等奖**'
    ]
  });
  Object.assign(copy.en, {
    honorsTitle:'Honors',
    honorsEyebrow:'05 / HONORS',
    skillHeadings:['Generative AI & workflows','Visual design & video production','Digital architecture & parametric design'],
    honors:[
      'CET-4 **548** · CET-6 **525**',
      'Milan Design Week Non-Theme Category · **First Prize**',
      'Product Training Camp · **Best Creative Idea Award**',
      'Asian Design Award · **Excellence Award**',
      '**University Academic Excellence Scholarship**',
      'National **Level II Athlete**',
      'China Student Cultural Creative Design Competition · **First Prize**',
      'NCDA Future Designer Competition, Open Category · **Second Prize**',
      'Huaxia Award Cultural Art Design Competition · **Gold Award**',
      'National Academic English Vocabulary Competition · **Second Prize**',
      'UAD National Student Urban Design Competition · **Second Prize**',
      'Beijing Age-Friendly Home Design Innovation Competition · **Third Prize**'
    ]
  });
  let lang='zh';
  try { if(localStorage.getItem('portfolio-language')==='en') lang='en'; } catch (_) {}
  const esc=(value)=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
  const emphasis=(value)=>esc(value).replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>');
  const tags=(values)=>'<div class="case-tags">'+values.map(v=>'<span>'+esc(v)+'</span>').join('')+'</div>';
  const period=(item)=>lang==='en'&&item.periodEn?item.periodEn:item.period;
  function experienceBody(item) {
    const local=item[lang];
    return '<div class="experience-body"><p class="experience-body-label">'+(lang==='zh'?'具体工作':'In detail')+'</p>'+local.details.map(p=>'<p>'+esc(p)+'</p>').join('')+'</div>';
  }
  function render() {
    const t=copy[lang];
    document.documentElement.lang=lang==='zh'?'zh-CN':'en';
    document.body.classList.toggle('en',lang==='en');
    document.title=t.title;
    document.querySelector('meta[name="description"]').content=t.description;
    document.querySelectorAll('[data-copy]').forEach(el=>{el.textContent=t[el.dataset.copy]||'';});
    document.querySelectorAll('[data-copy-html]').forEach(el=>{el.innerHTML=t[el.dataset.copyHtml]||'';});
    const toggle=document.querySelector('.language-toggle');
    toggle.innerHTML=(lang==='zh'?'EN':'中')+' <span aria-hidden="true">↗</span>';
    toggle.setAttribute('aria-label',lang==='zh'?'Switch to English':'切换为中文');
    document.getElementById('copyFeedback').textContent='';
    document.querySelectorAll('[data-copy-contact]').forEach(button=>{
      const key=button.dataset.copyContact;
      const label=key==='wechat'?t.wechatLabel:t[key+'Label'];
      button.setAttribute('aria-label',(lang==='zh'?'复制'+label+'：':'Copy '+label+': ')+contactValues[key]);
    });
    document.getElementById('experienceList').innerHTML=data.experiences.map((item,i)=>i).sort((a,b)=>data.experiences[b].period.localeCompare(data.experiences[a].period)).map(i=>{
      const item=data.experiences[i],local=item[lang];
      return '<details class="experience-row"><summary><span class="experience-topline"><span class="period">'+esc(period(item))+'</span><span class="experience-index">0'+(i+1)+'</span></span><span class="company">'+esc(local.company)+'</span><span class="role">'+esc(local.role)+'</span><span class="experience-summary">'+esc(local.summary||local.detail)+'</span>'+tags(local.highlights||[])+'<span class="experience-view"><span class="view-closed">'+(lang==='zh'?'查看详情':'View details')+'</span><span class="view-open">'+(lang==='zh'?'收起详情':'Hide details')+'</span><span class="experience-view-icon" aria-hidden="true">↗</span></span></summary>'+experienceBody(item)+'</details>';
    }).join('');
    document.getElementById('capabilities').innerHTML=t.skills.map((skill,i)=>'<article class="capability"><span class="cap-number">0'+(i+1)+'</span><div class="capability-copy"><h3>'+esc(t.skillHeadings[i])+'</h3><p>'+emphasis(skill)+'</p></div></article>').join('');
    document.getElementById('videoGrid').innerHTML=videoWorks.map((v,i)=>{
      const title=lang==='zh'?v.zh:v.en;
      const platform=lang==='zh'?(v.platform==='Bilibili'?'B 站':'抖音'):v.platform;
      const linkLabel=lang==='zh'?'在'+platform+'观看':'Watch on '+platform;
      return '<article class="video-work"><span class="video-index">0'+(i+1)+'</span><a class="video-cover" href="'+esc(v.url)+'" target="_blank" rel="noopener noreferrer" aria-label="'+esc(title+' · '+linkLabel)+'"><span class="video-poster" style="background-image:url('+esc(v.poster)+');background-position:'+v.position+' center" role="img" aria-label="'+esc(title)+'"></span><span class="video-platform">'+esc(platform)+' ↗</span></a><div class="video-copy"><div class="video-meta"><span>'+esc(lang==='zh'?v.typeZh:v.typeEn)+'</span></div><h4>'+esc(title)+'</h4><a class="video-source" href="'+esc(v.url)+'" target="_blank" rel="noopener noreferrer">'+esc(linkLabel)+' <span aria-hidden="true">↗</span></a></div></article>';
    }).join('');
    document.getElementById('visualGrid').innerHTML=data.projects.map((p,i)=>'<a class="visual-card" href="'+esc(p.slug)+'"><div class="image-wrap"><img src="'+esc(p.cardCover||p.cover)+'" alt="'+esc(p[lang].title)+'" loading="lazy" width="400" height="300"></div><div class="visual-copy"><div class="visual-label"><span>0'+(i+1)+' / '+esc(t.personalProject)+'</span><span aria-hidden="true">↗</span></div><h3>'+esc(p[lang].title)+'</h3><p class="visual-type">'+esc(p[lang].type)+'</p><span class="visual-open">'+(lang==='zh'?'查看项目':'View project')+' <span aria-hidden="true">↗</span></span></div></a>').join('');
    document.getElementById('honorList').innerHTML=t.honors.map(honor=>'<li>'+emphasis(honor)+'</li>').join('');
  }
  const contactValues={email:'z20031222@163.com',phone:'13552202049',wechat:'Cynthia1534'};
  document.querySelector('.language-toggle').addEventListener('click',()=>{lang=lang==='zh'?'en':'zh';try{localStorage.setItem('portfolio-language',lang);}catch(_){}render();});
  document.querySelectorAll('[data-copy-contact]').forEach(button=>button.addEventListener('click',async()=>{
    const feedback=document.getElementById('copyFeedback');
    const key=button.dataset.copyContact;
    const label=key==='wechat'?copy[lang].wechatLabel:copy[lang][key+'Label'];
    const value=contactValues[key];
    try{await navigator.clipboard.writeText(value);feedback.textContent=lang==='zh'?label+'已复制：'+value:label+' copied: '+value;}
    catch(_){feedback.textContent=lang==='zh'?label+'：'+value+'，可长按或选中复制。':label+': '+value+'. Select the text to copy it.';}
  }));
  render();
})();
