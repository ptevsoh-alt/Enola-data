(() => {
  "use strict";

  const esc = (value) => String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[char]);
  const image = (file, alt) => `<img src="assets/projects/${file}.webp" alt="${alt}" loading="lazy" decoding="async">`;
  const productLines = [
    ["地面清洁", "双盘拖把", "餐区硬地黏污", "中景拍站姿推进与转向，低机位拍双盘接地。"],
    ["电动清洁刷", "长柄电动刷", "浴缸内沿和墙砖接缝", "同一机位看清站位、杆长、刷头角度与接触点。"],
    ["电动清洁刷", "手持清洁刷", "水槽边缘和窄处", "近景拍单手握持，以及刷头如何对准缝隙。"],
    ["无线吸尘", "无线吸尘器", "干屑、宠物毛发与低位灰尘", "低机位拍吸头进入家具下方，再交代拾取结果。"],
    ["烤炉清洁", "烤炉清洁刷", "适用炉篦上的烧烤残渣", "拍清刷头与炉篦的接触位置和操作方式。"],
  ];
  const calendar = [
    [1,"节庆主线","Feed / Carousel · Facebook / Instagram","What is one little thing Dad always does for you","爸爸总为你做的哪件小事，让你一直记得","What is one little thing Dad always does for you? Tell us in the comments.","爸爸总为你做的哪件小事，让你一直记得？欢迎留言说说。"],
    [2,"长柄电动刷","Reel · Facebook / Instagram","Look closer at an everyday cleaning detail","把目光放到一个日常清洁细节","Look closer at an everyday cleaning detail. Explore the long-handle scrubber.","把目光放到一个日常清洁细节。了解 长柄电动刷。"],
    [3,"黄色双盘拖把","Reel · Facebook / Instagram","Start with the floor, and a clear view of the task","从地面开始，先看清要完成的任务","Start with the floor, and a clear view of the task. Explore the dual-head mop.","从地面开始，先看清要完成的任务。了解 双盘拖把。"],
    [4,"社群话题","Discussion · FB Group","What home-care tip did Dad pass on","爸爸教过你什么照顾家里的小方法","What home-care tip did Dad pass on? Share one tip.","爸爸教过你什么照顾家里的小方法？分享一条经验。"],
    [5,"长柄电动刷","Feed / Carousel · Facebook / Instagram","Before choosing a tool, take a closer look","选择工具前，先把结构看清楚","Before choosing a tool, take a closer look. See the long-handle scrubber details.","选择工具前，先把结构看清楚。查看 长柄电动刷 细节。"],
    [6,"黄色双盘拖把","Feed / Carousel · Facebook / Instagram","Meet the dual-head mop, from handle to dual-head base","从手柄到双盘底座，认识 双盘拖把","Meet the dual-head mop, from handle to dual-head base. See product details.","从手柄到双盘底座，认识 双盘拖把。查看产品详情。"],
    [7,"节庆主线","Reel · Facebook / Instagram","Care often looks like a very small moment","关心往往藏在很小的瞬间里","Care often looks like a very small moment. Share a moment you remember.","关心往往藏在很小的瞬间里。说说你记得的瞬间。"],
    [8,"长柄电动刷","Reel · Facebook / Instagram","Watch one task, from start to finish","从开始到结束，看清一次操作","Watch one task, from start to finish. Watch the the long-handle scrubber demonstration.","从开始到结束，看清一次操作。观看 长柄电动刷 演示。"],
    [9,"黄色双盘拖把","Reel · Facebook / Instagram","See the dual-head mop in a continuous floor-care sequence","用一个连续动作，了解 双盘拖把 地面清洁","See the dual-head mop in a continuous floor-care sequence. Watch the full demonstration.","用一个连续动作，了解 双盘拖把 地面清洁。观看完整演示。"],
    [10,"节庆主线","Feed / Carousel · Facebook / Instagram","A thoughtful gift starts with knowing the person","用心选礼物，从了解对方开始","A thoughtful gift starts with knowing the person. What would suit your dad?","用心选礼物，从了解对方开始。什么更适合你的爸爸？"],
    [11,"长柄电动刷","Feed / Carousel · Facebook / Instagram","The details deserve a closer look","值得仔细看看的产品细节","The details deserve a closer look. Explore the long-handle scrubber.","值得仔细看看的产品细节。了解 长柄电动刷。"],
    [12,"黄色双盘拖把","Feed / Carousel · Facebook / Instagram","A closer look at the dual-head mop in an everyday home","在日常家居空间里，仔细看看 双盘拖把","A closer look at the dual-head mop in an everyday home. Explore the dual-head mop.","在日常家居空间里，仔细看看 双盘拖把。了解 双盘拖把。"],
    [13,"社群话题","Discussion · FB Group","Dad’s Little Acts: tell one true story of care","爸爸的小小付出：分享一个真实的关怀故事","Dad’s Little Acts: tell one true story of care. Read the participation rules.","爸爸的小小付出：分享一个真实的关怀故事。先阅读参与规则。"],
    [14,"节庆主线","Reel · Facebook / Instagram","Thank you for the little things I did not always notice","谢谢那些我未必总能注意到的小小付出","Thank you for the little things I did not always notice. Write your own thank-you.","谢谢那些我未必总能注意到的小小付出。写下你想说的谢谢。"],
    [15,"长柄电动刷","Feed / Carousel · Facebook / Instagram","Choose for the task","按任务选择，先确认使用说明","Choose for the task. Check the use guidance first. Read the long-handle scrubber guidance.","按任务选择，先确认使用说明。查看 长柄电动刷 使用说明。"],
    [16,"黄色双盘拖把","Feed / Carousel · Facebook / Instagram","Every floor is different","地面材质各不相同，使用前先确认适用性","Every floor is different. Check suitability before use. Read the dual-head mop guidance.","地面材质各不相同，使用前先确认适用性。查看 双盘拖把 使用说明。"],
    [17,"节庆主线","Reel · Facebook / Instagram","He showed up in a thousand little ways","他在无数小事里照顾着我们","He showed up in a thousand little ways. Show him you noticed. Explore the story.","他在无数小事里照顾着我们。这次，让他知道你都记得。了解这段故事。"],
    [18,"长柄电动刷","Reel · Facebook / Instagram","Care in the details","把关怀放进细节，认识 长柄电动刷","Care in the details. Meet the long-handle scrubber. See the product film.","把关怀放进细节，认识 长柄电动刷。观看产品短片。"],
    [19,"黄色双盘拖把","Reel · Facebook / Instagram","Everyday floors, thoughtfully considered","认真对待日常地面清洁，认识 双盘拖把","Everyday floors, thoughtfully considered. Meet the dual-head mop. See the product film.","认真对待日常地面清洁，认识 双盘拖把。观看产品短片。"],
    [20,"节庆主线","Feed / Carousel · Facebook / Instagram","For the Hands That Always Help","献给那些总是伸出援手的双手","For the Hands That Always Help. Show him you noticed.","献给那些总是伸出援手的双手。让他知道，你都记得。"],
    [21,"社群话题","Discussion · FB Group","A place for your real stories of everyday care","在这里，分享日常关怀的真实故事","Concept discussion: Which everyday acts of care deserve to be remembered? No audience responses have been collected.","概念讨论：哪些日常关怀值得被记住？当前没有真实留言精选。"],
    [22,"长柄电动刷","Feed / Carousel · Facebook / Instagram","Questions before choosing the long-handle scrubber","选择 长柄电动刷 前有疑问","Questions before choosing the long-handle scrubber? Start with the facts. Read the FAQ.","选择 长柄电动刷 前有疑问？先从产品事实了解。查看常见问题。"],
    [23,"黄色双盘拖把","Feed / Carousel · Facebook / Instagram","Questions before choosing the dual-head mop","选择 双盘拖把 前有疑问","Questions before choosing the dual-head mop? Start with the facts. Read the FAQ.","选择 双盘拖把 前有疑问？先从产品事实了解。查看常见问题。"],
    [24,"长柄电动刷","Reel · Facebook / Instagram","One clear sequence","一个清楚的连续动作，了解 长柄电动刷 的使用过程","One clear sequence. A closer look at the long-handle scrubber in use. Watch the demonstration.","一个清楚的连续动作，了解 长柄电动刷 的使用过程。观看演示。"],
    [25,"黄色双盘拖把","Reel · Facebook / Instagram","Follow the movement, from first contact to finish","从接触地面到收尾，跟随动作看完整过程","Follow the movement, from first contact to finish. Watch the dual-head mop in use.","从接触地面到收尾，跟随动作看完整过程。观看 双盘拖把 演示。"],
    [26,"社群话题","Discussion · FB Group","A five-second moment, a story worth telling","五秒的小小瞬间，也值得被记住","A five-second moment, a story worth telling. Read the creator brief and rights options.","五秒的小小瞬间，也值得被记住。阅读创作说明与授权选项。"],
    [27,"节庆主线","Feed / Carousel · Facebook / Instagram","The best part may be the time you spend together","值得珍惜的，也许正是一起度过的时间","The best part may be the time you spend together. Tell us your favorite way to spend time together.","值得珍惜的，也许正是一起度过的时间。分享你们喜欢一起做的事。"],
    [28,"节庆主线","Feed / Carousel · Facebook / Instagram","Different tools, different everyday tasks","不同工具，对应不同日常任务","Different tools, different everyday tasks. Compare the long-handle scrubber and the dual-head mop use guidance.","不同工具，对应不同日常任务。对照两款产品使用说明。"],
    [29,"节庆主线","Feed / Carousel · Facebook / Instagram","A look at the decisions behind this campaign concept","看看这个活动概念背后的创作选择","From product references and script checks to file QA: a look at this concept’s planned production process.","从产品原图、脚本验证到文件QA：展示本案例的制作流程设计。"],
    [30,"节庆主线","Feed / Carousel · Facebook / Instagram","What did we learn, and what still needs evidence","我们学到了什么，还有哪些需要证据","Concept review: check asset dependencies, product facts and evidence gaps. No campaign performance results are available.","本案例复盘：核对素材依赖、产品事实与证据缺口；不报告尚不存在的营销效果。"],
  ];

  function section(title, intro, body, id = "") {
    return `<section ${id ? `id="${id}"` : ""} class="g-module g-project"><header><h2>${title}</h2><p>${intro}</p></header>${body}</section>`;
  }

  function brand() {
    return section("餐区黏污、浴室边角，站着刷", "美国市场 · 家用清洁电器品牌定位", `
      <div class="g-project-feature">
        <a href="assets/projects/brand-house.webp" target="_blank" rel="noopener noreferrer" aria-label="放大匿名品牌屋">${image("brand-house", "品牌屋总览，包含定位、四条产品线、目标人群和传播支柱")}</a>
        <div><h3>先选清洁任务，再选主推产品</h3><p>餐桌下的黏脚印与浴缸内沿的边角需要不同动作。双盘拖把负责餐区硬地，展示站姿推进和转向。长柄电动刷负责浴室边角，展示调杆、调角和刷头贴合。</p>
        <h3>把功能变成看得见的动作</h3><p>广告主视觉交代姿势和使用场景。社媒及创作者从真实污渍开场，用同机位展示清洁前后。节庆短片让家人主动接手清洁，PR 选题说明每件工具适用的家庭任务。</p>
        <h3>创意评审与测试</h3><p>审核画面能否看清握持、接触点和工具运转。测试方案用同一个视频主体对比污渍特写和提问开场，观察 3 秒观看率与完播率。</p></div>
      </div>`, "brand-positioning");
  }

  function gtm() {
    return section("五款产品，四条产品线", "上市传播优先展示双盘拖把的站姿推进，以及长柄电动刷的触达和贴合。", `
      <div class="g-project-feature g-project-product"><div class="g-project-list">${productLines.map(([line, product, task, demo]) => `
        <article><small>${line}</small><h3>${product}</h3><p>${task}。${demo}</p></article>`).join("")}</div>
        <figure>${image("mop-kv-detail", "黄色双盘拖把与其双盘底座的主视觉局部")}<figcaption>双盘拖把主视觉局部</figcaption></figure>
      </div>`, "product-portfolio");
  }

  function calendarDays() {
    return `<div class="g-calendar-days">${calendar.map(([day, stream, channel, en, zh, bodyEn, bodyZh]) => `
      <details class="g-calendar-day" data-calendar-day="${day}"><summary><span>Day ${String(day).padStart(2, "0")} · ${esc(stream)}</span><b>${esc(zh)}</b></summary>
      <div><small>${esc(channel)}</small><p lang="en"><strong>${esc(en)}</strong></p><p lang="en">${esc(bodyEn)}</p><p>${esc(bodyZh)}</p></div></details>`).join("")}</div>`;
  }

  function social() {
    return section("父亲节 30 天内容日历", "For the Hands That Always Help · 节庆营销方案", `
      <div class="g-project-list g-project-calendar-plan">
        <article><h3>主题与主推产品</h3><p>以父亲为家人做过的小事发起互动。长柄电动刷负责浴室边角演示，黄色双盘拖把负责餐后硬地清洁。</p></article>
        <article><h3>发布编排</h3><p>Facebook 和 Instagram 用轮播解释场景与选购问题，用 Reels 演示完整操作。Group 以家人教过的清洁习惯和生活故事发起讨论。</p></article>
      </div>
      <details class="g-chart-disclosure"><summary>展开 30 天双语内容日历</summary><p class="g-chart-note">Day 01–30 为内容顺序。点选任一天查看平台、内容形式和双语文案。</p>${calendarDays()}</details>`, "fathers-day-calendar");
  }

  function pr() {
    return section("北美家庭清洁 PR 选题", "发布页 · King Newswire · 2026.05.15", `
      <div class="g-project-feature g-project-wide-image"><figure>${image("pr-home-scene", "北美家庭客厅和厨房的清洁场景配图")}<figcaption>新闻稿配图局部</figcaption></figure>
      <div><h3>用家庭场景说明产品分工</h3><p>从宠物毛发、地面污渍、浴室边角和烤炉清洁切入，将产品阵容放到北美家庭能辨认的任务里。</p><p class="g-chart-note">发布页可核对日期；不将转载量或媒体效果计入成果。</p></div></div>`, "pr-project");
  }

  function creative() {
    return section("节庆视频与产品演示", "家宴叙事让产品动作进入故事，吸尘演示用真实可辨认的清洁位置交代操作。", `
      <div class="g-project-media">
        <figure>${image("holiday-scene-1", "家宴后地板上溅落的酱汁")}<figcaption><b>家宴短片 · 场景开场</b><span>用溅落的酱汁把故事转入餐后清洁。</span></figcaption></figure>
        <figure>${image("holiday-scene-2", "人物手握双盘拖把的 D 形手柄")}<figcaption><b>家宴短片 · 产品动作</b><span>用握持特写交代家人如何接手清洁。</span></figcaption></figure>
        <figure class="g-project-vertical">${image("stairs-video-frame", "低机位吸尘器演示，吸头与楼梯踏面接触")}<figcaption><b>吸尘演示 · 楼梯</b><span>低机位展示吸头在窄踏面上的移动和接触。</span></figcaption></figure>
        <figure class="g-project-vertical">${image("vacuum-video-frame", "室内手持吸尘器产品演示")}<figcaption><b>吸尘演示 · 室内</b><span>室内中景展示机器姿态和手部操作。</span></figcaption></figure>
      </div>`, "video-projects");
  }

  function expo() {
    return section("海外展会现场与客户开发", "现场物料把产品关系讲清，方便采购方带着具体问题进入下一轮沟通。", `
      <div class="g-project-feature g-project-wide-image">
        <figure>${image("expo-display", "展会展示墙，连接光伏、逆变器、储能电池与用电负载")}<figcaption>产品系统展示墙 · 现场照片局部</figcaption></figure>
        <div class="g-project-list">
        <article><h3>产品系统展示墙</h3><p>以系统连接图将光伏、逆变器、电池和负载放在同一面墙上，实物展台让采购方核对产品类型、规格与应用场景。</p></article>
        <article><h3>采购需求和跟进</h3><p>围绕使用场景、需求规格、采购时间与交付要求记录询盘。现场沟通后进入需求确认、报价和交期核对。</p></article>
        <p class="g-chart-note">案例聚焦系统展示墙与采购需求沟通。</p></div>
      </div>`, "expo-project");
  }

  function creator() {
    return section("创作者合作工作台", "合作管理 · 从 Brief 到内容审核与授权。", `
      <div class="g-project-list g-project-calendar-plan"><article><h3>合作 Brief</h3><p>将合作目标、受众、产品事实、演示任务和交付形式放进同一张工作单，便于创作者与审核人核对需求。</p></article>
      <article><h3>内容审核与素材复用</h3><p>交付后记录内容版本、修改意见、授权平台和期限。素材复用前核对许可范围与到期时间。</p></article></div>`, "creator-project");
  }

  function operations() {
    return section("一次活动如何排期和验收", "社媒小组的项目分工与审核清单", `
      <div class="g-project-list g-project-calendar-plan">
        <article><h3>选题与排期</h3><p>我从季度主推主题选定产品和场景，给 Facebook、Instagram 和 Group 分配内容任务，并确认每条内容的负责人和交付时间。</p></article>
        <article><h3>产品与素材确认</h3><p>产品同事核对功能、参数和适用条件。社媒小组确认拍摄清单、素材权限和链接后，将 Brief 交给设计和视频同事。</p></article>
        <article><h3>创意与发布审核</h3><p>脚本审用户问题和演示顺序，画面审产品结构与操作，发布前检查文案、字幕、链接和平台版本。</p></article>
        <article><h3>复盘与下月安排</h3><p>按平台看浏览、互动和反馈。把反复出现的产品问题补进 FAQ，把返工项写回审核清单和下一轮 Brief。</p></article>
      </div>
      <a class="featured-detail" href="#/case/social/execution">查看父亲节日历样例 ↗</a>`, "team-delivery");
  }

  const extras = {
    brand: { strategy: brand, execution: pr },
    gtm: { strategy: gtm },
    social: { execution: social },
    creative: { execution: creative },
    b2b: { execution: expo },
    creator: { execution: creator },
    operations: { management: operations },
  };
  window.enhancePortfolioProjects = (main, { page, id }) => {
    if (page !== "case" || !Object.hasOwn(extras, id)) return;
    for (const [chapter, render] of Object.entries(extras[id])) {
      const content = main.querySelector(`#${chapter}>div:last-child`);
      if (!content) continue;
      if (chapter === "strategy") {
        for (const legacy of content.querySelectorAll(".brand-house, .channel-grid")) legacy.hidden = true;
      }
      const introduction = content.querySelector("h2 + p");
      if (introduction) introduction.insertAdjacentHTML("afterend", render());
      else content.querySelector("h2")?.insertAdjacentHTML("afterend", render());
    }
  };
})();
