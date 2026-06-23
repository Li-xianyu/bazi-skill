// ============================================================
// 神煞计算模块 v6 — 58 种神煞（补齐德秀、五行正印、福星）
// 年日双参。典籍:《三命通会》+《协纪辨方书》+《渊海子平》+《五行精纪》
// ============================================================

module.exports = function getShenSha(eightChar) {

    const ZHI  = ['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];
    const ZIDX = { '子':0,'丑':1,'寅':2,'卯':3,'辰':4,'巳':5,'午':6,'未':7,'申':8,'酉':9,'戌':10,'亥':11 };

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

    function byZhi(map, zhi)  { return (map[nianZhi]===zhi)||(map[riZhi]===zhi); }
    function byGan(map, zhi)  { return (map[nianGan]===zhi)||(map[riGan]===zhi); }
    function byGanA(map, zhi) { return (map[nianGan]||[]).includes(zhi)||(map[riGan]||[]).includes(zhi); }

    for (const p of pillars) {
        const list = result[p.key];
        const z = p.zhi;
        const g = p.gan;
        const gz = g + z;
        const zi = ZIDX[z];

        // ========== 吉神 (20) ==========

        // 1 天乙贵人
        const tianYi = { '甲':['丑','未'],'戊':['丑','未'],'乙':['子','申'],'己':['子','申'],'丙':['亥','酉'],'丁':['亥','酉'],'壬':['卯','巳'],'癸':['卯','巳'],'庚':['午','寅'],'辛':['午','寅'] };
        if (byGanA(tianYi,z)) list.push('天乙贵人');

        // 2 天德贵人
        const tianDe = { '寅':'丁','卯':'申','辰':'壬','巳':'辛','午':'亥','未':'甲','申':'癸','酉':'寅','戌':'丙','亥':'乙','子':'巳','丑':'庚' };
        if (tianDe[yueZhi]===g) list.push('天德贵人');

        // 3 天德合
        const tianDeHe = { '寅':'壬','卯':'乙','辰':'丁','巳':'丙','午':'丁','未':'己','申':'戊','酉':'己','戌':'辛','亥':'庚','子':'辛','丑':'乙' };
        if (tianDeHe[yueZhi]===g) list.push('天德合');

        // 4 月德贵人
        const yueDe = { '寅':'丙','午':'丙','戌':'丙','申':'壬','子':'壬','辰':'壬','亥':'甲','卯':'甲','未':'甲','巳':'庚','酉':'庚','丑':'庚' };
        if (yueDe[yueZhi]===g) list.push('月德贵人');

        // 5 月德合
        const yueDeHe = { '寅':'辛','午':'辛','戌':'辛','申':'丁','子':'丁','辰':'丁','亥':'己','卯':'己','未':'己','巳':'乙','酉':'乙','丑':'乙' };
        if (yueDeHe[yueZhi]===g) list.push('月德合');

        // 6 文昌贵人
        const wenChang = { '甲':'巳','乙':'午','丙':'申','丁':'酉','戊':'申','己':'酉','庚':'亥','辛':'子','壬':'寅','癸':'卯' };
        if (byGan(wenChang,z)) list.push('文昌贵人');

        // 7 学堂
        const xueTang = { '甲':'亥','乙':'午','丙':'寅','丁':'酉','戊':'寅','己':'酉','庚':'巳','辛':'子','壬':'申','癸':'卯' };
        if (byGan(xueTang,z)) list.push('学堂');

        // 8 词馆
        const ciGuan  = { '甲':'巳','乙':'子','丙':'申','丁':'卯','戊':'申','己':'卯','庚':'亥','辛':'午','壬':'寅','癸':'酉' };
        if (byGan(ciGuan,z)) list.push('词馆');

        // 9 禄神
        const luShen = { '甲':'寅','乙':'卯','丙':'巳','丁':'午','戊':'巳','己':'午','庚':'申','辛':'酉','壬':'亥','癸':'子' };
        if (byGan(luShen,z)) list.push('禄神');

        // 10 太极贵人
        const taiJi = { '甲':['子','午'],'乙':['子','午'],'丙':['卯','酉'],'丁':['卯','酉'],'戊':['辰','戌','丑','未'],'己':['辰','戌','丑','未'],'庚':['寅','亥'],'辛':['寅','亥'],'壬':['巳','申'],'癸':['巳','申'] };
        if (byGanA(taiJi,z)) list.push('太极贵人');

        // 11 国印贵人
        const guoYin = { '甲':'戌','乙':'亥','丙':'丑','丁':'寅','戊':'丑','己':'寅','庚':'辰','辛':'巳','壬':'未','癸':'申' };
        if (byGan(guoYin,z)) list.push('国印贵人');

        // 12 天厨贵人
        const tianChu = { '甲':'巳','乙':'午','丙':'子','丁':'巳','戊':'午','己':'申','庚':'寅','辛':'午','壬':'酉','癸':'亥' };
        if (byGan(tianChu,z)) list.push('天厨贵人');

        // 13 福星贵人 (年干/日干 → 地支) — 《渊海子平》
        const fuXing = { '甲':['寅','子'],'丙':['寅','子'],'乙':['卯','丑'],'癸':['卯','丑'],'戊':['申'],'己':['未'],'丁':['亥'],'庚':['午'],'辛':['巳'],'壬':['辰'] };
        if (byGanA(fuXing,z)) list.push('福星贵人');

        // 14 将星
        const jiangXing = { '申':'子','子':'子','辰':'子','寅':'午','午':'午','戌':'午','巳':'酉','酉':'酉','丑':'酉','亥':'卯','卯':'卯','未':'卯' };
        if (byZhi(jiangXing,z)) list.push('将星');

        // 15 金舆
        const jinYu = { '甲':'辰','乙':'巳','丙':'未','丁':'申','戊':'未','己':'申','庚':'戌','辛':'亥','壬':'丑','癸':'寅' };
        if (byGan(jinYu,z)) list.push('金舆');

        // 16 天医
        const tianYi2 = { '寅':'丑','卯':'寅','辰':'卯','巳':'辰','午':'巳','未':'午','申':'未','酉':'申','戌':'酉','亥':'戌','子':'亥','丑':'子' };
        if (tianYi2[yueZhi]===z) list.push('天医');

        // ========== 动星 (5) ==========

        // 17 驿马
        const yiMa = { '申':'寅','子':'寅','辰':'寅','寅':'申','午':'申','戌':'申','巳':'亥','酉':'亥','丑':'亥','亥':'巳','卯':'巳','未':'巳' };
        if (byZhi(yiMa,z)) list.push('驿马');

        // 18 桃花
        const taoHua = { '申':'酉','子':'酉','辰':'酉','寅':'卯','午':'卯','戌':'卯','巳':'午','酉':'午','丑':'午','亥':'子','卯':'子','未':'子' };
        if (byZhi(taoHua,z)) list.push('桃花');

        // 19 华盖
        const huaGai = { '申':'辰','子':'辰','辰':'辰','寅':'戌','午':'戌','戌':'戌','巳':'丑','酉':'丑','丑':'丑','亥':'未','卯':'未','未':'未' };
        if (byZhi(huaGai,z)) list.push('华盖');

        // 20 红鸾
        const hongLuan = { '子':'卯','丑':'寅','寅':'丑','卯':'子','辰':'亥','巳':'戌','午':'酉','未':'申','申':'未','酉':'午','戌':'巳','亥':'辰' };
        if (byZhi(hongLuan,z)) list.push('红鸾');

        // 21 天喜
        const tianXi = { '子':'酉','丑':'申','寅':'未','卯':'午','辰':'巳','巳':'辰','午':'卯','未':'寅','申':'丑','酉':'子','戌':'亥','亥':'戌' };
        if (byZhi(tianXi,z)) list.push('天喜');

        // ========== 凶煞 (29) ==========

        // 22 羊刃
        const yangRen = { '甲':'卯','乙':'辰','丙':'午','丁':'未','戊':'午','己':'未','庚':'酉','辛':'戌','壬':'子','癸':'丑' };
        if (byGan(yangRen,z)) list.push('羊刃');

        // 23 飞刃
        const feiRen = { '甲':'酉','乙':'戌','丙':'子','丁':'丑','戊':'子','己':'丑','庚':'卯','辛':'辰','壬':'午','癸':'未' };
        if (byGan(feiRen,z)) list.push('飞刃');

        // 24 血刃
        const xueRen = { '甲':'丑','乙':'未','丙':'寅','丁':'申','戊':'卯','己':'酉','庚':'辰','辛':'戌','壬':'巳','癸':'亥' };
        if (byGan(xueRen,z)) list.push('血刃');

        // 25 劫煞
        const jieSha = { '申':'巳','子':'巳','辰':'巳','寅':'亥','午':'亥','戌':'亥','巳':'寅','酉':'寅','丑':'寅','亥':'申','卯':'申','未':'申' };
        if (byZhi(jieSha,z)) list.push('劫煞');

        // 26 灾煞
        const zaiSha = { '申':'午','子':'午','辰':'午','寅':'子','午':'子','戌':'子','巳':'卯','酉':'卯','丑':'卯','亥':'酉','卯':'酉','未':'酉' };
        if (byZhi(zaiSha,z)) list.push('灾煞');

        // 27 亡神
        const wangShen = { '申':'亥','子':'亥','辰':'亥','寅':'巳','午':'巳','戌':'巳','巳':'申','酉':'申','丑':'申','亥':'寅','卯':'寅','未':'寅' };
        if (byZhi(wangShen,z)) list.push('亡神');

        // 28 孤辰
        const guChen = { '亥':'寅','子':'寅','丑':'寅','寅':'巳','卯':'巳','辰':'巳','巳':'申','午':'申','未':'申','申':'亥','酉':'亥','戌':'亥' };
        if (guChen[nianZhi]===z) list.push('孤辰');

        // 29 寡宿
        const guaSu = { '亥':'戌','子':'戌','丑':'戌','寅':'丑','卯':'丑','辰':'丑','巳':'辰','午':'辰','未':'辰','申':'未','酉':'未','戌':'未' };
        if (guaSu[nianZhi]===z) list.push('寡宿');

        // 30 六厄
        const liuE = { '申':'卯','子':'卯','辰':'卯','寅':'酉','午':'酉','戌':'酉','巳':'子','酉':'子','丑':'子','亥':'午','卯':'午','未':'午' };
        if (byZhi(liuE,z)) list.push('六厄');

        // 31 流霞
        const liuXia = { '甲':'酉','乙':'戌','丙':'未','丁':'申','戊':'巳','己':'午','庚':'辰','辛':'卯','壬':'亥','癸':'寅' };
        if (byGan(liuXia,z)) list.push('流霞');

        // 32 红艳煞
        const hongYan = { '甲':'午','乙':'申','丙':'寅','丁':'未','戊':'辰','己':'戌','庚':'戌','辛':'酉','壬':'子','癸':'亥' };
        if (byGan(hongYan,z)) list.push('红艳煞');

        // 33 勾绞
        const gouMap  = { '子':'卯','丑':'戌','寅':'巳','卯':'子','辰':'未','巳':'寅','午':'酉','未':'辰','申':'亥','酉':'午','戌':'丑','亥':'申' };
        const jiaoMap = { '子':'辰','丑':'亥','寅':'午','卯':'丑','辰':'申','巳':'卯','午':'戌','未':'巳','申':'子','酉':'未','戌':'寅','亥':'酉' };
        if (gouMap[nianZhi]===z||jiaoMap[nianZhi]===z) list.push('勾绞');

        // 34 元辰
        const yuanChen = { '子':'未','丑':'午','寅':'酉','卯':'申','辰':'亥','巳':'戌','午':'丑','未':'子','申':'卯','酉':'寅','戌':'巳','亥':'辰' };
        if (yuanChen[nianZhi]===z) list.push('元辰');

        // 35 天罗 / 地网
        if (p.key==='day'||p.key==='hour') { if (z==='戌'||z==='亥') list.push('天罗'); if (z==='辰'||z==='巳') list.push('地网'); }

        // 36 丧门
        const sangMen = { '子':'寅','丑':'卯','寅':'辰','卯':'巳','辰':'午','巳':'未','午':'申','未':'酉','申':'戌','酉':'亥','戌':'子','亥':'丑' };
        if (sangMen[nianZhi]===z) list.push('丧门');

        // 37 吊客
        const diaoKe = { '子':'戌','丑':'亥','寅':'子','卯':'丑','辰':'寅','巳':'卯','午':'辰','未':'巳','申':'午','酉':'未','戌':'申','亥':'酉' };
        if (diaoKe[nianZhi]===z) list.push('吊客');

        // 38 披麻
        const piMa = { '子':'酉','丑':'戌','寅':'亥','卯':'子','辰':'丑','巳':'寅','午':'卯','未':'辰','申':'巳','酉':'午','戌':'未','亥':'申' };
        if (piMa[nianZhi]===z) list.push('披麻');

        // ========== 日柱/特判 (12) ==========

        // 39 魁罡
        if (p.key==='day'&&['庚辰','壬辰','庚戌','戊戌'].includes(gz)) list.push('魁罡');

        // 40 十恶大败
        if (p.key==='day'&&['甲辰','乙巳','丙申','丁亥','庚辰','戊戌','癸亥','辛巳','己丑','壬申'].includes(gz)) list.push('十恶大败');

        // 41 阴差阳错
        if (p.key==='day'&&['丙子','丁丑','戊寅','辛卯','壬辰','癸巳','丙午','丁未','戊申','辛酉','壬戌','癸亥'].includes(gz)) list.push('阴差阳错');

        // 42 四废日
        if (p.key==='day'||p.key==='hour') {
            const y=yueZhi;
            if (['寅','卯','辰'].includes(y)&&['庚申','辛酉'].includes(gz)) list.push('四废日');
            if (['巳','午','未'].includes(y)&&['壬子','癸亥'].includes(gz)) list.push('四废日');
            if (['申','酉','戌'].includes(y)&&['甲寅','乙卯'].includes(gz)) list.push('四废日');
            if (['亥','子','丑'].includes(y)&&['丙午','丁巳'].includes(gz)) list.push('四废日');
        }

        // 43 孤鸾煞
        if (p.key==='day'||p.key==='hour') {
            if (['甲寅','乙卯','丙午','丁巳','戊辰','戊戌','己丑','己未','庚申','辛酉','壬子','癸亥'].includes(gz)) list.push('孤鸾煞');
        }

        // 44 八专
        if (p.key==='day'&&['甲寅','乙卯','丁未','己未','庚申','辛酉','癸丑'].includes(gz)) list.push('八专');

        // 45 九丑
        if (p.key==='day'||p.key==='hour') {
            if (['戊子','戊午','壬子','壬午','丁巳','丁亥','己卯','己酉','辛卯','辛酉'].includes(gz)) list.push('九丑');
        }

        // 46 十灵日
        if (p.key==='day'&&['甲辰','乙亥','丙辰','丁酉','戊午','庚午','庚戌','辛亥','壬寅','癸未'].includes(gz)) list.push('十灵日');

        // 47 六秀日
        if (p.key==='day'&&['丙午','丁未','戊子','戊午','己丑','己未','壬子','癸丑'].includes(gz)) list.push('六秀日');

        // 48 天赦日
        if (p.key==='day') {
            const y=yueZhi;
            if (['寅','卯','辰'].includes(y)&&gz==='戊寅') list.push('天赦日');
            if (['巳','午','未'].includes(y)&&gz==='甲午') list.push('天赦日');
            if (['申','酉','戌'].includes(y)&&gz==='戊申') list.push('天赦日');
            if (['亥','子','丑'].includes(y)&&gz==='甲子') list.push('天赦日');
        }

        // 49 天转
        if (p.key==='day') {
            const y=yueZhi;
            if (['寅','卯','辰'].includes(y)&&['乙卯','辛卯'].includes(gz)) list.push('天转');
            if (['巳','午','未'].includes(y)&&['丙午','戊午'].includes(gz)) list.push('天转');
            if (['申','酉','戌'].includes(y)&&['辛酉','癸酉'].includes(gz)) list.push('天转');
            if (['亥','子','丑'].includes(y)&&['壬子','丙子'].includes(gz)) list.push('天转');
        }

        // 50 地转
        if (p.key==='day') {
            const y=yueZhi;
            if (['寅','卯','辰'].includes(y)&&gz==='辛卯') list.push('地转');
            if (['巳','午','未'].includes(y)&&gz==='戊午') list.push('地转');
            if (['申','酉','戌'].includes(y)&&gz==='癸酉') list.push('地转');
            if (['亥','子','丑'].includes(y)&&gz==='丙子') list.push('地转');
        }

        // 51 金神
        if (p.key==='hour'&&['乙丑','己巳','癸酉'].includes(gz)) list.push('金神');

        // 52 五行正印 (纳音自坐墓库) — 《五行精纪》
        if (['乙丑','癸未','壬辰','甲戌','丙辰'].includes(gz)) list.push('五行正印');

        // 53 童子煞
        if (p.key==='day'||p.key==='hour') {
            let hit=false; const y=yueZhi;
            if (['寅','卯','辰','申','酉','戌'].includes(y)&&['寅','子'].includes(z)) hit=true;
            if (['巳','午','未','亥','子','丑'].includes(y)&&['卯','未','辰'].includes(z)) hit=true;
            if (['寅','申','巳','亥'].includes(p.zhi)&&['辰','戌','丑','未'].includes(nianZhi)) hit=true;
            const nayin=eightChar.getDayNaYin();
            const fire=['山头火','炉中火','覆灯火','天上火','山下火','霹雳火'];
            const water=['涧下水','泉中水','长流水','天河水','大溪水','大海水'];
            const wood=['大林木','杨柳木','松柏木','平地木','桑柘木','石榴木'];
            const metal=['海中金','剑锋金','白蜡金','沙中金','金箔金','钗钏金'];
            const earth=['路旁土','城头土','屋上土','壁上土','大驿土','沙中土'];
            if (fire.includes(nayin)&&['午','卯'].includes(z)) hit=true;
            if (water.includes(nayin)&&['辰','巳'].includes(z)) hit=true;
            if (wood.includes(nayin)&&['寅','卯'].includes(z)) hit=true;
            if (metal.includes(nayin)&&['午','卯'].includes(z)) hit=true;
            if (earth.includes(nayin)&&['辰','巳'].includes(z)) hit=true;
            const tzm={ '申':'亥','子':'亥','辰':'亥','寅':'巳','午':'巳','戌':'巳','巳':'申','酉':'申','丑':'申','亥':'寅','卯':'寅','未':'寅' };
            if (tzm[nianZhi]===z||tzm[riZhi]===z) hit=true;
            if (hit) list.push('童子煞');
        }

        // 54 空亡 — 日柱旬空为基准，落入者方标（留空，循环外统一处理）
    }

    // ==================== 空亡 (日柱旬空查各柱地支) ====================
    // 以日柱旬空为基准，其他柱地支落入日柱空亡者方为"逢空亡"
    const riXunKong = eightChar.getDayXunKong();
    if (riXunKong) {
        for (const pp of pillars) {
            if (pp.key !== 'day' && riXunKong.includes(pp.zhi)) {
                result[pp.key].push('空亡');
            }
        }
    }

        // ==================== 德秀贵人 (月支三合局 + 四柱天干) ====================
    const deXiuMap = {
        '寅': { de:['丙','丁'], xiu:['戊','癸'] },
        '午': { de:['丙','丁'], xiu:['戊','癸'] },
        '戌': { de:['丙','丁'], xiu:['戊','癸'] },
        '申': { de:['壬','癸','戊','己'], xiu:['丙','辛','甲','己'] },
        '子': { de:['壬','癸','戊','己'], xiu:['丙','辛','甲','己'] },
        '辰': { de:['壬','癸','戊','己'], xiu:['丙','辛','甲','己'] },
        '巳': { de:['庚','辛'], xiu:['乙','庚'] },
        '酉': { de:['庚','辛'], xiu:['乙','庚'] },
        '丑': { de:['庚','辛'], xiu:['乙','庚'] },
        '亥': { de:['甲','乙'], xiu:['丁','壬'] },
        '卯': { de:['甲','乙'], xiu:['丁','壬'] },
        '未': { de:['甲','乙'], xiu:['丁','壬'] }
    };
    const dx = deXiuMap[yueZhi];
    if (dx) {
        const allGan = pillars.map(p => p.gan);
        const hasDe  = allGan.some(g => dx.de.includes(g));
        const hasXiu = allGan.some(g => dx.xiu.includes(g));
        if (hasDe && hasXiu) {
            for (const p of pillars) {
                if (dx.de.includes(p.gan) || dx.xiu.includes(p.gan)) {
                    result[p.key].push('德秀贵人');
                }
            }
        }
    }

    // ==================== 拱禄 (日时夹拱) ====================
    const luShenZhi = { '甲':'寅','乙':'卯','丙':'巳','丁':'午','戊':'巳','己':'午','庚':'申','辛':'酉','壬':'亥','癸':'子' };
    const riGan2=eightChar.getDayGan(), shiGan=eightChar.getTimeGan();
    if (riGan2===shiGan) {
        const lz=luShenZhi[riGan2];
        if (lz) {
            const a=ZIDX[eightChar.getDayZhi()], b=ZIDX[eightChar.getTimeZhi()], L=ZIDX[lz];
            if (Math.abs(a-b)===2 && (a+b)/2===L) {
                result.day.push('拱禄'); result.hour.push('拱禄');
            }
        }
    }

    // ==================== 三奇贵人 (连续三柱天干) ====================
    const allGan3 = pillars.map(p=>p.gan);
    for (let i=0;i<=1;i++) {
        const seg=[allGan3[i],allGan3[i+1],allGan3[i+2]];
        const keys=[pillars[i].key,pillars[i+1].key,pillars[i+2].key];
        let tag=null;
        if (seg[0]==='甲'&&seg[1]==='戊'&&seg[2]==='庚') tag='天上三奇';
        if (seg[0]==='乙'&&seg[1]==='丙'&&seg[2]==='丁') tag='地下三奇';
        if (seg[0]==='壬'&&seg[1]==='癸'&&seg[2]==='辛') tag='人中三奇';
        if (tag) { for (const k of keys) result[k].push(tag); result.day.push('三奇贵人'); }
    }

    return result;
};
