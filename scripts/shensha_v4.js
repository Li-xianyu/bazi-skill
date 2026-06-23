// ============================================================
// 神煞计算模块 v4 — 40+ 神煞
// 年日双参。典籍：《三命通会》+ 钦定《协纪辨方书》+《渊海子平》
// ============================================================

module.exports = function getShenSha(eightChar) {

    const ZHI = ['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];

    const nianGan = eightChar.getYearGan();
    const nianZhi = eightChar.getYearZhi();
    const yueZhi   = eightChar.getMonthZhi();
    const riGan    = eightChar.getDayGan();
    const riZhi    = eightChar.getDayZhi();

    const pillars = [
        { key:'year',  gan: eightChar.getYearGan(),  zhi: eightChar.getYearZhi()  },
        { key:'month', gan: eightChar.getMonthGan(), zhi: eightChar.getMonthZhi() },
        { key:'day',   gan: eightChar.getDayGan(),   zhi: eightChar.getDayZhi()   },
        { key:'hour',  gan: eightChar.getTimeGan(),  zhi: eightChar.getTimeZhi()  }
    ];

    const result = { year:[], month:[], day:[], hour:[] };

    function byZhi(map, zhi)  { return (map[nianZhi] === zhi) || (map[riZhi] === zhi); }
    function byGan(map, zhi)  { return (map[nianGan] === zhi) || (map[riGan] === zhi); }
    function byGanA(map, zhi) { return (map[nianGan]||[]).includes(zhi) || (map[riGan]||[]).includes(zhi); }

    // ── 三合局映射快捷 ──
    const SANHE = {
        '申':['申','子','辰'], '子':['申','子','辰'], '辰':['申','子','辰'],
        '寅':['寅','午','戌'], '午':['寅','午','戌'], '戌':['寅','午','戌'],
        '巳':['巳','酉','丑'], '酉':['巳','酉','丑'], '丑':['巳','酉','丑'],
        '亥':['亥','卯','未'], '卯':['亥','卯','未'], '未':['亥','卯','未']
    };

    for (const p of pillars) {
        const list = result[p.key];
        const z = p.zhi;
        const g = p.gan;
        const gz = g + z;  // 干支组合

        // ==================== 吉神 ====================

        // 1 天乙贵人
        const tianYi = {
            '甲':['丑','未'],'戊':['丑','未'], '乙':['子','申'],'己':['子','申'],
            '丙':['亥','酉'],'丁':['亥','酉'], '壬':['卯','巳'],'癸':['卯','巳'],
            '庚':['午','寅'],'辛':['午','寅']
        };
        if (byGanA(tianYi, z)) list.push('天乙贵人');

        // 2 天德贵人 (月支 → 天干)
        const tianDe = {
            '寅':'丁','卯':'申','辰':'壬','巳':'辛','午':'亥','未':'甲',
            '申':'癸','酉':'寅','戌':'丙','亥':'乙','子':'巳','丑':'庚'
        };
        if (tianDe[yueZhi] === g) list.push('天德贵人');

        // 3 月德贵人 (月支 → 天干)
        const yueDe = {
            '寅':'丙','午':'丙','戌':'丙', '申':'壬','子':'壬','辰':'壬',
            '亥':'甲','卯':'甲','未':'甲', '巳':'庚','酉':'庚','丑':'庚'
        };
        if (yueDe[yueZhi] === g) list.push('月德贵人');

        // 4 文昌贵人
        const wenChang = {
            '甲':'巳','乙':'午','丙':'申','丁':'酉','戊':'申',
            '己':'酉','庚':'亥','辛':'子','壬':'寅','癸':'卯'
        };
        if (byGan(wenChang, z)) list.push('文昌贵人');

        // 5 学堂 (长生位)
        const xueTang = {
            '甲':'亥','乙':'午','丙':'寅','丁':'酉','戊':'寅',
            '己':'酉','庚':'巳','辛':'子','壬':'申','癸':'卯'
        };
        if (byGan(xueTang, z)) list.push('学堂');

        // 6 禄神 (临官位)
        const luShen = {
            '甲':'寅','乙':'卯','丙':'巳','丁':'午','戊':'巳',
            '己':'午','庚':'申','辛':'酉','壬':'亥','癸':'子'
        };
        if (byGan(luShen, z)) list.push('禄神');

        // 7 太极贵人
        const taiJi = {
            '甲':['子','午'],'乙':['子','午'], '丙':['卯','酉'],'丁':['卯','酉'],
            '戊':['辰','戌','丑','未'],'己':['辰','戌','丑','未'],
            '庚':['寅','亥'],'辛':['寅','亥'], '壬':['巳','申'],'癸':['巳','申']
        };
        if (byGanA(taiJi, z)) list.push('太极贵人');

        // 8 国印贵人
        const guoYin = {
            '甲':'戌','乙':'亥','丙':'丑','丁':'寅','戊':'丑',
            '己':'寅','庚':'辰','辛':'巳','壬':'未','癸':'申'
        };
        if (byGan(guoYin, z)) list.push('国印贵人');

        // 9 天厨贵人
        const tianChu = {
            '甲':'巳','乙':'午','丙':'子','丁':'巳','戊':'午',
            '己':'申','庚':'寅','辛':'午','壬':'酉','癸':'亥'
        };
        if (byGan(tianChu, z)) list.push('天厨贵人');

        // 10 将星 (三合局中神)
        const jiangXing = {
            '申':'子','子':'子','辰':'子', '寅':'午','午':'午','戌':'午',
            '巳':'酉','酉':'酉','丑':'酉', '亥':'卯','卯':'卯','未':'卯'
        };
        if (byZhi(jiangXing, z)) list.push('将星');

        // 11 金舆 (禄前二位)
        const jinYu = {
            '甲':'辰','乙':'巳','丙':'未','丁':'申','戊':'未',
            '己':'申','庚':'戌','辛':'亥','壬':'丑','癸':'寅'
        };
        if (byGan(jinYu, z)) list.push('金舆');

        // ==================== 动星/平星 ====================

        // 12 驿马
        const yiMa = {
            '申':'寅','子':'寅','辰':'寅', '寅':'申','午':'申','戌':'申',
            '巳':'亥','酉':'亥','丑':'亥', '亥':'巳','卯':'巳','未':'巳'
        };
        if (byZhi(yiMa, z)) list.push('驿马');

        // 13 桃花
        const taoHua = {
            '申':'酉','子':'酉','辰':'酉', '寅':'卯','午':'卯','戌':'卯',
            '巳':'午','酉':'午','丑':'午', '亥':'子','卯':'子','未':'子'
        };
        if (byZhi(taoHua, z)) list.push('桃花');

        // 14 华盖
        const huaGai = {
            '申':'辰','子':'辰','辰':'辰', '寅':'戌','午':'戌','戌':'戌',
            '巳':'丑','酉':'丑','丑':'丑', '亥':'未','卯':'未','未':'未'
        };
        if (byZhi(huaGai, z)) list.push('华盖');

        // 15 红鸾
        const hongLuan = {
            '子':'卯','丑':'寅','寅':'丑','卯':'子', '辰':'亥','巳':'戌',
            '午':'酉','未':'申','申':'未','酉':'午', '戌':'巳','亥':'辰'
        };
        if (byZhi(hongLuan, z)) list.push('红鸾');

        // 16 天喜
        const tianXi = {
            '子':'酉','丑':'申','寅':'未','卯':'午', '辰':'巳','巳':'辰',
            '午':'卯','未':'寅','申':'丑','酉':'子', '戌':'亥','亥':'戌'
        };
        if (byZhi(tianXi, z)) list.push('天喜');

        // ==================== 凶煞 / 平煞 ====================

        // 17 羊刃
        const yangRen = {
            '甲':'卯','乙':'辰','丙':'午','丁':'未','戊':'午',
            '己':'未','庚':'酉','辛':'戌','壬':'子','癸':'丑'
        };
        if (byGan(yangRen, z)) list.push('羊刃');

        // 18 飞刃 (羊刃对冲)
        const feiRen = {
            '甲':'酉','乙':'戌','丙':'子','丁':'丑','戊':'子',
            '己':'丑','庚':'卯','辛':'辰','壬':'午','癸':'未'
        };
        if (byGan(feiRen, z)) list.push('飞刃');

        // 19 血刃
        const xueRen = {
            '甲':'丑','乙':'未','丙':'寅','丁':'申','戊':'卯',
            '己':'酉','庚':'辰','辛':'戌','壬':'巳','癸':'亥'
        };
        if (byGan(xueRen, z)) list.push('血刃');

        // 20 劫煞 (三合绝地)
        const jieSha = {
            '申':'巳','子':'巳','辰':'巳', '寅':'亥','午':'亥','戌':'亥',
            '巳':'寅','酉':'寅','丑':'寅', '亥':'申','卯':'申','未':'申'
        };
        if (byZhi(jieSha, z)) list.push('劫煞');

        // 21 灾煞 (三合冲)
        const zaiSha = {
            '申':'午','子':'午','辰':'午', '寅':'子','午':'子','戌':'子',
            '巳':'卯','酉':'卯','丑':'卯', '亥':'酉','卯':'酉','未':'酉'
        };
        if (byZhi(zaiSha, z)) list.push('灾煞');

        // 22 亡神
        const wangShen = {
            '申':'亥','子':'亥','辰':'亥', '寅':'巳','午':'巳','戌':'巳',
            '巳':'申','酉':'申','丑':'申', '亥':'寅','卯':'寅','未':'寅'
        };
        if (byZhi(wangShen, z)) list.push('亡神');

        // 23 孤辰 (年支查四柱)
        const guChen = {
            '亥':'寅','子':'寅','丑':'寅', '寅':'巳','卯':'巳','辰':'巳',
            '巳':'申','午':'申','未':'申', '申':'亥','酉':'亥','戌':'亥'
        };
        if (guChen[nianZhi] === z) list.push('孤辰');

        // 24 寡宿 (年支查四柱)
        const guaSu = {
            '亥':'戌','子':'戌','丑':'戌', '寅':'丑','卯':'丑','辰':'丑',
            '巳':'辰','午':'辰','未':'辰', '申':'未','酉':'未','戌':'未'
        };
        if (guaSu[nianZhi] === z) list.push('寡宿');

        // 25 六厄 (三合沐浴位)
        const liuE = {
            '申':'卯','子':'卯','辰':'卯', '寅':'酉','午':'酉','戌':'酉',
            '巳':'子','酉':'子','丑':'子', '亥':'午','卯':'午','未':'午'
        };
        if (byZhi(liuE, z)) list.push('六厄');

        // 26 流霞
        const liuXia = {
            '甲':'酉','乙':'戌','丙':'未','丁':'申','戊':'巳',
            '己':'午','庚':'辰','辛':'卯','壬':'亥','癸':'寅'
        };
        if (byGan(liuXia, z)) list.push('流霞');

        // 27 红艳煞
        const hongYan = {
            '甲':'午','乙':'申','丙':'寅','丁':'未','戊':'辰',
            '己':'戌','庚':'戌','辛':'酉','壬':'子','癸':'亥'
        };
        if (byGan(hongYan, z)) list.push('红艳煞');

        // 28 勾绞 (年支起)
        const gouMap = {
            '子':'卯','丑':'戌','寅':'巳','卯':'子','辰':'未','巳':'寅',
            '午':'酉','未':'辰','申':'亥','酉':'午','戌':'丑','亥':'申'
        };
        const jiaoMap = {
            '子':'辰','丑':'亥','寅':'午','卯':'丑','辰':'申','巳':'卯',
            '午':'戌','未':'巳','申':'子','酉':'未','戌':'寅','亥':'酉'
        };
        if (gouMap[nianZhi] === z || jiaoMap[nianZhi] === z) list.push('勾绞');

        // 29 元辰/大耗 (年支起)
        const yuanChen = {
            '子':'未','丑':'午','寅':'酉','卯':'申','辰':'亥','巳':'戌',
            '午':'丑','未':'子','申':'卯','酉':'寅','戌':'巳','亥':'辰'
        };
        if (yuanChen[nianZhi] === z) list.push('元辰');

        // 30 天罗地网 (日/时柱)
        if (p.key === 'day' || p.key === 'hour') {
            if (z === '戌' || z === '亥') list.push('天罗');
            if (z === '辰' || z === '巳') list.push('地网');
        }

        // ==================== 日柱/全局特判 ====================

        // 31 魁罡 (日柱)
        if (p.key === 'day' && ['庚辰','壬辰','庚戌','戊戌'].includes(gz)) {
            list.push('魁罡');
        }

        // 32 十恶大败 (日柱)
        if (p.key === 'day' && ['甲辰','乙巳','丙申','丁亥','庚辰','戊戌','癸亥','辛巳','己丑','壬申'].includes(gz)) {
            list.push('十恶大败');
        }

        // 33 阴差阳错 (日柱)
        if (p.key === 'day' && ['丙子','丁丑','戊寅','辛卯','壬辰','癸巳','丙午','丁未','戊申','辛酉','壬戌','癸亥'].includes(gz)) {
            list.push('阴差阳错');
        }

        // 34 四废 (季节 + 日/时柱)
        if (p.key === 'day' || p.key === 'hour') {
            const y = yueZhi;
            if (['寅','卯','辰'].includes(y) && ['庚申','辛酉'].includes(gz)) list.push('四废');
            if (['巳','午','未'].includes(y) && ['壬子','癸亥'].includes(gz)) list.push('四废');
            if (['申','酉','戌'].includes(y) && ['甲寅','乙卯'].includes(gz)) list.push('四废');
            if (['亥','子','丑'].includes(y) && ['丙午','丁巳'].includes(gz)) list.push('四废');
        }

        // 35 孤鸾煞 (日/时柱)
        if (p.key === 'day' || p.key === 'hour') {
            if (['甲寅','乙卯','丙午','丁巳','戊辰','戊戌','己丑','己未','庚申','辛酉','壬子','癸亥'].includes(gz)) {
                list.push('孤鸾煞');
            }
        }

        // ==================== 童子 & 空亡 ====================

        // 36 童子煞 (多流派, 日/时柱)
        if (p.key === 'day' || p.key === 'hour') {
            let hit = false;
            const y = yueZhi;
            // A: 月令分季
            if (['寅','卯','辰','申','酉','戌'].includes(y) && ['寅','子'].includes(z)) hit = true;
            if (['巳','午','未','亥','子','丑'].includes(y) && ['卯','未','辰'].includes(z)) hit = true;
            // B: 时支反查年支
            if (['寅','申','巳','亥'].includes(p.zhi) && ['辰','戌','丑','未'].includes(nianZhi)) hit = true;
            // C: 日柱纳音
            const nayin = eightChar.getDayNaYin();
            const fireSet  = ['山头火','炉中火','覆灯火','天上火','山下火','霹雳火'];
            const waterSet = ['涧下水','泉中水','长流水','天河水','大溪水','大海水'];
            const woodSet  = ['大林木','杨柳木','松柏木','平地木','桑柘木','石榴木'];
            const metalSet = ['海中金','剑锋金','白蜡金','沙中金','金箔金','钗钏金'];
            const earthSet = ['路旁土','城头土','屋上土','壁上土','大驿土','沙中土'];
            if (fireSet.includes(nayin)  && ['午','卯'].includes(z)) hit = true;
            if (waterSet.includes(nayin) && ['辰','巳'].includes(z)) hit = true;
            if (woodSet.includes(nayin)  && ['寅','卯'].includes(z)) hit = true;
            if (metalSet.includes(nayin) && ['午','卯'].includes(z)) hit = true;
            if (earthSet.includes(nayin) && ['辰','巳'].includes(z)) hit = true;
            // D: 日支/年支三合局
            const tongZiMap = {
                '申':'亥','子':'亥','辰':'亥', '寅':'巳','午':'巳','戌':'巳',
                '巳':'申','酉':'申','丑':'申', '亥':'寅','卯':'寅','未':'寅'
            };
            if (tongZiMap[nianZhi] === z || tongZiMap[riZhi] === z) hit = true;
            if (hit) list.push('童子煞');
        }

        // 37 空亡
        const xk = {
            'year':  eightChar.getYearXunKong(),
            'month': eightChar.getMonthXunKong(),
            'day':   eightChar.getDayXunKong(),
            'hour':  eightChar.getTimeXunKong()
        };
        if (xk[p.key]) list.push('空亡');
    }

    const allGan = pillars.map(p => p.gan);
    for (let i = 0; i <= 1; i++) {
        const seg = [allGan[i], allGan[i+1], allGan[i+2]];
        const keys = [pillars[i].key, pillars[i+1].key, pillars[i+2].key];
        var tag = null;
        if (seg[0]==='甲' && seg[1]==='戊' && seg[2]==='庚') tag = '天上三奇';
        if (seg[0]==='乙' && seg[1]==='丙' && seg[2]==='丁') tag = '地下三奇';
        if (seg[0]==='壬' && seg[1]==='癸' && seg[2]==='辛') tag = '人中三奇';
        if (tag) { for (var ki=0;ki<keys.length;ki++) result[keys[ki]].push(tag); }
    }

    return result;
};
