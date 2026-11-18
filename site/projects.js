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
    [8,"长柄电动刷","Reel · Facebook / Instagram","Watch one task, from start to finish","从开始到结束，看清一次操作","Watch one task, from start to finish. Watch the long-handle scrubber demonstration.","从开始到结束，看清一次操作。观看 长柄电动刷 演示。"],
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
    [29,"内部验收","Internal · Project Review","Asset and message QA","素材与传播信息验收","Review the final assets, product facts, and channel adaptations before closing the campaign.","活动收尾前，检查最终素材、产品事实与渠道版本是否一致。"],
    [30,"内部复盘","Internal · Project Review","Campaign review and next-cycle actions","活动复盘与下一轮行动","Summarize audience questions, content feedback, and open actions for the next campaign.","整理用户问题、内容反馈与待办事项，为下一轮活动确定改进方向。"],
  ];

  function section(title, intro, body, id = "") {
    return `<section ${id ? `id="${id}"` : ""} class="g-module g-project"><header><h2>${title}</h2><p>${intro}</p></header>${body}</section>`;
  }

  function brand() {
    return section("餐区黏污、浴室边角，站着刷", "美国市场 · 家用清洁电器品牌屋 / 定位与传播架构", `
      <div class="g-project-feature">
        <a href="assets/projects/brand-house.webp" target="_blank" rel="noopener noreferrer" aria-label="放大匿名品牌屋">${image("brand-house", "品牌屋总览，包含定位、四条产品线、目标人群和传播支柱")}</a>
        <div>
          <h3>品牌定位：把产品放回具体清洁任务</h3>
          <p>面向美国市场的家用电动清洁工具，优先解决餐区硬地黏污，以及浴缸内沿、墙砖接缝和边角的刷洗问题。产品由电机带动清洁头，用户控制握持位置、角度和移动路径。</p>
          <h3>目标人群不是单一年龄层，而是三类购买任务</h3>
          <p>餐区清洁者关注扫过后仍然粘脚的脚印和溅渍；浴室清洁者关注刷头够不到的内沿与接缝；替家人购买的人，需要先确认握持、转向、换刷头和适用表面。</p>
        </div>
      </div>
      <div class="g-project-list">
        <article><small>3C / CUSTOMER</small><h3>从任务识别需求</h3><p>餐区硬地的黏污、浴室边角的触达，以及礼赠购买时对操作与配件的确认，是品牌沟通优先回答的问题。</p></article>
        <article><small>3C / COMPETITOR</small><h3>按工具能力建立参照</h3><p>旋转拖把强调动力旋转；吸洗一体机强调碎屑与清洗的组合；长柄电动刷强调杆长与刷头角度。比较聚焦功能与使用任务，不延伸为市场份额或价格结论。</p></article>
        <article><small>STP / POSITIONING</small><h3>主推双盘拖把与长柄刷</h3><p>双盘拖把负责餐区硬地，展示站姿推进和转向；长柄刷负责浴室边角，展示调杆、调角和刷头接触。品牌广告与社媒优先围绕这两类任务建立识别。</p></article>
      </div>
      <div class="g-project-list">
        <article><small>MESSAGE PILLAR 01</small><h3>站着推进</h3><p>双盘持续转动，主握把与辅助手柄帮助用户引导路线；画面从黏脚印切入，再展示站姿推进、转向和双盘接地。</p></article>
        <article><small>MESSAGE PILLAR 02</small><h3>伸得到，贴得上</h3><p>通过杆长与刷头角度调节，让刷头接触浴缸边沿和墙砖接缝；同一机位交代站位、调节动作与接触点。</p></article>
        <article><small>MESSAGE PILLAR 03</small><h3>按表面选刷头</h3><p>根据硬地、浴室边角和专项清洁任务选择拖布或刷头；演示需要说明适用表面和使用条件。</p></article>
      </div>
      <div class="g-project-list">
        <article><small>CHANNEL / BRAND</small><h3>广告主视觉</h3><p>餐区用中景表现站姿推进，低机位展示双盘接地；浴室把人的站位和刷头触达放进同一组画面。</p></article>
        <article><small>CHANNEL / SOCIAL & CREATOR</small><h3>短视频与创作者</h3><p>从真实污渍或用户提问开场，拍清工具接触、运转和同机位前后变化，再邀请观众分享家中难刷的位置。</p></article>
        <article><small>CHANNEL / SEASONAL & PR</small><h3>节庆与媒体传播</h3><p>节庆内容把清洁放进家庭故事；PR 用餐区黏污与浴室边角解释产品分工，并为每个场景匹配动作图和简明说明。</p></article>
      </div>
      <p class="g-chart-note">品牌屋中的竞品参照属于功能与任务层面的定性比较；现有材料没有市场规模、竞品份额或价格调查数据。</p>`, "brand-positioning");
  }

  function gtm() {
    return section("五款产品，四条产品线", "从产品组合到上市传播：先明确主推任务，再把产品事实拆成渠道可执行的内容。", `
      <div class="g-project-feature g-project-product"><div class="g-project-list">${productLines.map(([line, product, task, demo]) => `
        <article><small>${line}</small><h3>${product}</h3><p>${task}。${demo}</p></article>`).join("")}</div>
        <figure>${image("mop-kv-detail", "黄色双盘拖把与其双盘底座的主视觉局部")}<figcaption>双盘拖把主视觉局部 · 新品传播视觉方向</figcaption></figure>
      </div>
      <div class="g-project-list">
        <article><small>LAUNCH PRIORITY / 主推组合</small><h3>双盘拖把 × 长柄电动刷</h3><p>先以餐区硬地黏污和浴室边角建立清晰的传播入口；手持刷、无线吸尘器和烤炉刷分别承担水槽窄边、宠物毛发与干屑、烧烤后炉篦清洁等专项任务。</p></article>
        <article><small>MESSAGE SYSTEM / 卖点转译</small><h3>从产品特征到用户能看懂的证明</h3><p>按 FABA 组织产品特征、优势、用户利益与使用场景，再用 FABE / RTB 为主张匹配可验证证明。双盘拖把展示站姿推进和双盘接地；长柄刷展示杆长、角度与刷头接触。</p></article>
        <article><small>CHANNEL ADAPTATION / 渠道分工</small><h3>同一产品事实，不同渠道任务</h3><p>KV 负责建立主张和场景；社媒与创作者展示真实操作；节庆视频承接家庭故事；PR 解释产品与家庭任务的对应关系。渠道可以改变表达方式，不能改变产品事实。</p></article>
      </div>
      <div class="g-project-list">
        <article><small>01 / RESEARCH & POSITIONING</small><h3>研究与定位</h3><p>汇总 Review / VOC、竞品功能、站内搜索与社群问题，识别目标任务、购买顾虑和优先传播场景。</p></article>
        <article><small>02 / MESSAGE & PROOF</small><h3>卖点与证明</h3><p>确认产品事实，整理卖点层级、FAQ、演示动作、适用条件和 Creator Brief。</p></article>
        <article><small>03 / PRE-LAUNCH</small><h3>预热物料</h3><p>围绕目标人群和传播主张准备 KV、产品演示、社媒内容、媒体资料及商品信息。</p></article>
        <article><small>04 / LAUNCH</small><h3>上市传播</h3><p>按 Facebook、Instagram、Creator、PR 与节庆触点分配内容任务，检查素材、CTA 和信息一致性。</p></article>
        <article><small>05 / REVIEW</small><h3>阶段复盘</h3><p>结合观看、完播、收藏、评论问题、链接动作和市场反馈，判断下一轮内容需要补强的环节。</p></article>
      </div>
      <div class="g-project-list">
        <article><small>TEST PLAN 01</small><h3>视频开场</h3><p>同一场景与视频主体，比较污渍近景开场和人物提问开场；观察 3 秒观看率与完播率。</p></article>
        <article><small>TEST PLAN 02</small><h3>产品演示</h3><p>同一时长与行动提示，比较握持、接触点特写和单用中景；观察收藏及与具体用法相关的评论。</p></article>
        <article><small>TEST PLAN 03</small><h3>广告主张</h3><p>在相同受众与投放条件下，比较站姿刷洗主张和单一功能主张；检查用户能否准确理解适用场景与操作要点。</p></article>
      </div>

      <div class="g-project-list g-project-calendar-plan">
        <article><small>CAMPAIGN DEEP DIVE / 2026.05</small><h3>一份可拆解、可协同的新品上市规划</h3><p>本模块复原 2026 年 5 月双头电动拖把上市传播计划，展示 Campaign Strategy、社媒内容矩阵与 IMC 排期如何连接。它是规划工作物，不是已发布活动记录。</p></article>
        <article><small>PRIMARY OBJECTIVE</small><h3>让目标用户理解产品，并在商业条件具备时完成购买</h3><p>购买行为是主目标；触达、观看、互动和点击用于诊断传播环节。价格、Offer、库存、支付和履约未通过审核前，CTA 降级为 Learn More / Watch Demo。</p></article>
        <article><small>PRIMARY AUDIENCE / HYPOTHESIS</small><h3>美国厨房与餐区硬地日常清洁人群</h3><p>以经常处理餐后地面清洁任务的家庭用户作为优先受众假设；需求强度和购买阻碍仍需由 Review、VOC、搜索与客服反馈验证，不将其写成已完成调研结论。</p></article>
        <article><small>CORE TENSION</small><h3>晚餐结束了，地面清洁任务还没有结束</h3><p>从具体生活任务切入，以真实产品操作建立理解，再回到家庭生活时刻。情绪价值不替代功能证明，也不量化承诺节省时间。</p></article>
      </div>
      <div class="g-project-list g-project-calendar-plan">
        <article><small>CAMPAIGN THEME / BIG IDEA</small><h3>MAKE ROOM FOR WHAT MATTERS.</h3><p>把清洁放回生活场景：先呈现餐后地面任务，再展示产品如何参与其中，最后回到用户真正想留住的生活时刻。</p></article>
        <article><small>CREATIVE TERRITORY 01</small><h3>The After-Dinner Reset</h3><p>场景问题 → 产品进入 → 连续操作 → 同条件结果。镜头聚焦餐区硬地，不夸大污渍，也不把单次演示泛化成所有地面或污渍的保证。</p></article>
        <article><small>CREATIVE TERRITORY 02</small><h3>See the Motion</h3><p>解释双头结构、真实运行与地面接触。运动必须来自真实产品视频；静态图、生成画面或产品渲染不能充当运行证明。</p></article>
        <article><small>CREATIVE TERRITORY 03</small><h3>Make Room for What Matters</h3><p>用家庭相处与日常时刻承接情绪价值；人物素材需授权，不固定家务性别角色，不使用未经证实的用户评价。</p></article>
      </div>
      <div class="g-project-list g-project-calendar-plan">
        <article><small>CONTENT PILLAR 01 / SCENARIO</small><h3>场景问题</h3><p>餐后地面、厨房日常清洁；Feed、Story、场景短片负责建立相关性。CTA：Comment / Watch Demo。</p></article>
        <article><small>CONTENT PILLAR 02 / MECHANISM</small><h3>产品机制证明</h3><p>真实双头运行、接地和操作路径；短视频负责解释“如何工作”。缺少实拍时不发布运动证明。</p></article>
        <article><small>CONTENT PILLAR 03 / EDUCATION</small><h3>功能与操作教育</h3><p>结构、手柄、控制区和已核验功能；轮播、短片与说明型内容降低理解成本。未签核参数不上图。</p></article>
        <article><small>CONTENT PILLAR 04 / BRAND</small><h3>情绪与品牌</h3><p>Mother's Day 与家庭生活内容建立情绪关联；不以节日故事替代产品证明，也不暗示量化省时。</p></article>
        <article><small>CONTENT PILLAR 05 / FAQ</small><h3>异议与常见问题</h3><p>收集真实评论和社群疑问，再由产品负责人核验答案；未知问题标记待回复，不凭空补充使用边界。</p></article>
        <article><small>CONTENT PILLAR 06 / CREATOR</small><h3>Creator 与 UGC</h3><p>以真实家庭演示补充体验；披露、肖像、素材版权和 Paid Usage Rights 分开确认，投稿不自动等于商用授权。</p></article>
        <article><small>CONTENT PILLAR 07 / CONVERSION</small><h3>转化承接</h3><p>获批的商品信息、广告变体与许可邮件承接购买；Offer、库存、支付和履约未通过 Gate 时不使用 Shop Now。</p></article>
      </div>
      <div class="g-project-list g-project-calendar-plan">
        <article><small>PHASE 01 / MAY 01–10</small><h3>场景预热与共鸣</h3><p>餐后场景、家庭情绪内容与社群问题收集；先让用户识别任务，再引入产品。</p></article>
        <article><small>PHASE 02 / MAY 11–18</small><h3>产品机制与功能教育</h3><p>双头运行、产品结构、控制区与 FAQ；内容依赖真实操作素材和产品事实签核。</p></article>
        <article><small>PHASE 03 / MAY 19–21</small><h3>上市倒计时</h3><p>3-Day Countdown、产品身份与已批准信息；不制造虚假稀缺或提前展示未批 Offer。</p></article>
        <article><small>PHASE 04 / MAY 22</small><h3>T0 · Launch Day</h3><p>Hero Film、Launch KV、产品演示和跨平台分发；购买 CTA 仅在交易承接链路通过后开启。</p></article>
        <article><small>PHASE 05 / MAY 23–25</small><h3>首销窗口与渠道放大</h3><p>Paid、Creator、Email 和社群问答按预算、授权、库存、客服与测量 Gate 条件性启动。</p></article>
        <article><small>PHASE 06 / MAY 26–31</small><h3>持续教育与阶段复盘</h3><p>FAQ 更新、真实反馈、素材与权利归档、订单对账和生命周期交接；没有成熟数据不发布成绩回顾。</p></article>
      </div>
      <div class="g-project-list g-project-calendar-plan">
        <article><small>IMC / OWNED SOCIAL</small><h3>Facebook 与 Instagram</h3><p>承担场景认知、轮播教育、KV、短视频和活动分发；同一主张按平台形式重构，不机械重复发帖。</p></article>
        <article><small>IMC / SHORT VIDEO</small><h3>TikTok、Reels 与 Shorts</h3><p>负责 Hook、真实动作与机制解释；一个视频只讲一个主要信息点，按平台原生指标复盘。</p></article>
        <article><small>IMC / LONG-FORM</small><h3>YouTube</h3><p>承载 Hero Film 与完整演示，建立更完整的品牌叙事和产品理解；Storyboard 不等于最终成片。</p></article>
        <article><small>IMC / COMMUNITY</small><h3>Facebook Group</h3><p>收集用户问题、组织讨论与 FAQ；投票和单条评论不直接视为代表性市场研究。</p></article>
        <article><small>IMC / EARNED</small><h3>Creator 与 PR</h3><p>Creator 提供真实第三方演示；PR 先判断新闻价值，再使用已核验事实、引用与媒体素材。</p></article>
        <article><small>IMC / PAID</small><h3>付费媒体</h3><p>先验证创意与目的地，再依据成熟数据执行 STOP / FIX / OBSERVE / SCALE；预算与 Offer 未批准不投放。</p></article>
        <article><small>IMC / CRM</small><h3>Email 与生命周期</h3><p>按许可、用户状态和抑制规则分群；购买者、未购买高意向与既有客户分开管理。</p></article>
        <article><small>IMC / COMMERCE & DATA</small><h3>交易承接与测量</h3><p>产品页、价格、库存、支付、配送、客服与 UTM / Event / 订单对账共同构成上市 Gate；平台归因不等于增量。</p></article>
      </div>
      <div class="g-project-list g-project-calendar-plan">
        <article><small>MY CONTRIBUTION</small><h3>社媒策略与内容团队交付</h3><p>负责社媒传播策略和内容团队交付；参与用户研究、产品差异化定位、卖点分层与上市传播协同。未将产品研发、定价、整体预算审批或供应链决策写作个人独立职责。</p></article>
        <article><small>PROJECT CONTROL</small><h3>把策略拆成可交付单元</h3><p>形成 23 个社媒内容 / 运营槽位、15 条 IMC 渠道与协同链路、25 项视觉资产追踪记录。每项明确日期、平台、内容任务、CTA、Owner、素材依赖与发布 Gate。</p></article>
        <article><small>CROSS-FUNCTIONAL DELIVERY</small><h3>产品、营销与供应链三线协同</h3><p>产品 / 研发确认 SKU、功能和证明；营销组织 Campaign、内容、视觉、视频、Paid、PR / Creator 与 CRM；供应链 / 客服确认库存、配送、退换和假期值守。</p></article>
        <article><small>RELEASE GATES</small><h3>条件未满足，先暂停对应动作</h3><p>产品 Claim 未签核 → 暂停参数传播；真实演示缺失 → 不发布运动证明；Offer / 库存 / 履约未确认 → 不开放购买 CTA；Creator 权利未齐 → 不发布或复用；测量口径未就绪 → 不宣称 ROI。</p></article>
      </div>
      <p class="g-chart-note">证据边界：这是 2026 年 5 月计划版本的匿名化规划重建，不代表已发布、已投放、已成交或已实现 ROI。现有视觉资产 Tracker 中仍有设计待完成、占位和真实演示素材依赖；本规划不将其写成最终成品。简历记录的约 +3% 阶段销量表现与本计划分开呈现，不归因于本 Campaign。</p>
      <p class="g-chart-note">上述测试项来自品牌屋中的传播测试计划，当前材料没有 A/B 测试执行记录或测试结果，不作为已验证的投放结论。</p>`, "product-portfolio");
  }

  function calendarDays() {
    return `<div class="g-calendar-days">${calendar.map(([day, stream, channel, en, zh, bodyEn, bodyZh]) => `
      <details class="g-calendar-day" data-calendar-day="${day}"><summary><span>Day ${String(day).padStart(2, "0")} · ${esc(stream)}</span><b>${esc(zh)}</b></summary>
      <div><small>${esc(channel)}</small><p lang="en"><strong>${esc(en)}</strong></p><p lang="en">${esc(bodyEn)}</p><p>${esc(bodyZh)}</p></div></details>`).join("")}</div>`;
  }

  function social() {
    return section("父亲节 30 天内容与项目日历", "For the Hands That Always Help · 节庆营销概念方案", `
      <div class="g-project-list g-project-calendar-plan">
        <article><h3>主题与主推产品</h3><p>以父亲为家人做过的小事发起互动。长柄电动刷负责浴室边角演示，黄色双盘拖把负责餐后硬地清洁。</p></article>
        <article><h3>平台与内容形式</h3><p>Facebook 和 Instagram 用轮播解释场景与选购问题，用 Reels 演示完整操作；Facebook Group 以家人教过的清洁习惯和生活故事发起讨论。</p></article>
        <article><h3>内容与交付节奏</h3><p>日历按相对顺序编排内容。28 个节点面向用户发布，最后 2 个节点用于内部素材验收与活动复盘；不是实际发布日期或发布记录。</p></article>
      </div>
      <details class="g-chart-disclosure"><summary>展开 30 天双语内容与项目日历</summary><p class="g-chart-note">Day 01–28 为对外内容概念；Day 29–30 为内部验收与复盘节点。全部为相对内容顺序，不代表真实发布日历或已执行 Campaign。</p>${calendarDays()}</details>`, "fathers-day-calendar");
  }

  function pr() {
    return section("北美家庭清洁主题新闻稿发布", "King Newswire 分发 · USA Today Press Release 页面 · 2026 年 5 月", `
      <div class="g-project-feature g-project-wide-image"><figure>${image("pr-home-scene", "北美家庭客厅和厨房的清洁场景配图")}<figcaption>新闻稿配图 · 家庭清洁场景</figcaption></figure>
      <div>
        <h3>传播主题：从单品功能转向全屋清洁任务</h3>
        <p>稿件以北美家庭常见清洁场景组织产品信息，包括宠物毛发、地面污渍、浴室污垢、厨房油污和烧烤后残渣，让不同工具对应不同家庭任务。</p>
        <h3>传播结构：场景问题 → 产品分工 → 使用价值</h3>
        <p>以家庭日常场景作为入口，再说明地面清洁、浴室刷洗、吸尘和烤炉清洁等工具的使用边界；传播表达围绕已确认的产品功能展开。</p>
        <h3>发布形式与成果边界</h3>
        <p>现有截图显示稿件由 King Newswire 发布，页面位于 USA Today 的 Press Release 栏目。该材料可证明新闻稿分发页面，不应表述为 USA Today 编辑部独立采访或原创报道。</p>
        <p class="g-chart-note">页面标题日期为 May 15, 2026，侧栏日期为 May 14, 2026；公开展示只保留 2026 年 5 月，具体发布日期待核。当前没有可核验的转载量、阅读量、媒体触达或 Share of Voice 数据。</p>
      </div></div>`, "pr-project");
  }

  function creative() {
    return section("节庆叙事与产品演示", "先用家庭场景建立情绪，再用连续动作解释产品如何完成清洁任务。", `
      <div class="g-project-media">
        <figure>${image("holiday-scene-1", "家宴后地板上溅落的酱汁")}<figcaption><b>M3 节庆短片 · 场景开场</b><span>家庭聚餐后的酱汁滴落，把故事转入餐后清洁。</span></figcaption></figure>
        <figure>${image("holiday-scene-2", "人物手握双盘拖把的 D 形手柄")}<figcaption><b>M3 节庆短片 · 家人接手</b><span>通过握持与人物协作，把产品动作放进家庭故事。</span></figcaption></figure>
        <figure class="g-project-vertical">${image("stairs-video-frame", "低机位吸尘器演示，吸头与楼梯踏面接触")}<figcaption><b>竖版吸尘演示 · 楼梯</b><span>约 7 秒竖版素材，低机位展示吸头在踏面上的移动与接触。</span></figcaption></figure>
        <figure class="g-project-vertical">${image("vacuum-video-frame", "室内手持吸尘器产品演示")}<figcaption><b>竖版吸尘演示 · 室内</b><span>用中景交代机器姿态和手部操作，补充产品使用场景。</span></figcaption></figure>
      </div>
      <div class="g-project-list">
        <article><small>STORY 01 / OPENING</small><h3>家庭聚餐</h3><p>以节日餐桌和家人团聚建立生活情境，不先用参数打断故事。</p></article>
        <article><small>STORY 02 / PROBLEM</small><h3>清洁问题出现</h3><p>酱汁滴落和餐后地面污渍形成具体任务，让观众理解为什么需要清洁工具。</p></article>
        <article><small>STORY 03 / PRODUCT PROOF</small><h3>家人接手与连续演示</h3><p>从握持、站姿推进到双盘接地，再通过双盘旋转特写与 D 型手柄画面解释产品动作。</p></article>
        <article><small>STORY 04 / RESOLUTION</small><h3>回到家庭氛围</h3><p>产品不脱离生活情节，结尾回到温暖的节庆家庭空间，完成情绪收束。</p></article>
      </div>
      <p class="g-chart-note">当前页面展示视频关键帧与叙事拆解；完整 1114.mp4 和三条竖版 MP4 尚未嵌入公开网站，需确认外部访问权限及素材公开授权后再加入播放器。</p>`, "video-projects");
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
    return section("创作者合作流程设计", "从达人筛选、合作 Brief 到内容审核与授权，建立可追踪的合作工作流。", `
      <div class="g-project-list g-project-calendar-plan">
        <article><h3>达人库与受众适配</h3><p>按市场、品类、受众和内容风格筛选合作对象，记录匹配理由与内容方向。</p></article>
        <article><h3>项目管理与合作 Brief</h3><p>把合作目标、受众、产品事实、演示任务、交付形式、节点和审核责任放进同一份工作单。</p></article>
        <article><h3>内容库与质量审核</h3><p>记录内容版本、修改意见、产品事实、平台披露和最终交付状态；不以发布数量替代内容质量判断。</p></article>
        <article><h3>授权与素材复用</h3><p>素材复用前核对平台、地域、期限、用途、改编范围和撤回条件；发布授权与商业使用授权分开确认。</p></article>
        <article><h3>合作跟进与邮件协同</h3><p>将触达、回复、合作状态、待办和交付节点连接起来，减少邮件沟通与项目状态之间的信息断层。</p></article>
      </div>
      <p class="g-chart-note">现有 Creator Desk 截图标注 Demo Data / No Connectors，因此本案例只展示流程设计与工作台原型，不展示界面中的演示数字为真实达人、合作或订单成果。</p>`, "creator-project");
  }

  function seo() {
    const articles = [
      ["ART-01", "The Post-Halloween Survival Guide: Deep Cleaning Sticky Floor & Makeup Disasters", "Pillar", "Informational / Guide"],
      ["ART-02", "How to Remove Fake Blood and Face Paint from Grout, Sinks, and Porcelain", "Cluster", "Problem-solving"],
      ["ART-03", "Sticky Candy Meltdown: Safely Dissolving Sugar and Syrup from Hardwood Floors", "Cluster", "How-To / Educational"],
      ["ART-04", "Pumpkin Guts, Candle Wax, and Porch Grime: Outdoor Entryway Restoration", "Cluster", "Seasonal Maintenance"],
      ["ART-05", "Fall Costume Glitters and Faux Cobweb Cleanup: Vacuuming Without Bristle Tangles", "Cluster", "How-To / Product Selection"],
      ["ART-06", "Hosting a Spooktacular Party? The 30-Minute Speed Cleaning Checklist", "Cluster", "Checklist / List"],
      ["ART-07", "Bathroom Horror Stories: Eliminating Soap Scum, Hair Dye, and Tile Grime Fast", "Cluster", "Comparison / Problem-solving"],
      ["ART-08", "Electric Spin Scrubber vs. Traditional Mop: Tackling High-Traffic Holiday Footprints", "Cluster", "Commercial Investigation"],
      ["ART-09", "Pet Costumes, Shedding Season, and Autumn Flea Dirt: Whole-Home Hygiene Guide", "Cluster", "Hygiene / Lifestyle"],
      ["ART-10", "Post-Party Kitchen Degreasing: Air Fryers, Stovetops, and Caramel Splatters", "Cluster", "How-To / Deep Cleaning"],
    ];
    return section("Halloween SEO 主题集群规划", "No Scares, Just Spotless · 美国 / 北美市场 · 英文优先", `
      <div class="g-project-list">
        <article><small>CONTENT HUB</small><h3>1 篇 Pillar + 9 篇 Cluster</h3><p>以节后清洁为中心主题，围绕地面黏污、化妆品残留、门廊、浴室、宠物毛发和厨房油污扩展细分问题。</p></article>
        <article><small>SEARCH INTENT</small><h3>从问题解决到商业调查</h3><p>内容类型覆盖 Informational Guide、Problem-solving、How-To、Checklist、Seasonal Maintenance 与 Commercial Investigation。</p></article>
        <article><small>BRAND CONNECTION</small><h3>动力替代重复动作</h3><p>将品牌核心表达与任务化产品设计相连，让文章先解决具体清洁问题，再说明适用工具与使用条件。</p></article>
      </div>
      <div class="g-project-list g-project-calendar-plan">${articles.map(([id, title, type, intent]) => `
        <article><small>${esc(id)} · ${esc(type)}</small><h3>${esc(title)}</h3><p>Search intent：${esc(intent)}</p></article>`).join("")}</div>
      <p class="g-chart-note">原始截图记录为待用户确认的策略与内容生产包，且明确限制不得编造搜索量或节日折扣代码。当前只展示主题架构，不代表 10 篇文章已经发布；尚无文章 URL、收录状态或 GSC 表现可供展示。</p>`, "seo-cluster");
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
    seo: { execution: seo },
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
