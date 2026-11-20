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
    return section("用两种清洁任务讲清品牌定位", "美国市场 · 品牌屋与整合传播", `
      <div class="g-project-feature">
        <a href="assets/projects/brand-house.webp" target="_blank" rel="noopener noreferrer" aria-label="放大匿名品牌屋">${image("brand-house", "品牌屋总览，包含定位、四条产品线、目标人群和传播支柱")}</a>
        <div>
          <h3>品牌定位：把产品放回具体清洁任务</h3>
          <p>面向美国市场的家用电动清洁工具，优先解决餐区硬地黏污，以及浴缸内沿、墙砖接缝和边角的刷洗问题。产品由电机带动清洁头，用户控制握持位置、角度和移动路径。</p>
          <h3>按三类购买任务组织沟通</h3>
          <p>餐区清洁者关注扫过后仍然粘脚的脚印和溅渍；浴室清洁者关注刷头够不到的内沿与接缝；替家人购买的人，需要先确认握持、转向、换刷头和适用表面。</p>
          <p><a href="#/case/brand/brand-collaboration">查看联合抽奖海报 ↗</a> · <a href="#/case/brand/pr-project">查看北美新闻稿分发 ↗</a></p>
        </div>
      </div>
      <div class="g-project-list">
        <article><small>3C / CUSTOMER</small><h3>从任务识别需求</h3><p>餐区硬地的黏污、浴室边角的触达，以及礼赠购买时对操作与配件的确认，是品牌沟通优先回答的问题。</p></article>
        <article><small>3C / COMPETITOR</small><h3>按工具能力建立参照</h3><p>旋转拖把强调动力旋转；吸洗一体机强调碎屑与清洗的组合；长柄电动刷强调杆长与刷头角度。用结构、触达位置和动作比较各工具的任务适配度。</p></article>
        <article><small>STP / POSITIONING</small><h3>主推双盘拖把与长柄刷</h3><p>双盘拖把负责餐区硬地，展示站姿推进和转向；长柄刷负责浴室边角，展示调杆、调角和刷头接触。品牌广告与社媒优先围绕这两类任务建立识别。</p><p><a href="#/case/gtm/launch-decisions">查看餐后硬地场景如何进入 M3 上市方案 ↗</a></p></article>
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
      <div class="g-story-note">
        <h3>同一个品牌主张，三种具体交付</h3>
        <ul>
          <li><a href="#/case/brand/brand-collaboration">联合抽奖海报</a>将家庭种植和清洁工具放进同一生活场景，交代奖品与参与时间。</li>
          <li><a href="#/case/brand/pr-project">北美新闻稿</a>按全屋清洁任务安排四条产品线，可核对 2026 年 5 月新闻稿栏目分发。</li>
          <li><a href="#/case/creative/video-projects">演示视频拆解</a>把卖点落到接触位置、持握姿势和连续动作。</li>
        </ul>
      </div>
      <p class="g-chart-note">品牌屋中的竞品参照属于功能与任务层面的定性比较；现有材料没有市场规模、竞品份额或价格调查数据。</p>`, "brand-positioning");
  }

  function gtm() {
    return section("M3 上市策略与执行取舍", "从主推场景、团队交付到美国上市节奏与美英本地化。", `
      <div class="g-project-list g-project-calendar-plan" id="launch-decisions">
        <article><small>市场与产品</small><h3>把主推场景收敛到餐后硬地</h3><p>2026 年 5 月，美国市场上市规划。以餐区和厨房的日常清洁为入口，用 M3 的双圆盘与 D 形握把解释产品；浴室边角交给长柄电动刷。餐后场景为优先验证的受众假设。</p><p><a href="#/case/brand/brand-positioning">查看品牌定位依据 ↗</a></p></article>
        <article><small>我的职责</small><h3>负责社媒策略与内容团队交付</h3><p>参与用户研究、差异化定位和卖点分层，负责把传播策略拆成社媒排期、素材要求和验收项。产品 / 研发核验卖点，商业与供应链确认可售条件，客服接收常见问题。</p><p><a href="#/case/gtm/management">查看协作与验收 ↗</a></p></article>
      </div>
      <div class="g-project-list g-project-calendar-plan">
        <article><small>内容与渠道</small><h3>从餐后话题到发布承接</h3><p>预热用 Feed 和 Story 询问用户先清洁哪一处；考虑阶段用轮播展示双圆盘和握把，并将地面适用性等问题交给产品、客服核验。美国执行表以 5 月 22 日为计划发布节点，PR 用可公开的产品资料，CRM 按许可触达，Paid 在发布后验证开场。</p></article>
        <article><small>上线与复盘</small><h3>按证据和商业就绪度切换 CTA</h3><p>商品资料可用时引导了解产品，目的页有连续实拍时才引导观看演示；当地价格、库存、支付与履约确认后开放购买。财务对账后的净履约订单是主结果，净贡献决定是否扩大投入；有效观看、商品页访问用来定位问题。</p></article>
      </div>
      <div class="g-story-note">
        <h3>购买前的三个问题，怎样让内容回答</h3>
        <p>这是上市规划中的验证问题。社群与客服后续可用真实反馈校正优先级。</p>
        <div class="g-proof-table">
          <table>
            <thead><tr><th scope="col">用户会问</th><th scope="col">用什么回答</th><th scope="col">交付到哪里</th></tr></thead>
            <tbody>
              <tr><th scope="row">双盘怎样接触地面？</th><td>连续实拍展示双盘运行、接地与推进路径。</td><td>演示短片、创作者拍摄 Brief</td></tr>
              <tr><th scope="row">要怎么握持和转向？</th><td>产品原图说明握把结构，操作镜头展示握持与转向。</td><td>结构轮播、操作演示</td></tr>
              <tr><th scope="row">我的地面适用吗？</th><td>产品与客服按当地型号核对说明书和适用条件。</td><td>FAQ、客服答复</td></tr>
            </tbody>
          </table>
        </div>
        <p><a href="#/case/gtm/market-adaptation">看同一卖点如何改写成美国与英国的 Story 文案 ↗</a></p>
      </div>
      <p class="g-chart-note">23 个社媒内容与运营槽位、15 条 IMC 协同链路是总体规划交付。5 月 22 日为计划节点；本案例没有可核验的 M3 发布、投放、订单或 ROI 记录。</p>
      <section class="g-module g-project" id="market-adaptation" aria-labelledby="market-adaptation-heading">
        <header><h2 id="market-adaptation-heading">M3 美英本地化工作样例</h2><p>沿用美国上市规划的产品与传播主线，另做两地可用的文案和素材适配。以下样例来自 R12 创意指南和双市场文案表。</p></header>
        <div class="g-project-list">
          <article><small>共享主视觉</small><h3 lang="en">From grip to floor.</h3><p>整机亮相用同一产品原图与版式。进入餐后场景时，两地沿用 <span lang="en">Dinner’s done. Floor’s next.</span>，把焦点放在日常清洁。</p></article>
        </div>
        <div class="g-project-list g-project-calendar-plan" aria-label="Story 投票美英对照">
          <article><small>美国 · en-US</small><h3 lang="en-US">Kitchen or entryway?</h3><p lang="en-US">After-dinner cleanup · Mom’s favorite moments</p></article>
          <article><small>英国 · en-GB</small><h3 lang="en-GB">Kitchen or hallway?</h3><p lang="en-GB">After-dinner clean-up · Mum’s favourite moments</p></article>
        </div>
        <p>两地分别核对节日档期、页面与供货。美国和英国各自比较「餐后场景」与「产品结构」开场；市场内固定正文、受众、版位和落地页，再比较当地数据。</p>
        <div class="g-project-list g-project-calendar-plan">
          <article><h3>产品图核对可见结构</h3><p>用原图核对双圆盘、握把与侧置电池安装位。性能参数、适用地面与配件兼容性由产品团队按当地 SKU、说明书与测试条件签核。</p></article>
          <article><h3>演示和创作者内容先确认素材</h3><p>8 秒脚本安排双盘近景接连续实拍。缺少运行素材时，用结构图配 <span lang="en">Explore M3</span>。<span lang="en">See M3 in action</span> 需链接到真实演示；创作者内容另行确认披露与商用权限。</p></article>
        </div>
        <p class="g-chart-note">R12 本地化工作包含每个市场 25 条文案、17 份共享及分区静态文件、6 组视频与创作者脚本。以上为交付物数量。英国样例的上线与测试状态未核实。</p>
      </section>

      <details class="g-chart-disclosure"><summary>查看上市里程碑与创意验证细节</summary>
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
      <div class="g-project-list g-project-calendar-plan" id="campaign-mechanism-mapping">
        <article><small>MECHANISM 01 / PAIN-POINT EMERGENCE</small><h3>The After-Dinner Reset</h3><p>主机制：问题显化。用餐后地面黏污作为具体任务入口；辅助机制：连续过程证明。后续必须展示真实产品操作和相同条件的清洁过程，不能用夸张污渍或单次画面推导普遍性能。</p></article>
        <article><small>MECHANISM 02 / MECHANISM REVEAL</small><h3>See the Motion</h3><p>主机制：机制揭示。通过真实双头运行、接地和移动路径解释产品如何工作；辅助机制：微距细节证明。静态 KV、生成画面或渲染不能代替真实运行视频。</p></article>
        <article><small>MECHANISM 03 / ROLE-VALUE TRANSFER</small><h3>Make Room for What Matters</h3><p>主机制：关系价值转移。把产品动作放进家庭共同生活的情境；辅助机制：人物动作叙事。情绪收束不等于量化省时承诺，人物、音乐和场景素材仍需授权。</p></article>
        <article><small>MECHANISM 04 / MICRO-DETAIL PROOF</small><h3>A Closer Look at M3</h3><p>主机制：细节证明。通过整机、双头底座、手柄控制区和电池安装位置降低理解成本；每项功能说明必须对应官方源图、说明书或产品负责人确认。</p></article>
        <article><small>MECHANISM 05 / USER-EXPERIENCE PROOF</small><h3>Real Home, Real Reset</h3><p>主机制：真实体验证明。Creator 内容补充家庭场景中的实际操作；受众适配、披露、肖像、内容版权、剪辑权和 Paid Usage Rights 分别确认。</p></article>
      </div>
      <p class="g-chart-note">机制映射是依据现有 M3 创意方向与 Campaign 方法整理的策略重构，不表示五条内容均已发布或测试胜出。每个方向只设一个主机制；Hook 必须由后续信息兑现，视觉隐喻不能替代产品性能证据。</p>
      </details>
      <details class="g-chart-disclosure"><summary>查看四条产品线与官方产品图</summary>
      <div class="g-project-feature g-project-product"><div class="g-project-list">${productLines.map(([line, product, task, demo]) => `
        <article><small>${line}</small><h3>${product}</h3><p>${task}。${demo}</p></article>`).join("")}</div>
        <figure>${image("m3-yellow-main", "双盘拖把黄色款整机外观，展示双圆拖布头、黄色机身与手柄结构")}<figcaption><b>双盘拖把 · 整机外观</b><span>采用黄色款真实产品原图，保留整机比例、双盘底座与手柄结构</span></figcaption></figure>
      </div>
      <div class="g-product-gallery" aria-label="双盘拖把产品外观细节">
        <figure>${image("m3-yellow-battery", "双盘拖把黄色款主机背部与外置电池安装位置")}<figcaption><b>Battery Detail / 电池安装</b><span>使用原始产品图展示电池安装位置，不以示意图替代真实结构</span></figcaption></figure>
      </div>
      </details>
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
        <h3>可核验的分发结果</h3>
        <p>现有截图可核验 King Newswire 的新闻稿分发，刊载位置为 USA Today 的 Press Release 栏目。</p>
        <p class="g-chart-note">页面标题日期为 May 15, 2026，侧栏日期为 May 14, 2026；公开展示只保留 2026 年 5 月，具体发布日期待核。当前没有可核验的转载量、阅读量、媒体触达或 Share of Voice 数据。</p>
      </div></div>`, "pr-project");
  }

  function brandCampaign() {
    return section("家居品牌联合抽奖", "将家庭种植与日常清洁放进同一个家居场景。", `
      <div class="g-project-feature g-project-wide-image">
        <figure>${image("joint-giveaway", "脱敏的联合抽奖海报，展示家庭种植设备、电动清洁刷和海报日期")}<figcaption>联合活动主视觉 · 海报标示 4 月 18–28 日，年份待核</figcaption></figure>
        <div class="g-project-list">
          <article><h3>用共同场景连接两类产品</h3><p>家庭种植设备和电动清洁刷同框。画面先让用户看懂两类奖品及其使用场景，再用活动名称和日期交代参与窗口。</p></article>
          <article><h3>合作执行需要双方确认的事项</h3><p>在活动管理方案中，由牵头方统一资格、活动时区与规则。合作双方分别确认发布窗口、素材使用和奖品履约。复盘按各渠道发布记录、有效参与、奖品发放分开核对。</p></article>
          <article><h3>现有交付证据</h3><p>海报可核对联合主题、奖品组合及画面标示时间。双方实际分工、发布链接、有效参与和发奖记录待补。</p></article>
        </div>
      </div>`, "brand-collaboration");
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
    return section("Creator Desk 创作者合作审核", "工作台原型 · 从来信提取候选事项，由负责人确认合作承诺及素材权利。", `
      <div class="g-project-list g-project-calendar-plan">
        <article><h3>选题和交付先写进 Brief</h3><p>按目标市场、受众和内容风格筛选创作者。Brief 写清产品事实、演示任务、交付形式和审核责任，供内容审核时逐项核对。</p></article>
        <article><h3>报价、交付和付款逐项核对</h3><p>演示邮件将报价、交付、付款放入待确认清单。负责人查原邮件，确认条款后再审核对应回复草稿。</p></article>
        <article><h3>来信提及授权，进入待核验</h3><p>若对方提出授权，先核对是否已有书面许可，再登记允许的平台、地域、期限及用途。品牌转发、剪辑和付费使用分别核对。</p></article>
        <article><h3>交付审核对应具体版本</h3><p>逐条核对产品事实、合作披露和修订意见。通过审核的内容版本与对应授权一起留档，方便后续查找和复用。</p></article>
      </div>
      <p class="g-chart-note">页面依据 Creator Desk 演示界面的可见流程整理。原型使用演示记录，截图所示阶段的外部连接与邮件实际发送处于关闭状态。</p>`, "creator-project");
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
      <div class="g-project-list g-project-calendar-plan">
        <article><h3>先用主指南承接节后清洁</h3><p>1 篇主指南负责把万圣节后的清洁任务讲清楚，9 篇专题再按地面、浴室、门廊、宠物毛发和厨房等具体问题展开。</p></article>
        <article><h3>按搜索意图决定内容深度</h3><p>糖浆黏污专题先说明表面与操作条件，服务有明确清洁问题的读者。电动刷与传统拖把的对比服务正在选工具的人，按污渍、接触表面和操作方式组织比较。</p></article>
      </div>
      <details class="g-chart-disclosure"><summary>查看十篇英文选题与搜索意图</summary>
        <div class="g-project-list g-project-calendar-plan">${articles.map(([id, title, type, intent]) => `
          <article><small>${esc(id)} · ${esc(type)}</small><h3 lang="en">${esc(title)}</h3><p lang="en">${esc(intent)}</p></article>`).join("")}</div>
      </details>
      <p class="g-chart-note">以上为选题与内容规划。实际发布、索引状态和 GSC 表现待核。</p>`, "seo-cluster");
  }

  function operations() {
    return section("一次活动如何排期和验收", "社媒小组的项目分工与审核清单", `
      <div class="g-project-list g-project-calendar-plan">
        <article><h3>选题与排期</h3><p>我从季度主推主题选定产品和场景，给 Facebook、Instagram 和 Group 分配内容任务，并确认每条内容的负责人和交付时间。</p></article>
        <article><h3>产品与素材确认</h3><p>产品同事核对功能、参数和适用条件。社媒小组确认拍摄清单、素材权限和链接后，将 Brief 交给设计和视频同事。</p></article>
        <article><h3>创意与发布审核</h3><p>脚本审用户问题和演示顺序，画面审产品结构与操作，发布前检查文案、字幕、链接和平台版本。</p></article>
        <article><h3>复盘与下月安排</h3><p>按平台看浏览、互动和反馈。把反复出现的产品问题补进 FAQ，把返工项写回审核清单和下一轮 Brief。</p></article>
      </div>
      <div class="g-story-note">
        <h3>用父亲节日历演示一次项目交接</h3>
        <p>这份规划把长柄刷交给浴室边角演示，把双盘拖把交给餐后硬地内容。社媒小组先确定平台、负责人和素材需求，产品同事确认结构及使用条件，设计与视频分别完成轮播和操作镜头。Day 29 核对文案、画面、字幕、链接和各平台版本，Day 30 汇总待处理问题，作为下一轮 Brief 的输入。</p>
        <p class="g-chart-note">30 个相对排期节点含 28 个对外内容概念和 2 个内部节点。该日历是交付工作样例。</p>
        <a class="featured-detail" href="#/case/social/fathers-day-calendar">查看双语日历与验收节点 ↗</a>
      </div>`, "team-delivery");
  }

  const extras = {
    brand: { strategy: brand, execution: () => pr() + brandCampaign() },
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
