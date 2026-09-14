const content = document.querySelector('#content');
const gate = document.querySelector('#gate');

// 当前版本不设置密码，直接显示页面内容。
if (gate) gate.remove();
if (content) {
  content.classList.add('is-ready');
  content.setAttribute('aria-hidden', 'false');
}

const dayDialog = document.querySelector('#day-dialog');
const dayDetail = document.querySelector('#day-detail');
const daySources = document.querySelector('.day-detail-source');
const closeDialog = document.querySelector('.dialog-close');

const structuredPlans = {
  day1: {
    meta: [['出发', '北京北/清河 07:30–09:20'], ['路线', '高铁 → 酒店寄存 → 老城步行线'], ['核心', '6 处建筑短停 + 老街晚餐'], ['住宿', '呼和浩特市区 1 晚']],
    title: '执行顺序',
    steps: [['11:00–12:30', '到站、打车到酒店寄存行李，先解决午餐。'], ['12:30–15:00', '宝尔汗佛塔 → 观音寺 → 大召寺 → 塞上老街；建筑以拍照和快速参观为主。'], ['15:00–16:30', '步行/打车到清真大寺、五塔寺，各停留约 20–30 分钟。'], ['16:40–17:30', '打车到将军衙署；抵达晚或临近闭馆时保留前段核心站点。'], ['17:30 后', '回大召寺/塞上老街吃晚餐；天气和体力允许，再去大青山观景平台。']]
  },
  day2: {
    meta: [['出发', '09:30–10:00 呼和浩特取车'], ['路线', '呼和浩特 → 辉腾锡勒 → 黄花沟 → 集宁'], ['驾驶', '约 235–280 km，4–5 小时'], ['住宿', '集宁连续住 3 晚']],
    title: '执行顺序',
    steps: [['09:30–10:00', '取车、检查车辆、加满油，导航前往辉腾锡勒。'], ['12:00–12:45', '在风车群、草原公路或开阔草甸短停。'], ['13:00–13:30', '转场到黄花沟南门，吃简餐、补水、确认返程路线。'], ['13:30–17:30', '黄花沟南门进出：先看沟顶草甸和观景台，再根据体力走一段沟底。'], ['17:30–20:00', '离开景区开往集宁，办理入住后用餐。']]
  },
  day3: {
    meta: [['出发', '09:30–10:00 集宁'], ['路线', '集宁 → 游客中心 → 3/5/6 号火山 → 集宁'], ['驾驶', '往返约 180 km，按 4 小时预留'], ['住宿', '集宁原酒店']],
    title: '执行顺序',
    steps: [['出发前', '加油、带水和简餐，穿防滑鞋；先确认景区预约、入口和自驾/景交车规则。'], ['11:00–12:00', '到游客中心完成购票/预约、如厕和补给，按当天单向或双向路线入园。'], ['12:00–13:00', '3 号火山：栈道登顶或走到观景位置，往返约 40–60 分钟。'], ['13:15–14:15', '5 号火山：看完整火山锥和碎石坡，车上或山脚简餐。'], ['14:30–15:15', '6 号火山：看黑色熔岩和拍摄点，山脚拍照即可。'], ['15:30–16:30', '时间充足再看 7、8 号；随后离园返程。']]
  },
  day4: {
    meta: [['出发', '09:30–10:00 集宁'], ['路线', '集宁 → 苏木山游客中心 → 森林步道 → 集宁'], ['徒步', '核心约 3–4 小时，全天 5–6 小时'], ['住宿', '集宁原酒店']],
    title: '执行顺序',
    steps: [['出发前', '加油、带午餐和饮水，查看开放、接驳车、索道和天气公告。'], ['11:00–12:00', '到游客中心购票并确认接驳，按“接驳上山、步道下行”思路安排。'], ['12:00–13:00', '进入白桦林步道，边走边拍照，核心步道约 3–4 小时。'], ['13:00–15:30', '黄石崖（望天崖）看山脊视野，再根据体力走向冰凌沟。'], ['15:30–17:00', '返回游客中心，补给后离园；大风、降雪或路滑时缩短线路。'], ['17:00–19:00', '开回集宁，晚餐后继续住原酒店。']]
  },
  day5: {
    meta: [['出发', '集宁酒店 08:00–09:00'], ['路线', '酒店 → 乌兰察布站 → 北京北/清河'], ['车程', '高铁约 1 小时 44 分–2 小时 05 分'], ['住宿', '无，返京']],
    title: '执行顺序',
    steps: [['08:00–09:00', '早餐、退房、整理行李。'], ['09:00–09:30', '前往乌兰察布站，建议至少提前 15–20 分钟进站。'], ['10:10 或 10:38', '优先考虑 G2482 到北京北或 G2502 到清河，适合睡晚一点。'], ['抵京后', '按到达车站选择地铁/打车回家；行程结束。'], ['备用方案', '异地还车受限时，09:30–10:00 开回呼和浩特，给还车、验车、午餐和进站预留 2–3 小时。']]
  }
};

