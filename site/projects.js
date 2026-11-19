(() => {
  "use strict";

  const esc = (value) => String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[char]);
  const image = (file, alt, ext = "webp") => `<img src="assets/projects/${file}.${ext}" alt="${alt}" loading="lazy" decoding="async">`;
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
        <figure>${image("m3-yellow-main", "双盘拖把黄色款整机外观，展示双圆拖布头、黄色机身与手柄结构")}<figcaption><b>双盘拖把 · 整机外观</b><span>采用黄色款真实产品原图，保留整机比例、双盘底座与手柄结构</span></figcaption></figure>
      </div>
      <div class="g-product-gallery" aria-label="双盘拖把产品外观细节">
        <figure>${image("m3-yellow-battery", "双盘拖把黄色款主机背部与外置电池安装位置")}<figcaption><b>Battery Detail / 电池安装</b><span>使用原始产品图展示电池安装位置，不以示意图替代真实结构</span></figcaption></figure>
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
        <article><small>PRIMARY BUSINESS OBJECTIVE</small><h3>在商业链路放行后获取净履约订单，并守住净贡献</h3><p>这是唯一主结果；产品理解、有效观看、商品页访问和互动是前置行为与诊断信号，不与订单混为同一目标。价格、Offer、库存、支付和履约未通过 Gate 前，CTA 降级为 Learn More / Watch Demo。</p></article>
        <article><small>MARKETING / BEHAVIOR OBJECTIVE</small><h3>让目标用户理解 M3 对应的餐后硬地清洁任务</h3><p>先说明适用场景、双头结构和真实操作，再引导查看已核验的商品信息；购买行为只在交易链路具备时启用，不把“理解”写成销售结果。</p></article>
        <article><small>PRIMARY AUDIENCE / HYPOTHESIS</small><h3>美国厨房与餐区硬地日常清洁人群</h3><p>以经常处理餐后地面清洁任务的家庭用户作为优先受众假设；需求强度和购买阻碍仍需由 Review、VOC、搜索与客服反馈验证，不将其写成已完成调研结论。</p></article>
        <article><small>CORE TENSION</small><h3>晚餐结束了，地面清洁任务还没有结束</h3><p>从具体生活任务切入，以真实产品操作建立理解，再回到家庭生活时刻。情绪价值不替代功能证明，也不量化承诺节省时间。</p></article>
      </div>
      <div class="g-project-list g-project-calendar-plan">
        <article><small>CAMPAIGN THEME / BIG IDEA</small><h3>MAKE ROOM FOR WHAT MATTERS.</h3><p>把清洁放回生活场景：先呈现餐后地面任务，再展示产品如何参与其中，最后回到用户真正想留住的生活时刻。</p></article>
        <article><small>CREATIVE TERRITORY 01</small><h3>The After-Dinner Reset</h3><p>场景问题 → 产品进入 → 连续操作 → 同条件结果。镜头聚焦餐区硬地，不夸大污渍，也不把单次演示泛化成所有地面或污渍的保证。</p></article>
        <article><small>CREATIVE TERRITORY 02</small><h3>See the Motion</h3><p>解释双头结构、真实运行与地面接触。运动必须来自真实产品视频；静态图、生成画面或产品渲染不能充当运行证明。</p></article>
        <article><small>CREATIVE TERRITORY 03</small><h3>Make Room for What Matters</h3><p>用家庭相处与日常时刻承接情绪价值；人物素材需授权，不固定家务性别角色，不使用未经证实的用户评价。</p></article>
        <article><small>CREATIVE TERRITORY 04</small><h3>A Closer Look at M3</h3><p>通过整机、双头底座、手柄控制区与电池安装细节降低理解成本；每项说明必须对应官方产品源图、说明书或产品负责人确认，不凭静态图片推断按钮功能和性能。</p></article>
        <article><small>CREATIVE TERRITORY 05</small><h3>Real Home, Real Reset</h3><p>通过创作者真实持有、操作与表达补充第三方体验；合作披露、肖像、素材版权、剪辑权、使用期限和 Paid Usage Rights 分别确认，不预写正面评价。</p></article>
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
        <article><small>T-24 / APR 28 · LAUNCH CHARTER</small><h3>立项与目标确认</h3><p>Owner：GTM / Launch 负责人、Campaign / IMC 负责人。交付：Launch Charter、目标卡、SKU与市场范围、资源边界、关键依赖及风险清单。Gate：产品身份唯一、主业务目标明确、每项未知信息都有责任人与截止时间。</p></article>
        <article><small>T-12 / MAY 01–10 · STRATEGY & READINESS</small><h3>产品事实、定位与传播策略锁定</h3><p>Owner：产品 / 研发、Product Marketing、Campaign / IMC。交付：Product Fact Pack、Positioning / KSP、Message House、Big Idea、Creative Territories、渠道角色与资源需求。Gate：产品Claim可追溯；用户洞察假设与已验证事实分开标记。</p></article>
        <article><small>T-5 / MAY 15–17 · LAUNCH PREFLIGHT</small><h3>内容、视觉与渠道预检</h3><p>Owner：Campaign / IMC；协同内容 / 社媒、视觉、视频、Paid、PR / Creator、CRM与数据。交付：Campaign Brief、内容矩阵、资产版本清单、发布排期、权利记录、UTM / Event与邮件检查。Gate：每项资产明确Owner、Proof、CTA、依赖与使用权限。</p></article>
        <article><small>T-3 / MAY 19–21 · PRODUCT & SUPPLY GATE</small><h3>量产、库存与履约放行</h3><p>Owner：产品 / 研发、供应链与客服。交付：SKU / 配件核对、QC放行、可售库存、配送与退换安排、客服FAQ及最终素材实物核对。Gate：质量、库存、履约和客服能够承接传播承诺；未通过则暂停受影响的购买动作。</p></article>
        <article><small>T0 / MAY 22 · DIGITAL LAUNCH</small><h3>数字发布与产品演示</h3><p>Owner：Campaign / IMC；执行：内容 / 社媒、视觉与视频。交付：Launch KV、Hero Film、产品演示、FAQ与跨平台适配。Gate：产品Claim、素材、Logo、权利和平台安全区通过审核；购买CTA与实际开放状态一致。</p></article>
        <article><small>T+1 / MAY 23–25 · FIRST-SALE WINDOW</small><h3>首销窗口与渠道协同</h3><p>Owner：GTM / Launch、Paid Media与商业 / 供应链。交付：获批的Paid变体、Creator发布、许可Email、社群问答与订单监控。Gate：价格、Offer、库存、支付、配送、客服、合作披露和测量均通过后，才开放购买型传播。</p></article>
        <article><small>T+4 / MAY 26 · EARLY REVIEW</small><h3>阶段复盘与优化决策</h3><p>Owner：Campaign / IMC、Measurement / Data及渠道负责人。交付：按平台、素材、受众、有效观看、访问与订单质量拆解的Early Review。决策：STOP / CONTINUE / FIX / OBSERVE；数据未成熟时不宣布Winner或ROI。</p></article>
        <article><small>EOL / MAY 31 · CLOSEOUT & LIFECYCLE HANDOFF</small><h3>项目收尾与生命周期交接</h3><p>Owner：GTM / Launch、Campaign / IMC、CRM / Lifecycle与Measurement / Data。交付：素材与权利归档、订单/退款/库存复核、临时Offer与标签关闭、用户状态及后续责任交接。未成熟数据保留后续复核窗口。</p></article>
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
        <article><small>PROJECT CONTROL</small><h3>把策略拆成可交付单元</h3><p>形成 23 个社媒内容 / 运营槽位、15 条 IMC 渠道与协同链路，并建立 Campaign 资产清单、版本追踪与发布 Gate。每项明确日期、平台、内容任务、CTA、Owner、素材依赖与验收条件。</p></article>
        <article><small>CROSS-FUNCTIONAL DELIVERY</small><h3>产品、营销与供应链三线协同</h3><p>产品 / 研发确认 SKU、功能和证明；营销组织 Campaign、内容、视觉、视频、Paid、PR / Creator 与 CRM；供应链 / 客服确认库存、配送、退换和假期值守。</p></article>
        <article><small>RELEASE GATES</small><h3>条件未满足，先暂停对应动作</h3><p>产品 Claim 未签核 → 暂停参数传播；真实演示缺失 → 不发布运动证明；Offer / 库存 / 履约未确认 → 不开放购买 CTA；Creator 权利未齐 → 不发布或复用；测量口径未就绪 → 不宣称 ROI。</p></article>
      </div>
      <p class="g-chart-note">证据边界：这是 2026 年 5 月计划版本的匿名化规划重建，不代表已发布、已投放、已成交或已实现 ROI。现有视觉资产 Tracker 中仍有设计待完成、占位和真实演示素材依赖；本规划不将其写成最终成品。简历记录的约 +3% 阶段销量表现与本计划分开呈现，不归因于本 Campaign。</p>
      <p class="g-chart-note">上述测试项来自品牌屋中的传播测试计划，当前材料没有 A/B 测试执行记录或测试结果，不作为已验证的投放结论。</p>

      <div class="g-project-list g-project-calendar-plan">
        <article><small>GTM / LAUNCH MANAGEMENT</small><h3>管理产品进入市场的完整路径</h3><p>从市场机会、目标用户、产品定位与卖点，延伸到价格/Offer、库存、交易承接、履约、客服和生命周期交接。GTM 管理的不是一张传播日历，而是产品是否具备上市和商业承接条件。</p></article>
        <article><small>IMC / CAMPAIGN MANAGEMENT</small><h3>管理整合传播系统</h3><p>将一个业务目标转化为统一传播命题，再按用户决策阶段分配 Owned、Paid、Earned、Shared、Creator、PR、CRM 与 Measurement 的角色，让不同触点承担不同任务。</p></article>
        <article><small>OWNER BOUNDARY</small><h3>区分 GTM Owner 与 Campaign Owner</h3><p>GTM / Launch 负责人负责上市目标、商业准备、跨部门决策与生命周期交接；Campaign / IMC 负责人负责 Campaign 目标、Big Idea、渠道组合、Activation、Distribution 和复盘。产品事实、专业渠道执行、供应链与客服仍由对应职能负责人签核。</p></article>
        <article><small>MANAGEMENT OUTPUT</small><h3>用可验收的工作物组织团队</h3><p>Launch Charter、RACI、阶段里程碑、Content Matrix、Asset Register、预算与资源、发布 Gate、KPI Dictionary、风险升级和 Closeout。突出目标拆解、资源组织、进度控制、质量管理与结果复盘。</p></article>
      </div>

      <div class="g-project-list g-project-calendar-plan">
        <article><small>GTM LAUNCH CHARTER / BUSINESS DECISION</small><h3>先判断产品是否具备进入市场的条件</h3><p>Launch Charter锁定目标市场、唯一SKU/版本、上市窗口、Primary Business Objective、受众假设、商业约束、资源边界、关键依赖与决策Owner。目标值、预算、Offer和库存未审批时保留TBD，不把假设写成事实。</p></article>
        <article><small>GTM READINESS / FIVE GATES</small><h3>把商业准备拆成可验收条件</h3><p>Product Truth & Proof：型号、规格、测试和公开权限；Commercial：价格、Offer与贡献；Supply：量产、QC、库存和履约；Channel：账户、素材、权利与CTA；Measurement：UTM/Event、订单对账和指标口径。任何Gate未通过，只暂停受影响的发布或购买动作。</p></article>
        <article><small>DECISION RIGHTS / RACI</small><h3>每项交付物有唯一最终负责者</h3><p>GTM / Launch 负责人负责上市目标、商业准备和生命周期交接；Campaign / IMC 负责人负责 Campaign 策略、Big Idea、渠道与复盘。产品 / 研发签核产品事实，Finance / Commercial 签核价格与 Offer，Supply Chain 签核库存履约，Measurement / Data 负责测量口径；各渠道与资产由对应职能负责人执行。</p></article>
        <article><small>STAGE-GATE CONTROL</small><h3>用阶段节点管理进度与风险</h3><p>T-24立项 → T-12产品/商业/资源锁定 → T-5内容与渠道预检 → T-3质量/库存/履约放行 → T0发布Gate → T+1首销监控 → T+4早期复盘 → EOL关闭与交接。上述节点属于2026年5月规划，不代表历史执行。</p></article>
      </div>
      <div class="g-project-list g-project-calendar-plan">
        <article><small>CROSS-FUNCTIONAL WORKSTREAMS</small><h3>将团队协作组织成五条工作流</h3><p>① Product Truth & Proof；② Commercial & Supply；③ Campaign & Creative；④ Channel Activation；⑤ Measurement & Lifecycle。每条工作流有输入、Owner、依赖、交付物、验收条件和异常升级路径。</p></article>
        <article><small>RESOURCE & CAPACITY MANAGEMENT</small><h3>管理人力、预算、素材与承接能力</h3><p>内容、视觉、视频、Paid、Creator、PR、CRM、测量、样品、库存、客服与履约均进入资源计划。预算、已承诺费用和实际支出未获证据时保持TBD；不虚构渠道预算比例或制作成本。</p></article>
        <article><small>MEASUREMENT / DECISION LOOP</small><h3>一个主结果、三层指标与明确动作</h3><p>Primary Result：净履约订单 / 净贡献；Leading Signals：平台原生Reach、有效观看、保存、分享、有效访问；Guardrails：CAC、贡献、退款、库存、履约、客服与合规。信号不足则OBSERVE；可修复则FIX；Guardrail破线则REDUCE / STOP / ROLLBACK。</p></article>
        <article><small>CLOSEOUT / LIFECYCLE HANDOFF</small><h3>结束Campaign，也要管理后续关系</h3><p>关闭临时Offer、标签、频次例外与受众规则；核对订单成熟度、退款、权利期限和客服问题；按Consent与真实用户状态交接欢迎、购后教育、售后、评价与复购。未成熟数据不包装为最终ROI。</p></article>
      </div>
      <div class="g-project-list g-project-calendar-plan">
        <article><small>CAMPAIGN STRATEGY FRAMEWORK / 01</small><h3>Business Context & Audience</h3><p>明确业务问题、市场、唯一SKU、目标用户、使用场景、购买障碍和证据来源。Review、VOC、搜索、客服与用户研究用于验证洞察；未验证内容标为假设。</p></article>
        <article><small>CAMPAIGN STRATEGY FRAMEWORK / 02</small><h3>Objective & Positioning</h3><p>设定一个Primary Business Objective和一个主行为目标；建立Positioning、KSP、Message House、RTB与Proof。每个卖点必须有事实来源、证明方式和适用边界。</p></article>
        <article><small>CAMPAIGN STRATEGY FRAMEWORK / 03</small><h3>Creative Platform & IMC Architecture</h3><p>从用户张力与产品真值推导Big Idea，再设计Creative Territories、渠道角色、用户旅程、Content Matrix和资产系统。渠道改变表达形式，不改变核心承诺与产品事实。</p></article>
        <article><small>CAMPAIGN STRATEGY FRAMEWORK / 04</small><h3>Activation, Governance & Learning</h3><p>将内容、视觉、视频、Paid、Creator、PR、CRM和测量拆成Owner、依赖、节点与Gate；上线后按Primary Result、Leading Signals和Guardrails复盘，形成下一轮决策。</p></article>
      </div>
      <div class="g-project-list g-project-calendar-plan">
        <article><small>CREATIVE THEME CONSTRUCTION</small><h3>用户张力 × 产品真值 × 品牌承诺</h3><p>Occasion / User Tension + Product Truth + Brand Promise + Desired Action → Big Idea → Creative Territories → Narrative → KV / Visual System → Channel Adaptations。创意主题必须同时具备用户相关性、产品可信度、品牌一致性、记忆点和延展性。</p></article>
        <article><small>BIG IDEA / M3</small><h3>MAKE ROOM FOR WHAT MATTERS.</h3><p>餐后清洁任务仍然存在，是用户张力；双头电动拖把的真实结构与操作，是产品角色；POWER EVERY MOVE 是品牌主张。情绪回报是清洁任务完成后回到生活时刻，不构成量化省时承诺。</p></article>
        <article><small>CREATIVE TERRITORIES</small><h3>从一个主题发展成不同创意机制</h3><p>The After-Dinner Reset：问题显化；See the Motion：机制揭示与真实动作证明；Make Room for What Matters：生活价值转译；A Closer Look at M3：产品细节解释；Real Home, Real Reset：真实体验证明。One Home, Different Cleaning Jobs 作为 Sustaining 阶段的品牌组合辅助层，不与五条创意领地混为一谈。每个方向都要写清受众、命题、产品角色、证据和边界。</p></article>
        <article><small>KV / VISUAL SYSTEM</small><h3>一套主视觉，多种渠道表达</h3><p>Master KV 负责建立主题、产品焦点、视觉层级和品牌识别；Feed、Story、Short Video、YouTube、PR和Email按画幅、安全区和传播任务独立适配。产品外观使用官方源图，文字与Logo后期排版；静态图不充当运动证明。</p></article>
      </div>
      <div class="g-project-list g-project-calendar-plan" id="campaign-mechanism-mapping">
        <article><small>MECHANISM 01 / PAIN-POINT EMERGENCE</small><h3>The After-Dinner Reset</h3><p>主机制：问题显化。用餐后地面黏污作为具体任务入口；辅助机制：连续过程证明。后续必须展示真实产品操作和相同条件的清洁过程，不能用夸张污渍或单次画面推导普遍性能。</p></article>
        <article><small>MECHANISM 02 / MECHANISM REVEAL</small><h3>See the Motion</h3><p>主机制：机制揭示。通过真实双头运行、接地和移动路径解释产品如何工作；辅助机制：微距细节证明。静态 KV、生成画面或渲染不能代替真实运行视频。</p></article>
        <article><small>MECHANISM 03 / ROLE-VALUE TRANSFER</small><h3>Make Room for What Matters</h3><p>主机制：关系价值转移。把产品动作放进家庭共同生活的情境；辅助机制：人物动作叙事。情绪收束不等于量化省时承诺，人物、音乐和场景素材仍需授权。</p></article>
        <article><small>MECHANISM 04 / MICRO-DETAIL PROOF</small><h3>A Closer Look at M3</h3><p>主机制：细节证明。通过整机、双头底座、手柄控制区和电池安装位置降低理解成本；每项功能说明必须对应官方源图、说明书或产品负责人确认。</p></article>
        <article><small>MECHANISM 05 / USER-EXPERIENCE PROOF</small><h3>Real Home, Real Reset</h3><p>主机制：真实体验证明。Creator 内容补充家庭场景中的实际操作；受众适配、披露、肖像、内容版权、剪辑权和 Paid Usage Rights 分别确认。</p></article>
      </div>
      <p class="g-chart-note">机制映射是依据现有 M3 创意方向与 Campaign 方法整理的策略重构，不表示五条内容均已发布或测试胜出。每个方向只设一个主机制；Hook 必须由后续信息兑现，视觉隐喻不能替代产品性能证据。</p>
      <div class="g-project-list g-project-calendar-plan">
        <article><small>CONTENT MATRIX / 01</small><h3>场景问题</h3><p>Awareness；餐后餐区地面与厨房日常清洁。用Feed、Story、问题讨论和场景短片建立相关性；CTA：Comment / Follow / Watch Demo。</p></article>
        <article><small>CONTENT MATRIX / 02</small><h3>情绪与品牌</h3><p>Awareness → Consideration；家庭共同分担与生活时刻。用节日KV、情绪短片和Hero Film建立品牌记忆；人物与音乐需授权。</p></article>
        <article><small>CONTENT MATRIX / 03</small><h3>产品机制证明</h3><p>Consideration；双头结构、真实运行和地面接触。用真实6–10秒演示和结构轮播解释产品如何工作；没有实拍不发布运动证明。</p></article>
        <article><small>CONTENT MATRIX / 04</small><h3>功能与操作教育</h3><p>Consideration；产品结构、控制区、电池安装、水箱与显示细节。用Feature Carousel、短片和信息图降低理解成本；参数需产品 / 研发负责人签核。</p></article>
        <article><small>CONTENT MATRIX / 05</small><h3>FAQ 与异议</h3><p>Consideration → Conversion；产品身份、操作方式和已确认边界。用FAQ轮播、社群问答与短答解决真实疑问；未知答案不推测。</p></article>
        <article><small>CONTENT MATRIX / 06</small><h3>Creator / UGC</h3><p>Consideration → Conversion；真实家庭演示和创作者体验。Brief、合同、披露、肖像权、内容版权与Paid Usage Rights分开确认；投稿不等于商用授权。</p></article>
        <article><small>CONTENT MATRIX / 07</small><h3>转化承接</h3><p>Conversion；产品信息、获批Offer、Paid变体、许可Email和现有商品承接页。价格、库存、支付、配送、客服与测量未通过时不开放购买CTA。</p></article>
        <article><small>CONTENT MATRIX / 08</small><h3>品牌组合教育</h3><p>Sustaining；五款产品、四条产品线的任务差异。M3保持主角，其他型号只使用各自官方图片和事实；源图或事实缺失时暂停。</p></article>
      </div>
      <div class="g-project-list g-project-calendar-plan">
        <article><small>CONTENT MATRIX ≠ CONTENT CALENDAR</small><h3>先定义内容策略，再分配发布日期</h3><p>Content Matrix 回答对谁、在哪个决策阶段、用什么内容完成什么传播任务；Content Calendar 再安排日期、平台、Owner、资产、CTA与发布状态。当前工作簿已建立7个核心内容支柱及1个品牌组合辅助层、23个社媒发布/运营槽位和15条IMC协同链路。</p></article>
        <article><small>MEASUREMENT & DECISION</small><h3>一个主结果，三层指标</h3><p>Primary Result：净履约订单 / 净贡献；Leading Signals：平台原生Reach、有效观看、保存、分享、有效访问和邮件点击；Guardrails：CAC、贡献毛利、退款/取消、库存、履约、客服和合规。平台归因不等于增量。</p></article>
        <article><small>VISUAL ASSET LIBRARY / R3 REVIEW</small><h3>KV 版式修订与产品源图保真</h3><p>R3 Layout Fix Review已上传4:5与9:16两版。4:5完整显示双盘底座与拖布垫，CTA不再遮挡产品；9:16放大产品主体并保持整机完整。两版均以黄色M3官方右视图为源图，未重绘产品结构；当前仍待品牌、产品负责人和平台安全区验收，不是最终Approved。</p><p>R2原稿保留为版本历史；其他资产包括Contact Sheet v2、Dual-Head Detail、Handle Control Detail、Battery Detail与Campaign Visual Asset Pack v2。</p><p>准确文件链接保留在配套Campaign策略文档与工作簿，公开站点不写入外部Drive URL。</p></article>
        <article><small>WORKING DOCUMENTS</small><h3>策略、矩阵与排期持续维护</h3><p>配套工作文档包含GTM / IMC管理模型、Campaign Strategy、Creative Theme Development、Campaign Content Matrix、社媒逐日排期和IMC渠道协同矩阵。页面展示方法与工作物关系；云端文件链接保留在文档与工作簿中。</p><p><a href="#/case/gtm/strategy">查看本案例策略章节 ↗</a></p><p>计划状态与素材状态分别展示；未通过产品事实、权利、交易、履约或测量Gate的内容保持HOLD / PREPARE_ONLY。</p></article>
      </div>
`, "product-portfolio");
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
    const expoPhoto = (file, alt, masks = []) => `<span style="position:relative;display:block;width:100%;overflow:hidden;border-radius:.35rem;line-height:0;">${image(file, alt, "jpg")}${masks.map(([left, top, width, height]) => `<span aria-hidden="true" style="position:absolute;z-index:2;left:${left}%;top:${top}%;width:${width}%;height:${height}%;display:block;border-radius:.12rem;background:rgba(166,174,170,.96);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);pointer-events:none;"></span>`).join("")}</span>`;
    return section("瑞音博｜海外 B2B 展会项目参与", "任职期间参与的海外展会项目 · 展位视觉、产品系统陈列与现场展示", `
      <div class="g-project-feature g-project-wide-image">
        <figure>${expoPhoto("exhibition-booth-overview-redacted", "瑞音博任职期间参与的海外展会展位全景，第三方品牌标识已脱敏", [[2.5, 23.5, 10, 9], [96, 29, 4, 8]])}<figcaption>展位全景 · 第三方品牌标识已脱敏</figcaption></figure>
        <div class="g-project-list">
          <article><small>PROJECT PARTICIPATION</small><h3>海外展会项目参与</h3><p>该组照片来自本人确认参与的瑞音博任职期间海外展会项目。页面以现场照片呈现展位空间、展示结构与产品陈列，不将项目参与扩大表述为独立主导整场展会。</p></article>
          <article><small>EXHIBITION PRESENCE</small><h3>展位空间与现场展示</h3><p>从展台结构、主视觉、空间层次和展示动线观察现场呈现方式，保留真实展会环境，展示海外 B2B 展会的品牌接触场景。</p></article>
          <article><small>PRODUCT SYSTEM</small><h3>产品系统陈列</h3><p>展示墙将光伏、逆变器、储能电池、柴油发电机与家庭用电负载放在同一系统关系中，便于参观者从组件和应用场景理解产品组合。此处仅描述照片中可见的展示内容，不延伸为产品技术方案设计责任。</p></article>
        </div>
      </div>
      <div class="g-product-gallery" aria-label="瑞音博任职期间参与的海外展会现场与产品展示照片">
        <figure>${expoPhoto("exhibition-booth-angle-redacted", "海外展会展台侧面视角，第三方品牌标识已脱敏", [[69, 43, 20, 8], [46, 76, 12, 8], [2, 82, 22, 7], [87, 51, 10, 12]])}<figcaption><b>Booth & Messaging</b><span>展台侧面与展示信息 · 品牌标识已脱敏</span></figcaption></figure>
        <figure>${expoPhoto("exhibition-product-display-redacted", "储能产品系统展示墙与设备陈列，设备品牌标识已脱敏", [[83.5, 27, 5.5, 4], [95, 27, 4.5, 4], [83.5, 39, 5.5, 4], [95, 39, 4.5, 4], [83.5, 51, 5.5, 4], [95, 51, 4.5, 4], [83.5, 63, 5.5, 4], [95, 63, 4.5, 4], [83.5, 75, 5.5, 4], [95, 75, 4.5, 4], [83.5, 87, 5.5, 4], [95, 87, 4.5, 4], [1, 78, 5, 8]])}<figcaption><b>Product Display</b><span>系统展示墙与设备陈列 · 设备品牌标识已脱敏</span></figcaption></figure>
      </div>
      <p class="g-chart-note">公开展示版本对展位标识、设备品牌字样、可识别型号及编号进行脱敏；原始照片保持不变。当前证据支持项目参与及现场展示，不包含可核验的个人具体职责、展会名称与日期、客户线索量或成交结果，因此不展示未经证实的管理范围和量化业绩。</p>`, "expo-project");
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
