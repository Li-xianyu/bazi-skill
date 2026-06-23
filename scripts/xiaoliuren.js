const { Solar, Lunar } = require('lunar-javascript');

// 六宫基础属性配置 (道传排法，兼容主流五行)
const PALACES = [
    { name: '大安', element: '木', deadGod: '青龙木' },
    { name: '留连', element: '水', deadGod: '腾蛇土' },
    { name: '速喜', element: '火', deadGod: '朱雀火' },
    { name: '赤口', element: '金', deadGod: '白虎金' },
    { name: '小吉', element: '水', deadGod: '玄武水' }, // 参考截图，小吉为水，玄武
    { name: '空亡', element: '土', deadGod: '勾陈土' }
];

// 地支五行映射
const ZHI_ELEMENTS = {
    '亥': '水', '子': '水',
    '寅': '木', '卯': '木',
    '巳': '火', '午': '火',
    '申': '金', '酉': '金',
    '辰': '土', '戌': '土', '丑': '土', '未': '土'
};

// 活六神顺序
const GODS_SEQ = ['青龙', '朱雀', '勾陈', '腾蛇', '白虎', '玄武'];

// 根据日干确定活六神起手索引（大安宫对应的活六神）
function getLivingGodStartIndex(dayGan) {
    if (['甲', '乙'].includes(dayGan)) return 0; // 青龙起大安
    if (['丙', '丁'].includes(dayGan)) return 1; // 朱雀起大安
    if (['戊', '己'].includes(dayGan)) return 2; // 勾陈起大安
    // 庚辛本来是白虎，但在六神循环中，有些排法庚辛起白虎，壬癸起玄武。
    if (['庚', '辛'].includes(dayGan)) return 4; // 白虎起大安
    if (['壬', '癸'].includes(dayGan)) return 5; // 玄武起大安
    return 0;
}

// 五行生克推导六亲 (以 body 为主，target 为客)
// 同我兄弟，生我父母，我生子孙，克我官鬼，我克妻财
function getLiuQin(bodyElement, targetElement) {
    if (bodyElement === targetElement) return '兄弟';
    
    const generates = { '木': '火', '火': '土', '土': '金', '金': '水', '水': '木' };
    const conquers = { '木': '土', '土': '水', '水': '火', '火': '金', '金': '木' };

    if (generates[targetElement] === bodyElement) return '父母';
    if (generates[bodyElement] === targetElement) return '子孙';
    if (conquers[targetElement] === bodyElement) return '官鬼';
    if (conquers[bodyElement] === targetElement) return '妻财';
    
    return '未知';
}

function calculateDaoistXiaoLiuRen(year, month, day, hour, minute, query) {
    let solar, lunar;
    if (!year || year === 'now') {
        solar = Solar.fromDate(new Date());
        lunar = solar.getLunar();
    } else {
        solar = Solar.fromYmdHms(parseInt(year), parseInt(month), parseInt(day), parseInt(hour), parseInt(minute), 0);
        lunar = solar.getLunar();
    }

    const lunarMonth = Math.abs(lunar.getMonth());
    const lunarDay = lunar.getDay();
    const timeZhi = lunar.getTimeZhi();
    const dayGan = lunar.getDayGan();
    
    const zhiArr = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];
    let hourSeq = zhiArr.indexOf(timeZhi) + 1;
    if (hourSeq === 0) hourSeq = 1;

    // 宫位计算
    const tianIndex = (lunarMonth - 1) % 6;
    const diIndex = (tianIndex + lunarDay - 1) % 6;
    const renIndex = (diIndex + hourSeq - 1) % 6;

    // 体用五行
    const tianPalace = PALACES[tianIndex];
    const diPalace = PALACES[diIndex];
    const renPalace = PALACES[renIndex]; // 人宫为体
    
    const tiElement = renPalace.element; // 体五行
    const yongElement = ZHI_ELEMENTS[timeZhi]; // 用五行（时辰地支五行）

    // 活六神起神
    const godStartIdx = getLivingGodStartIndex(dayGan);
    const getLivingGod = (palaceIndex) => GODS_SEQ[(godStartIdx + palaceIndex) % 6];

    const result = {
        query: query || "按时起卦",
        timeInfo: {
            solarTime: solar.toYmdHms(),
            lunarTime: lunar.toString(),
            dayGanZhi: lunar.getDayInGanZhi()
        },
        // 道传高阶排盘结果
        daoistChart: {
            tianGong: {
                name: tianPalace.name,
                element: tianPalace.element,
                liuQin: getLiuQin(tiElement, tianPalace.element),
                deadGod: tianPalace.deadGod,
                livingGod: getLivingGod(tianIndex)
            },
            diGong: {
                name: diPalace.name,
                element: diPalace.element,
                liuQin: getLiuQin(tiElement, diPalace.element),
                deadGod: diPalace.deadGod,
                livingGod: getLivingGod(diIndex)
            },
            renGong_Ti: {
                name: renPalace.name,
                element: renPalace.element,
                liuQin: '我(体)',
                deadGod: renPalace.deadGod,
                livingGod: getLivingGod(renIndex)
            },
            shiChen_Yong: {
                name: timeZhi + '时',
                element: yongElement,
                liuQin: getLiuQin(tiElement, yongElement),
                relation: getRelationDesc(tiElement, yongElement)
            }
        }
    };

    return result;
}

function getRelationDesc(ti, yong) {
    if (ti === yong) return '体用比和 (吉)';
    const generates = { '木': '火', '火': '土', '土': '金', '金': '水', '水': '木' };
    const conquers = { '木': '土', '土': '水', '水': '火', '火': '金', '金': '木' };
    
    if (generates[yong] === ti) return '用生体 (大吉)';
    if (generates[ti] === yong) return '体生用 (小凶, 耗泄)';
    if (conquers[yong] === ti) return '用克体 (大凶, 阻力)';
    if (conquers[ti] === yong) return '体克用 (小吉, 掌控)';
    return '未知';
}

try {
    const args = process.argv.slice(2);
    let year = args[0];
    let month, day, hour, minute, query;
    if (year !== 'now') {
        if (args.length < 5) throw new Error("Missing arguments. Usage: node xiaoliuren.js <year|now> <month> <day> <hour> <minute> [query]");
        month = args[1]; day = args[2]; hour = args[3]; minute = args[4];
        query = args.slice(5).join(' ');
    } else {
        query = args.slice(1).join(' ');
    }
    const res = calculateDaoistXiaoLiuRen(year, month, day, hour, minute, query);
    console.log(JSON.stringify(res, null, 2));
} catch (e) {
    console.error(JSON.stringify({ error: e.message, stack: e.stack }));
}