const structuredPlans2 = {
  g2d1: {
    meta: [['出发', '北京北/清河上午车次'], ['路线', '高铁 → 酒店 → 老城景点'], ['核心', '大召寺、塞上老街与晚餐'], ['住宿', '呼和浩特连住 5 晚']],
    title: '执行顺序',
    steps: [['抵达后', '酒店寄存行李、午餐，下午游览大召寺、塞上老街及周边建筑。'], ['晚餐', '安排烧麦、手把肉、羊杂碎和奶茶。'], ['傍晚', '体力和天气合适时前往大青山观景平台。']]
  },
  g2d2: {
    meta: [['出发', '10:00 呼和浩特酒店'], ['路线', '黄花窝铺 → 红石崖'], ['驾驶', '约 115–175 km，3.5–5 小时'], ['住宿', '呼和浩特原酒店']],
    title: '执行顺序',
    steps: [['10:00–11:15', '前往黄花窝铺，入口附近短停拍草坡、林草交界和山谷。'], ['12:00–13:30', '转场红石崖，午餐、购票并确认自驾区域。'], ['13:30–16:15', '游览高山牧场、草甸、岩壁和寺院，项目按兴趣选择。'], ['16:15–18:00', '返呼，晚餐。']]
  },
  g2d3: {
    meta: [['出发', '10:00 呼和浩特酒店'], ['路线', '哈达门 → 敕勒川'], ['驾驶', '约 95–140 km，2.5–4 小时'], ['住宿', '呼和浩特原酒店']],
    title: '执行顺序',
    steps: [['10:00–11:15', '到哈达门停车场，购票并乘景交上山。'], ['12:00–14:30', '游览观景台、森林木栈道、高山草甸和小鹿互动区。'], ['15:00–16:30', '前往敕勒川，安排平地散步。'], ['17:30–18:30', '回呼市晚餐。']]
  },
  g2d4: {
    meta: [['出发', '10:00 呼和浩特酒店'], ['路线', '科凉线 → 牛粑粑 → 黄花沟外围 → 二阳卜'], ['驾驶', '约 280–360 km，4.5–6.5 小时'], ['住宿', '呼和浩特原酒店']],
    title: '执行顺序',
    steps: [['10:00–12:30', '出城前往辉腾锡勒方向。'], ['12:30–14:00', '牛粑粑草原看湖面、风车和草地，安排简餐。'], ['14:00–16:00', '黄花沟南门外围短停，前往二阳卜村及开放观景位置。'], ['16:00–19:00', '返呼，按完整远线车程安排。']]
  },
  g2d5: {
    meta: [['出发', '10:00 呼和浩特酒店'], ['路线', '博物院新馆 → 美术馆'], ['参观', '两馆约 6–7 小时含交通午餐'], ['住宿', '呼和浩特原酒店']],
    title: '执行顺序',
    steps: [['10:00–10:40', '前往内蒙古博物院新馆，按预约时段入馆。'], ['10:40–13:30', '参观草原历史、考古、民族文化和古生物展陈。'], ['13:30–14:40', '新华东街沿线午餐并前往美术馆。'], ['14:40–16:30', '参观当期展览；自然科普主题可替换为自然博物馆。']]
  },
  g2d6: {
    meta: [['出发', '呼和浩特酒店上午'], ['路线', '还车 → 呼和浩特东站'], ['车程', '市区还车与进站预留 2–3 小时'], ['住宿', '无，返京']],
    title: '执行顺序',
    steps: [['上午', '早餐、退房、整理行李，办理车辆还车。'], ['返程', '呼和浩特东站乘高铁返回北京，车次与票价按 12306 当日页面。']]
  }
};

function showDay(day) {
  const source = daySources.querySelector(`[data-day-detail="${day}"]`);
  if (!source) return;
  const plan = structuredPlans[day] || structuredPlans2[day];
  if (!plan) return;
  const summary = plan.meta.map(([label, value]) => `<div><span>${label}</span><b>${value}</b></div>`).join('');
  const steps = plan.steps.map(([time, text]) => `<li><time>${time}</time><p>${text}</p></li>`).join('');
  dayDetail.innerHTML = `<div class="detail-summary">${summary}</div><h4>${plan.title}</h4><ol class="detail-timeline">${steps}</ol>${source.innerHTML}`;
  if (typeof dayDialog.showModal === 'function') dayDialog.showModal();
  else dayDialog.setAttribute('open', '');
  document.body.classList.add('dialog-open');
}

if (dayDialog && dayDetail && daySources && closeDialog) {
  document.querySelectorAll('.day-trigger').forEach((card) => {
    card.addEventListener('click', () => showDay(card.dataset.day));
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        showDay(card.dataset.day);
      }
    });
  });

  closeDialog.addEventListener('click', hideDay);
  dayDialog.addEventListener('click', (event) => {
    if (event.target === dayDialog) hideDay();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && dayDialog.open) hideDay();
  });
}

function hideDay() {
  if (typeof dayDialog.close === 'function') dayDialog.close();
  else dayDialog.removeAttribute('open');
  document.body.classList.remove('dialog-open');
}
