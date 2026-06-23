const { Solar, Lunar } = require('lunar-javascript');
const getShenSha = require('./shensha.js');

function getBazi(type, year, month, day, hour, minute, genderStr) {
    let solar, lunar;
    if (type === 'lunar') {
        lunar = Lunar.fromYmdHms(year, month, day, hour, minute, 0);
        solar = lunar.getSolar();
    } else {
        solar = Solar.fromYmdHms(year, month, day, hour, minute, 0);
        lunar = solar.getLunar();
    }
    
    const gender = genderStr === '男' ? 1 : 0;
    const eightChar = lunar.getEightChar();
    
    // 简易五行字数统计（明字）
    const wuxingCount = { '金': 0, '木': 0, '水': 0, '火': 0, '土': 0 };
    const wuxingStr = eightChar.getYearWuXing() + eightChar.getMonthWuXing() + eightChar.getDayWuXing() + eightChar.getTimeWuXing();
    for (let char of wuxingStr) {
        if (wuxingCount[char] !== undefined) wuxingCount[char] += 1;
    }

    const baziData = {
        solarDate: solar.toYmdHms(),
        lunarDate: lunar.toString(),
        bazi: {
            year: { 
                gan: eightChar.getYearGan(), 
                zhi: eightChar.getYearZhi(), 
                shishen_gan: eightChar.getYearShiShenGan(), 
                shishen_zhi: eightChar.getYearShiShenZhi(), // 支神
                hide_gan: eightChar.getYearHideGan(),       // 藏干
                dishi: eightChar.getYearDiShi(),            // 地势/十二长生
                xunkong: eightChar.getYearXunKong()         // 空亡
            },
            month: { 
                gan: eightChar.getMonthGan(), 
                zhi: eightChar.getMonthZhi(), 
                shishen_gan: eightChar.getMonthShiShenGan(), 
                shishen_zhi: eightChar.getMonthShiShenZhi(),
                hide_gan: eightChar.getMonthHideGan(),
                dishi: eightChar.getMonthDiShi(),
                xunkong: eightChar.getMonthXunKong()
            },
            day: { 
                gan: eightChar.getDayGan(), 
                zhi: eightChar.getDayZhi(), 
                shishen_gan: "日主", 
                shishen_zhi: eightChar.getDayShiShenZhi(), // 自坐
                hide_gan: eightChar.getDayHideGan(),
                dishi: eightChar.getDayDiShi(),
                xunkong: eightChar.getDayXunKong()
            },
            hour: { 
                gan: eightChar.getTimeGan(), 
                zhi: eightChar.getTimeZhi(), 
                shishen_gan: eightChar.getTimeShiShenGan(), 
                shishen_zhi: eightChar.getTimeShiShenZhi(),
                hide_gan: eightChar.getTimeHideGan(),
                dishi: eightChar.getTimeDiShi(),
                xunkong: eightChar.getTimeXunKong()
            }
        },
        wuxing: {
            year: eightChar.getYearWuXing(),
            month: eightChar.getMonthWuXing(),
            day: eightChar.getDayWuXing(),
            hour: eightChar.getTimeWuXing(),
            // 将原局中明见五行数量输出，辅助大模型判断旺衰（如“火旺”）
            baseCount: wuxingCount 
        },
        nayins: {
            year: eightChar.getYearNaYin(),
            month: eightChar.getMonthNaYin(),
            day: eightChar.getDayNaYin(),
            hour: eightChar.getTimeNaYin()
        }
    };
    
    const yun = eightChar.getYun(gender);
    baziData.dayunInfo = {
        qiYunDuration: `${yun.getStartYear()}年${yun.getStartMonth()}个月${yun.getStartDay()}天起运`,
        qiYunSolarDate: yun.getStartSolar().toYmd()
    };
    
    const daYuns = yun.getDaYun();
    baziData.dayunList = daYuns.map(d => ({
        index: d.getIndex(),
        startAge: d.getStartAge(),
        startYear: d.getStartYear(),
        ganZhi: d.getGanZhi()
    })).slice(0, 10);
    
    baziData.shensha = getShenSha(eightChar);

    return baziData;
}

try {
    const args = process.argv.slice(2);
    if (args.length < 7) {
        throw new Error("Missing arguments. Usage: node bazi_calc.js <solar|lunar> <year> <month> <day> <hour> <minute> <性别(男/女)>");
    }
    const type = args[0];
    const year = parseInt(args[1], 10);
    const month = parseInt(args[2], 10);
    const day = parseInt(args[3], 10);
    const hour = parseInt(args[4], 10);
    const minute = parseInt(args[5], 10);
    const genderStr = args[6];
    
    const result = getBazi(type, year, month, day, hour, minute, genderStr);
    console.log(JSON.stringify(result, null, 2));
} catch (e) {
    console.error(JSON.stringify({ error: e.message, stack: e.stack }));
}
