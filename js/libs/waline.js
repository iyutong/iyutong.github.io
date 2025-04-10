var _o = Object.defineProperty;
var Co = (e, t, n) => t in e ? _o(e, t, {enumerable: !0, configurable: !0, writable: !0, value: n}) : e[t] = n;
var Rs = (e, t, n) => Co(e, typeof t != "symbol" ? t + "" : t, n);
const As = {"Content-Type": "application/json"}, et = e => `${e.replace(/\/?$/, "/")}api/`, yt = (e, t = "") => {
        if (typeof e == "object" && e.errno) throw new TypeError(`${t} failed with ${e.errno}: ${e.errmsg}`);
        return e
    }, Cr = ({
                 serverURL: e,
                 lang: t,
                 paths: n,
                 type: r,
                 signal: s
             }) => fetch(`${et(e)}article?path=${encodeURIComponent(n.join(","))}&type=${encodeURIComponent(r.join(","))}&lang=${t}`, {signal: s}).then(i => i.json()).then(i => yt(i, "Get counter").data),
    On = ({serverURL: e, lang: t, path: n, type: r, action: s}) => fetch(`${et(e)}article?lang=${t}`, {
        method: "POST",
        headers: As,
        body: JSON.stringify({path: n, type: r, action: s})
    }).then(i => i.json()).then(i => yt(i, "Update counter").data),
    Es = ({serverURL: e, lang: t, path: n, page: r, pageSize: s, sortBy: i, signal: l, token: o}) => {
        const a = {};
        return o && (a.Authorization = `Bearer ${o}`), fetch(`${et(e)}comment?path=${encodeURIComponent(n)}&pageSize=${s}&page=${r}&lang=${t}&sortBy=${i}`, {
            signal: l,
            headers: a
        }).then(c => c.json()).then(c => yt(c, "Get comment data").data)
    }, Ts = ({serverURL: e, lang: t, token: n, comment: r}) => {
        const s = {"Content-Type": "application/json"};
        return n && (s.Authorization = `Bearer ${n}`), fetch(`${et(e)}comment?lang=${t}`, {
            method: "POST",
            headers: s,
            body: JSON.stringify(r)
        }).then(i => i.json())
    }, Ls = ({serverURL: e, lang: t, token: n, objectId: r}) => fetch(`${et(e)}comment/${r}?lang=${t}`, {
        method: "DELETE",
        headers: {Authorization: `Bearer ${n}`}
    }).then(s => s.json()).then(s => yt(s, "Delete comment")), Qt = ({
                                                                         serverURL: e,
                                                                         lang: t,
                                                                         token: n,
                                                                         objectId: r,
                                                                         comment: s
                                                                     }) => fetch(`${et(e)}comment/${r}?lang=${t}`, {
        method: "PUT",
        headers: {...As, Authorization: `Bearer ${n}`},
        body: JSON.stringify(s)
    }).then(i => i.json()).then(i => yt(i, "Update comment")), Is = ({
                                                                         serverURL: e,
                                                                         lang: t,
                                                                         paths: n,
                                                                         signal: r
                                                                     }) => fetch(`${et(e)}comment?type=count&url=${encodeURIComponent(n.join(","))}&lang=${t}`, {signal: r}).then(s => s.json()).then(s => yt(s, "Get comment count").data),
    Ms = ({lang: e, serverURL: t}) => {
        const n = (window.innerWidth - 450) / 2, r = (window.innerHeight - 450) / 2,
            s = window.open(`${t.replace(/\/$/, "")}/ui/login?lng=${encodeURIComponent(e)}`, "_blank", `width=450,height=450,left=${n},top=${r},scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no`);
        return s == null || s.postMessage({type: "TOKEN", data: null}, "*"), new Promise(i => {
            const l = ({data: o}) => {
                !o || typeof o != "object" || o.type !== "userInfo" || o.data.token && (s == null || s.close(), window.removeEventListener("message", l), i(o.data))
            };
            window.addEventListener("message", l)
        })
    }, Ps = ({serverURL: e, lang: t, paths: n, signal: r}) => Cr({
        serverURL: e,
        lang: t,
        paths: n,
        type: ["time"],
        signal: r
    }), Os = e => On({...e, type: "time", action: "inc"}),
    js = ({serverURL: e, lang: t, count: n, signal: r, token: s}) => {
        const i = {};
        return s && (i.Authorization = `Bearer ${s}`), fetch(`${et(e)}comment?type=recent&count=${n}&lang=${t}`, {
            signal: r,
            headers: i
        }).then(l => l.json())
    }, zs = ({
                 serverURL: e,
                 signal: t,
                 pageSize: n,
                 lang: r
             }) => fetch(`${et(e)}user?pageSize=${n}&lang=${r}`, {signal: t}).then(s => s.json()).then(s => yt(s, "user list")).then(s => s.data),
    So = ["nick", "mail", "link"], Fs = e => e.filter(t => So.includes(t)),
    Ds = ["//unpkg.com/@waline/emojis@1.1.0/weibo"],
    $o = ["//unpkg.com/@waline/emojis/tieba/tieba_agree.png", "//unpkg.com/@waline/emojis/tieba/tieba_look_down.png", "//unpkg.com/@waline/emojis/tieba/tieba_sunglasses.png", "//unpkg.com/@waline/emojis/tieba/tieba_pick_nose.png", "//unpkg.com/@waline/emojis/tieba/tieba_awkward.png", "//unpkg.com/@waline/emojis/tieba/tieba_sleep.png"],
    Ro = e => new Promise((t, n) => {
        if (e.size > 128e3) return n(new Error("File too large! File size limit 128KB"));
        const r = new FileReader;
        r.readAsDataURL(e), r.onload = () => t(r.result), r.onerror = n
    }),
    Ao = e => e ? '<p class="wl-tex">TeX is not available in preview</p>' : '<span class="wl-tex">TeX is not available in preview</span>',
    Eo = e => {
        const t = async (n, r = {}) => fetch(`https://api.giphy.com/v1/gifs/${n}?${new URLSearchParams({
            lang: e,
            limit: "20",
            rating: "g",
            api_key: "6CIMLkNMMOhRcXPoMCPkFy4Ybk2XUiMp", ...r
        }).toString()}`).then(s => s.json()).then(({data: s}) => s.map(i => ({
            title: i.title,
            src: i.images.downsized_medium.url
        })));
        return {
            search: n => t("search", {q: n, offset: "0"}),
            default: () => t("trending", {}),
            more: (n, r = 0) => t("search", {q: n, offset: r.toString()})
        }
    }, To = /[\u4E00-\u9FFF\u3400-\u4dbf\uf900-\ufaff\u3040-\u309f\uac00-\ud7af\u0400-\u04FF]+|\w+/, Lo = /</,
    Io = /(?:^|\s)\/\/(.+?)$/gm, Mo = /\/\*([\S\s]*?)\*\//gm,
    Po = new RegExp(`(${To.source}|${Lo.source})|((?:${Io.source})|(?:${Mo.source}))`, "gmi"),
    Hs = ["23AC69", "91C132", "F19726", "E8552D", "1AAB8E", "E1147F", "2980C1", "1BA1E6", "9FA0A0", "F19726", "E30B20", "E30B20", "A3338B"],
    Sr = {}, Oo = e => {
        let t = 0;
        return e.replace(Po, (n, r, s) => {
            if (s) return `<span style="color: slategray">${s}</span>`;
            if (r === "<") return "&lt;";
            let i;
            Sr[r] ? i = Sr[r] : (i = Hs[t], Sr[r] = i);
            const l = `<span style="color: #${i}">${r}</span>`;
            return t = ++t % Hs.length, l
        })
    },
    jo = ["nick", "nickError", "mail", "mailError", "link", "optional", "placeholder", "sofa", "submit", "like", "cancelLike", "reply", "cancelReply", "comment", "refresh", "more", "preview", "emoji", "uploadImage", "seconds", "minutes", "hours", "days", "now", "uploading", "login", "logout", "admin", "sticky", "word", "wordHint", "anonymous", "level0", "level1", "level2", "level3", "level4", "level5", "gif", "gifSearchPlaceholder", "profile", "approved", "waiting", "spam", "unsticky", "oldest", "latest", "hottest", "reactionTitle"],
    Ke = e => Object.fromEntries(e.map((t, n) => [jo[n], t]));
var zo = Ke(["Benutzername", "Der Benutzername darf nicht weniger als 3 Bytes umfassen.", "E-Mail", "Bitte bestätigen Sie Ihre E-Mail-Adresse.", "Webseite", "Optional", "Kommentieren Sie hier...", "Noch keine Kommentare.", "Senden", "Gefällt mir", "Gefällt mir nicht mehr", "Antworten", "Antwort abbrechen", "Kommentare", "Aktualisieren", "Mehr laden...", "Vorschau", "Emoji", "Ein Bild hochladen", "Vor einigen Sekunden", "Vor einigen Minuten", "Vor einigen Stunden", "Vor einigen Tagen", "Gerade eben", "Hochladen läuft", "Anmelden", "Abmelden", "Admin", "Angeheftet", "Wörter", "Bitte geben Sie Kommentare zwischen $0 und $1 Wörtern ein! Aktuelle Anzahl der Wörter: $2", "Anonym", "Zwerge", "Hobbits", "Ents", "Magier", "Elfen", "Maïar", "GIF", "Nach einem GIF suchen", "Profil", "Genehmigt", "Ausstehend", "Spam", "Lösen", "Älteste", "Neueste", "Am beliebtesten", "Was denken Sie?"]),
    Us = Ke(["NickName", "NickName cannot be less than 3 bytes.", "E-Mail", "Please confirm your email address.", "Website", "Optional", "Comment here...", "No comment yet.", "Submit", "Like", "Cancel like", "Reply", "Cancel reply", "Comments", "Refresh", "Load More...", "Preview", "Emoji", "Upload Image", "seconds ago", "minutes ago", "hours ago", "days ago", "just now", "Uploading", "Login", "logout", "Admin", "Sticky", "Words", `Please input comments between $0 and $1 words!
 Current word number: $2`, "Anonymous", "Dwarves", "Hobbits", "Ents", "Wizards", "Elves", "Maiar", "GIF", "Search GIF", "Profile", "Approved", "Waiting", "Spam", "Unsticky", "Oldest", "Latest", "Hottest", "What do you think?"]),
    Ns = Ke(["Nombre de usuario", "El nombre de usuario no puede tener menos de 3 bytes.", "Correo electrónico", "Por favor confirma tu dirección de correo electrónico.", "Sitio web", "Opcional", "Comenta aquí...", "Sin comentarios todavía.", "Enviar", "Like", "Anular like", "Responder", "Anular respuesta", "Comentarios", "Recargar", "Cargar Más...", "Previsualizar", "Emoji", "Subir Imagen", "segundos atrás", "minutos atrás", "horas atrás", "días atrás", "justo ahora", "Subiendo", "Iniciar sesión", "cerrar sesión", "Admin", "Fijado", "Palabras", `Por favor escriba entre $0 y $1 palabras!
 El número actual de palabras: $2`, "Anónimo", "Enanos", "Hobbits", "Ents", "Magos", "Elfos", "Maiar", "GIF", "Buscar GIF", "Perfil", "Aprobado", "Esperando", "Spam", "Desfijar", "Más antiguos", "Más recientes", "Más vistos", "¿Qué piensas?"]),
    Bs = Ke(["Pseudo", "Le pseudo ne peut pas faire moins de 3 octets.", "E-mail", "Veuillez confirmer votre adresse e-mail.", "Site Web", "Optionnel", "Commentez ici...", "Aucun commentaire pour l'instant.", "Envoyer", "J'aime", "Annuler le j'aime", "Répondre", "Annuler la réponse", "Commentaires", "Actualiser", "Charger plus...", "Aperçu", "Emoji", "Télécharger une image", "Il y a quelques secondes", "Il y a quelques minutes", "Il y a quelques heures", "Il y a quelques jours", "À l'instant", "Téléchargement en cours", "Connexion", "Déconnexion", "Admin", "Épinglé", "Mots", `Veuillez saisir des commentaires entre $0 et $1 mots !
 Nombre actuel de mots : $2`, "Anonyme", "Nains", "Hobbits", "Ents", "Mages", "Elfes", "Maïar", "GIF", "Rechercher un GIF", "Profil", "Approuvé", "En attente", "Indésirable", "Détacher", "Le plus ancien", "Dernier", "Le plus populaire", "Qu'en pensez-vous ?"]),
    Vs = Ke(["ニックネーム", "3バイト以上のニックネームをご入力ください.", "メールアドレス", "メールアドレスをご確認ください.", "サイト", "オプション", "ここにコメント", "コメントしましょう~", "提出する", "Like", "Cancel like", "返信する", "キャンセル", "コメント", "更新", "さらに読み込む", "プレビュー", "絵文字", "画像をアップロード", "秒前", "分前", "時間前", "日前", "たっだ今", "アップロード", "ログインする", "ログアウト", "管理者", "トップに置く", "ワード", `コメントは $0 から $1 ワードの間でなければなりません!
 現在の単語番号: $2`, "匿名", "うえにん", "なかにん", "しもおし", "特にしもおし", "かげ", "なぬし", "GIF", "探す GIF", "個人情報", "承認済み", "待っている", "スパム", "べたつかない", "逆順", "正順", "人気順", "どう思いますか？"]),
    Fo = Ke(["Apelido", "Apelido não pode ser menor que 3 bytes.", "E-Mail", "Por favor, confirme seu endereço de e-mail.", "Website", "Opcional", "Comente aqui...", "Nenhum comentário, ainda.", "Enviar", "Like", "Cancel like", "Responder", "Cancelar resposta", "Comentários", "Refrescar", "Carregar Mais...", "Visualizar", "Emoji", "Enviar Imagem", "segundos atrás", "minutos atrás", "horas atrás", "dias atrás", "agora mesmo", "Enviando", "Entrar", "Sair", "Admin", "Sticky", "Palavras", `Favor enviar comentário com $0 a $1 palavras!
 Número de palavras atuais: $2`, "Anônimo", "Dwarves", "Hobbits", "Ents", "Wizards", "Elves", "Maiar", "GIF", "Pesquisar GIF", "informação pessoal", "Aprovado", "Espera", "Spam", "Unsticky", "Mais velho", "Mais recentes", "Mais quente", "O que você acha?"]),
    Ws = Ke(["Псевдоним", "Никнейм не может быть меньше 3 байт.", "Эл. адрес", "Пожалуйста, подтвердите адрес вашей электронной почты.", "Веб-сайт", "Необязательный", "Комментарий здесь...", "Пока нет комментариев.", "Отправить", "Like", "Cancel like", "Отвечать", "Отменить ответ", "Комментарии", "Обновить", "Загрузи больше...", "Превью", "эмодзи", "Загрузить изображение", "секунд назад", "несколько минут назад", "несколько часов назад", "дней назад", "прямо сейчас", "Загрузка", "Авторизоваться", "Выход из системы", "Админ", "Липкий", "Слова", `Пожалуйста, введите комментарии от $0 до $1 слов!
Номер текущего слова: $2`, "Анонимный", "Dwarves", "Hobbits", "Ents", "Wizards", "Elves", "Maiar", "GIF", "Поиск GIF", "Персональные данные", "Одобренный", "Ожидающий", "Спам", "Нелипкий", "самый старый", "последний", "самый горячий", "Что вы думаете?"]),
    qs = Ke(["Tên", "Tên không được nhỏ hơn 3 ký tự.", "E-Mail", "Vui lòng xác nhập địa chỉ email của bạn.", "Website", "Tùy chọn", "Hãy bình luận có văn hoá!", "Chưa có bình luận", "Gửi", "Thích", "Bỏ thích", "Trả lời", "Hủy bỏ", "bình luận", "Làm mới", "Tải thêm...", "Xem trước", "Emoji", "Tải lên hình ảnh", "giây trước", "phút trước", "giờ trước", "ngày trước", "Vừa xong", "Đang tải lên", "Đăng nhập", "đăng xuất", "Quản trị viên", "Dính", "từ", `Bình luận phải có độ dài giữa $0 và $1 từ!
 Số từ hiện tại: $2`, "Vô danh", "Người lùn", "Người tí hon", "Thần rừng", "Pháp sư", "Tiên tộc", "Maiar", "Ảnh GIF", "Tìm kiếm ảnh GIF", "thông tin cá nhân", "Đã được phê duyệt", "Đang chờ đợi", "Thư rác", "Không dính", "lâu đời nhất", "muộn nhất", "nóng nhất", "What do you think?"]),
    Ks = Ke(["昵称", "昵称不能少于3个字符", "邮箱", "请填写正确的邮件地址", "网址", "可选", "欢迎评论", "来发评论吧~", "提交", "喜欢", "取消喜欢", "回复", "取消回复", "评论", "刷新", "加载更多...", "预览", "表情", "上传图片", "秒前", "分钟前", "小时前", "天前", "刚刚", "正在上传", "登录", "退出", "博主", "置顶", "字", `评论字数应在 $0 到 $1 字之间！
当前字数：$2`, "匿名", "潜水", "冒泡", "吐槽", "活跃", "话痨", "传说", "表情包", "搜索表情包", "个人资料", "通过", "待审核", "垃圾", "取消置顶", "按倒序", "按正序", "按热度", "你认为这篇文章怎么样？"]),
    Do = Ke(["暱稱", "暱稱不能少於3個字元", "郵箱", "請填寫正確的郵件地址", "網址", "可選", "歡迎留言", "來發留言吧~", "送出", "喜歡", "取消喜歡", "回覆", "取消回覆", "留言", "重整", "載入更多...", "預覽", "表情", "上傳圖片", "秒前", "分鐘前", "小時前", "天前", "剛剛", "正在上傳", "登入", "登出", "管理者", "置頂", "字", `留言字數應在 $0 到 $1 字之間！
目前字數：$2`, "匿名", "潛水", "冒泡", "吐槽", "活躍", "多話", "傳說", "表情包", "搜尋表情包", "個人資料", "通過", "待審核", "垃圾", "取消置頂", "最早", "最新", "熱門", "你認為這篇文章怎麼樣？"]);
const Gs = "en-US", jn = {
        zh: Ks,
        "zh-cn": Ks,
        "zh-tw": Do,
        en: Us,
        "en-us": Us,
        fr: Bs,
        "fr-fr": Bs,
        jp: Vs,
        "jp-jp": Vs,
        "pt-br": Fo,
        ru: Ws,
        "ru-ru": Ws,
        vi: qs,
        "vi-vn": qs,
        de: zo,
        es: Ns,
        "es-mx": Ns
    }, Zs = e => jn[e.toLowerCase()] || jn[Gs.toLowerCase()], Js = e => Object.keys(jn).includes(e.toLowerCase()) ? e : Gs,
    Ys = {latest: "insertedAt_desc", oldest: "insertedAt_asc", hottest: "like_desc"}, Ho = Object.keys(Ys),
    zn = Symbol("waline-config"), Qs = e => {
        try {
            e = decodeURI(e)
        } catch {
        }
        return e
    }, Xs = (e = "") => e.replace(/\/$/u, ""), ei = e => /^(https?:)?\/\//.test(e), Fn = e => {
        const t = Xs(e);
        return ei(t) ? t : `https://${t}`
    }, Uo = e => Array.isArray(e) ? e : e ? [0, e] : !1, jt = (e, t) => e == null || e === !0 ? t : e === !1 ? null : e,
    No = ({
              serverURL: e,
              path: t = location.pathname,
              lang: n = typeof navigator > "u" ? "en-US" : navigator.language,
              locale: r,
              meta: s = ["nick", "mail", "link"],
              requiredMeta: i = [],
              dark: l = !1,
              pageSize: o = 10,
              wordLimit: a,
              noCopyright: c = !1,
              login: u = "enable",
              recaptchaV3Key: f = "",
              turnstileKey: p = "",
              commentSorting: g = "latest",
              emoji: x = Ds,
              imageUploader: b,
              highlighter: T,
              texRenderer: k,
              search: _,
              reaction: N,
              ...L
          }) => ({
        serverURL: Fn(e),
        path: Qs(t),
        lang: Js(n),
        locale: {...Zs(Js(n)), ...typeof r == "object" ? r : {}},
        wordLimit: Uo(a),
        meta: Fs(s),
        requiredMeta: Fs(i),
        dark: l,
        pageSize: o,
        commentSorting: g,
        login: u,
        noCopyright: c,
        recaptchaV3Key: f,
        turnstileKey: p, ...L,
        reaction: jt(N, $o),
        imageUploader: jt(b, Ro),
        highlighter: jt(T, Oo),
        texRenderer: jt(k, Ao),
        emoji: jt(x, Ds),
        search: jt(_, Eo(n))
    }), zt = e => typeof e == "string",
    $r = "{--waline-white:#000;--waline-light-grey:#666;--waline-dark-grey:#999;--waline-color:#888;--waline-bg-color:#1e1e1e;--waline-bg-color-light:#272727;--waline-bg-color-hover: #444;--waline-border-color:#333;--waline-disable-bg-color:#444;--waline-disable-color:#272727;--waline-bq-color:#272727;--waline-info-bg-color:#272727;--waline-info-color:#666}",
    Bo = e => zt(e) ? e === "auto" ? `@media(prefers-color-scheme:dark){body${$r}}` : `${e}${$r}` : e === !0 ? `:root${$r}` : "",
    Rr = (e, t) => {
        let n = e.toString();
        for (; n.length < t;) n = "0" + n;
        return n
    }, Vo = e => {
        const t = Rr(e.getDate(), 2), n = Rr(e.getMonth() + 1, 2);
        return `${Rr(e.getFullYear(), 2)}-${n}-${t}`
    }, Wo = (e, t, n) => {
        if (!e) return "";
        const r = zt(e) ? new Date(e.includes(" ") ? e.replace(/-/g, "/") : e) : e, s = t.getTime() - r.getTime(),
            i = Math.floor(s / (24 * 3600 * 1e3));
        if (i === 0) {
            const l = s % 864e5, o = Math.floor(l / (3600 * 1e3));
            if (o === 0) {
                const a = l % 36e5, c = Math.floor(a / (60 * 1e3));
                if (c === 0) {
                    const u = a % 6e4;
                    return `${Math.round(u / 1e3)} ${n.seconds}`
                }
                return `${c} ${n.minutes}`
            }
            return `${o} ${n.hours}`
        }
        return i < 0 ? n.now : i < 8 ? `${i} ${n.days}` : Vo(r)
    },
    qo = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
    Ko = e => qo.test(e);/**
 * @vue/shared v3.5.13
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **//*! #__NO_SIDE_EFFECTS__ */
function Ar(e) {
    const t = Object.create(null);
    for (const n of e.split(",")) t[n] = 1;
    return n => n in t
}

const le = {}, Ft = [], wt = () => {
    }, Go = () => !1,
    Dn = e => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97),
    Er = e => e.startsWith("onUpdate:"), Me = Object.assign, ti = (e, t) => {
        const n = e.indexOf(t);
        n > -1 && e.splice(n, 1)
    }, Zo = Object.prototype.hasOwnProperty, ee = (e, t) => Zo.call(e, t), q = Array.isArray,
    Dt = e => Xt(e) === "[object Map]", Ht = e => Xt(e) === "[object Set]", ni = e => Xt(e) === "[object Date]",
    se = e => typeof e == "function", be = e => typeof e == "string", Ge = e => typeof e == "symbol",
    he = e => e !== null && typeof e == "object", ri = e => (he(e) || se(e)) && se(e.then) && se(e.catch),
    si = Object.prototype.toString, Xt = e => si.call(e), Jo = e => Xt(e).slice(8, -1),
    ii = e => Xt(e) === "[object Object]", Tr = e => be(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e,
    en = Ar(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),
    Hn = e => {
        const t = Object.create(null);
        return n => t[n] || (t[n] = e(n))
    }, Yo = /-(\w)/g, Pe = Hn(e => e.replace(Yo, (t, n) => n ? n.toUpperCase() : "")), Qo = /\B([A-Z])/g,
    kt = Hn(e => e.replace(Qo, "-$1").toLowerCase()), Un = Hn(e => e.charAt(0).toUpperCase() + e.slice(1)),
    Lr = Hn(e => e ? `on${Un(e)}` : ""), ft = (e, t) => !Object.is(e, t), Nn = (e, ...t) => {
        for (let n = 0; n < e.length; n++) e[n](...t)
    }, li = (e, t, n, r = !1) => {
        Object.defineProperty(e, t, {configurable: !0, enumerable: !1, writable: r, value: n})
    }, Bn = e => {
        const t = parseFloat(e);
        return isNaN(t) ? e : t
    };
let oi;
const tn = () => oi || (oi = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});

function nn(e) {
    if (q(e)) {
        const t = {};
        for (let n = 0; n < e.length; n++) {
            const r = e[n], s = be(r) ? na(r) : nn(r);
            if (s) for (const i in s) t[i] = s[i]
        }
        return t
    } else if (be(e) || he(e)) return e
}

const Xo = /;(?![^(]*\))/g, ea = /:([^]+)/, ta = /\/\*[^]*?\*\//g;

function na(e) {
    const t = {};
    return e.replace(ta, "").split(Xo).forEach(n => {
        if (n) {
            const r = n.split(ea);
            r.length > 1 && (t[r[0].trim()] = r[1].trim())
        }
    }), t
}

function pe(e) {
    let t = "";
    if (be(e)) t = e; else if (q(e)) for (let n = 0; n < e.length; n++) {
        const r = pe(e[n]);
        r && (t += r + " ")
    } else if (he(e)) for (const n in e) e[n] && (t += n + " ");
    return t.trim()
}

const ra = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", sa = Ar(ra);

function ai(e) {
    return !!e || e === ""
}

function ia(e, t) {
    if (e.length !== t.length) return !1;
    let n = !0;
    for (let r = 0; n && r < e.length; r++) n = xt(e[r], t[r]);
    return n
}

function xt(e, t) {
    if (e === t) return !0;
    let n = ni(e), r = ni(t);
    if (n || r) return n && r ? e.getTime() === t.getTime() : !1;
    if (n = Ge(e), r = Ge(t), n || r) return e === t;
    if (n = q(e), r = q(t), n || r) return n && r ? ia(e, t) : !1;
    if (n = he(e), r = he(t), n || r) {
        if (!n || !r) return !1;
        const s = Object.keys(e).length, i = Object.keys(t).length;
        if (s !== i) return !1;
        for (const l in e) {
            const o = e.hasOwnProperty(l), a = t.hasOwnProperty(l);
            if (o && !a || !o && a || !xt(e[l], t[l])) return !1
        }
    }
    return String(e) === String(t)
}

function Ir(e, t) {
    return e.findIndex(n => xt(n, t))
}

const ci = e => !!(e && e.__v_isRef === !0),
    X = e => be(e) ? e : e == null ? "" : q(e) || he(e) && (e.toString === si || !se(e.toString)) ? ci(e) ? X(e.value) : JSON.stringify(e, ui, 2) : String(e),
    ui = (e, t) => ci(t) ? ui(e, t.value) : Dt(t) ? {[`Map(${t.size})`]: [...t.entries()].reduce((n, [r, s], i) => (n[Mr(r, i) + " =>"] = s, n), {})} : Ht(t) ? {[`Set(${t.size})`]: [...t.values()].map(n => Mr(n))} : Ge(t) ? Mr(t) : he(t) && !q(t) && !ii(t) ? String(t) : t,
    Mr = (e, t = "") => {
        var n;
        return Ge(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e
    };
/**
 * @vue/reactivity v3.5.13
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/let _e;

class la {
    constructor(t = !1) {
        this.detached = t, this._active = !0, this.effects = [], this.cleanups = [], this._isPaused = !1, this.parent = _e, !t && _e && (this.index = (_e.scopes || (_e.scopes = [])).push(this) - 1)
    }

    get active() {
        return this._active
    }

    pause() {
        if (this._active) {
            this._isPaused = !0;
            let t, n;
            if (this.scopes) for (t = 0, n = this.scopes.length; t < n; t++) this.scopes[t].pause();
            for (t = 0, n = this.effects.length; t < n; t++) this.effects[t].pause()
        }
    }

    resume() {
        if (this._active && this._isPaused) {
            this._isPaused = !1;
            let t, n;
            if (this.scopes) for (t = 0, n = this.scopes.length; t < n; t++) this.scopes[t].resume();
            for (t = 0, n = this.effects.length; t < n; t++) this.effects[t].resume()
        }
    }

    run(t) {
        if (this._active) {
            const n = _e;
            try {
                return _e = this, t()
            } finally {
                _e = n
            }
        }
    }

    on() {
        _e = this
    }

    off() {
        _e = this.parent
    }

    stop(t) {
        if (this._active) {
            this._active = !1;
            let n, r;
            for (n = 0, r = this.effects.length; n < r; n++) this.effects[n].stop();
            for (this.effects.length = 0, n = 0, r = this.cleanups.length; n < r; n++) this.cleanups[n]();
            if (this.cleanups.length = 0, this.scopes) {
                for (n = 0, r = this.scopes.length; n < r; n++) this.scopes[n].stop(!0);
                this.scopes.length = 0
            }
            if (!this.detached && this.parent && !t) {
                const s = this.parent.scopes.pop();
                s && s !== this && (this.parent.scopes[this.index] = s, s.index = this.index)
            }
            this.parent = void 0
        }
    }
}

function fi() {
    return _e
}

function oa(e, t = !1) {
    _e && _e.cleanups.push(e)
}

let ce;
const Pr = new WeakSet;

class hi {
    constructor(t) {
        this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, _e && _e.active && _e.effects.push(this)
    }

    pause() {
        this.flags |= 64
    }

    resume() {
        this.flags & 64 && (this.flags &= -65, Pr.has(this) && (Pr.delete(this), this.trigger()))
    }

    notify() {
        this.flags & 2 && !(this.flags & 32) || this.flags & 8 || pi(this)
    }

    run() {
        if (!(this.flags & 1)) return this.fn();
        this.flags |= 2, yi(this), gi(this);
        const t = ce, n = De;
        ce = this, De = !0;
        try {
            return this.fn()
        } finally {
            mi(this), ce = t, De = n, this.flags &= -3
        }
    }

    stop() {
        if (this.flags & 1) {
            for (let t = this.deps; t; t = t.nextDep) Fr(t);
            this.deps = this.depsTail = void 0, yi(this), this.onStop && this.onStop(), this.flags &= -2
        }
    }

    trigger() {
        this.flags & 64 ? Pr.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty()
    }

    runIfDirty() {
        zr(this) && this.run()
    }

    get dirty() {
        return zr(this)
    }
}

let di = 0, rn, sn;

function pi(e, t = !1) {
    if (e.flags |= 8, t) {
        e.next = sn, sn = e;
        return
    }
    e.next = rn, rn = e
}

function Or() {
    di++
}

function jr() {
    if (--di > 0) return;
    if (sn) {
        let t = sn;
        for (sn = void 0; t;) {
            const n = t.next;
            t.next = void 0, t.flags &= -9, t = n
        }
    }
    let e;
    for (; rn;) {
        let t = rn;
        for (rn = void 0; t;) {
            const n = t.next;
            if (t.next = void 0, t.flags &= -9, t.flags & 1) try {
                t.trigger()
            } catch (r) {
                e || (e = r)
            }
            t = n
        }
    }
    if (e) throw e
}

function gi(e) {
    for (let t = e.deps; t; t = t.nextDep) t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t
}

function mi(e) {
    let t, n = e.depsTail, r = n;
    for (; r;) {
        const s = r.prevDep;
        r.version === -1 ? (r === n && (n = s), Fr(r), aa(r)) : t = r, r.dep.activeLink = r.prevActiveLink, r.prevActiveLink = void 0, r = s
    }
    e.deps = t, e.depsTail = n
}

function zr(e) {
    for (let t = e.deps; t; t = t.nextDep) if (t.dep.version !== t.version || t.dep.computed && (vi(t.dep.computed) || t.dep.version !== t.version)) return !0;
    return !!e._dirty
}

function vi(e) {
    if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === ln)) return;
    e.globalVersion = ln;
    const t = e.dep;
    if (e.flags |= 2, t.version > 0 && !e.isSSR && e.deps && !zr(e)) {
        e.flags &= -3;
        return
    }
    const n = ce, r = De;
    ce = e, De = !0;
    try {
        gi(e);
        const s = e.fn(e._value);
        (t.version === 0 || ft(s, e._value)) && (e._value = s, t.version++)
    } catch (s) {
        throw t.version++, s
    } finally {
        ce = n, De = r, mi(e), e.flags &= -3
    }
}

function Fr(e, t = !1) {
    const {dep: n, prevSub: r, nextSub: s} = e;
    if (r && (r.nextSub = s, e.prevSub = void 0), s && (s.prevSub = r, e.nextSub = void 0), n.subs === e && (n.subs = r, !r && n.computed)) {
        n.computed.flags &= -5;
        for (let i = n.computed.deps; i; i = i.nextDep) Fr(i, !0)
    }
    !t && !--n.sc && n.map && n.map.delete(n.key)
}

function aa(e) {
    const {prevDep: t, nextDep: n} = e;
    t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0)
}

let De = !0;
const bi = [];

function _t() {
    bi.push(De), De = !1
}

function Ct() {
    const e = bi.pop();
    De = e === void 0 ? !0 : e
}

function yi(e) {
    const {cleanup: t} = e;
    if (e.cleanup = void 0, t) {
        const n = ce;
        ce = void 0;
        try {
            t()
        } finally {
            ce = n
        }
    }
}

let ln = 0;

class ca {
    constructor(t, n) {
        this.sub = t, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0
    }
}

class Dr {
    constructor(t) {
        this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0
    }

    track(t) {
        if (!ce || !De || ce === this.computed) return;
        let n = this.activeLink;
        if (n === void 0 || n.sub !== ce) n = this.activeLink = new ca(ce, this), ce.deps ? (n.prevDep = ce.depsTail, ce.depsTail.nextDep = n, ce.depsTail = n) : ce.deps = ce.depsTail = n, wi(n); else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
            const r = n.nextDep;
            r.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = r), n.prevDep = ce.depsTail, n.nextDep = void 0, ce.depsTail.nextDep = n, ce.depsTail = n, ce.deps === n && (ce.deps = r)
        }
        return n
    }

    trigger(t) {
        this.version++, ln++, this.notify(t)
    }

    notify(t) {
        Or();
        try {
            for (let n = this.subs; n; n = n.prevSub) n.sub.notify() && n.sub.dep.notify()
        } finally {
            jr()
        }
    }
}

function wi(e) {
    if (e.dep.sc++, e.sub.flags & 4) {
        const t = e.dep.computed;
        if (t && !e.dep.subs) {
            t.flags |= 20;
            for (let r = t.deps; r; r = r.nextDep) wi(r)
        }
        const n = e.dep.subs;
        n !== e && (e.prevSub = n, n && (n.nextSub = e)), e.dep.subs = e
    }
}

const Hr = new WeakMap, St = Symbol(""), Ur = Symbol(""), on = Symbol("");

function ke(e, t, n) {
    if (De && ce) {
        let r = Hr.get(e);
        r || Hr.set(e, r = new Map);
        let s = r.get(n);
        s || (r.set(n, s = new Dr), s.map = r, s.key = n), s.track()
    }
}

function tt(e, t, n, r, s, i) {
    const l = Hr.get(e);
    if (!l) {
        ln++;
        return
    }
    const o = a => {
        a && a.trigger()
    };
    if (Or(), t === "clear") l.forEach(o); else {
        const a = q(e), c = a && Tr(n);
        if (a && n === "length") {
            const u = Number(r);
            l.forEach((f, p) => {
                (p === "length" || p === on || !Ge(p) && p >= u) && o(f)
            })
        } else switch ((n !== void 0 || l.has(void 0)) && o(l.get(n)), c && o(l.get(on)), t) {
            case"add":
                a ? c && o(l.get("length")) : (o(l.get(St)), Dt(e) && o(l.get(Ur)));
                break;
            case"delete":
                a || (o(l.get(St)), Dt(e) && o(l.get(Ur)));
                break;
            case"set":
                Dt(e) && o(l.get(St));
                break
        }
    }
    jr()
}

function Ut(e) {
    const t = te(e);
    return t === e ? t : (ke(t, "iterate", on), Oe(e) ? t : t.map(xe))
}

function Vn(e) {
    return ke(e = te(e), "iterate", on), e
}

const ua = {
    __proto__: null, [Symbol.iterator]() {
        return Nr(this, Symbol.iterator, xe)
    }, concat(...e) {
        return Ut(this).concat(...e.map(t => q(t) ? Ut(t) : t))
    }, entries() {
        return Nr(this, "entries", e => (e[1] = xe(e[1]), e))
    }, every(e, t) {
        return nt(this, "every", e, t, void 0, arguments)
    }, filter(e, t) {
        return nt(this, "filter", e, t, n => n.map(xe), arguments)
    }, find(e, t) {
        return nt(this, "find", e, t, xe, arguments)
    }, findIndex(e, t) {
        return nt(this, "findIndex", e, t, void 0, arguments)
    }, findLast(e, t) {
        return nt(this, "findLast", e, t, xe, arguments)
    }, findLastIndex(e, t) {
        return nt(this, "findLastIndex", e, t, void 0, arguments)
    }, forEach(e, t) {
        return nt(this, "forEach", e, t, void 0, arguments)
    }, includes(...e) {
        return Br(this, "includes", e)
    }, indexOf(...e) {
        return Br(this, "indexOf", e)
    }, join(e) {
        return Ut(this).join(e)
    }, lastIndexOf(...e) {
        return Br(this, "lastIndexOf", e)
    }, map(e, t) {
        return nt(this, "map", e, t, void 0, arguments)
    }, pop() {
        return an(this, "pop")
    }, push(...e) {
        return an(this, "push", e)
    }, reduce(e, ...t) {
        return ki(this, "reduce", e, t)
    }, reduceRight(e, ...t) {
        return ki(this, "reduceRight", e, t)
    }, shift() {
        return an(this, "shift")
    }, some(e, t) {
        return nt(this, "some", e, t, void 0, arguments)
    }, splice(...e) {
        return an(this, "splice", e)
    }, toReversed() {
        return Ut(this).toReversed()
    }, toSorted(e) {
        return Ut(this).toSorted(e)
    }, toSpliced(...e) {
        return Ut(this).toSpliced(...e)
    }, unshift(...e) {
        return an(this, "unshift", e)
    }, values() {
        return Nr(this, "values", xe)
    }
};

function Nr(e, t, n) {
    const r = Vn(e), s = r[t]();
    return r !== e && !Oe(e) && (s._next = s.next, s.next = () => {
        const i = s._next();
        return i.value && (i.value = n(i.value)), i
    }), s
}

const fa = Array.prototype;

function nt(e, t, n, r, s, i) {
    const l = Vn(e), o = l !== e && !Oe(e), a = l[t];
    if (a !== fa[t]) {
        const f = a.apply(e, i);
        return o ? xe(f) : f
    }
    let c = n;
    l !== e && (o ? c = function (f, p) {
        return n.call(this, xe(f), p, e)
    } : n.length > 2 && (c = function (f, p) {
        return n.call(this, f, p, e)
    }));
    const u = a.call(l, c, r);
    return o && s ? s(u) : u
}

function ki(e, t, n, r) {
    const s = Vn(e);
    let i = n;
    return s !== e && (Oe(e) ? n.length > 3 && (i = function (l, o, a) {
        return n.call(this, l, o, a, e)
    }) : i = function (l, o, a) {
        return n.call(this, l, xe(o), a, e)
    }), s[t](i, ...r)
}

function Br(e, t, n) {
    const r = te(e);
    ke(r, "iterate", on);
    const s = r[t](...n);
    return (s === -1 || s === !1) && Kr(n[0]) ? (n[0] = te(n[0]), r[t](...n)) : s
}

function an(e, t, n = []) {
    _t(), Or();
    const r = te(e)[t].apply(e, n);
    return jr(), Ct(), r
}

const ha = Ar("__proto__,__v_isRef,__isVue"),
    xi = new Set(Object.getOwnPropertyNames(Symbol).filter(e => e !== "arguments" && e !== "caller").map(e => Symbol[e]).filter(Ge));

function da(e) {
    Ge(e) || (e = String(e));
    const t = te(this);
    return ke(t, "has", e), t.hasOwnProperty(e)
}

class _i {
    constructor(t = !1, n = !1) {
        this._isReadonly = t, this._isShallow = n
    }

    get(t, n, r) {
        if (n === "__v_skip") return t.__v_skip;
        const s = this._isReadonly, i = this._isShallow;
        if (n === "__v_isReactive") return !s;
        if (n === "__v_isReadonly") return s;
        if (n === "__v_isShallow") return i;
        if (n === "__v_raw") return r === (s ? i ? _a : Ri : i ? $i : Si).get(t) || Object.getPrototypeOf(t) === Object.getPrototypeOf(r) ? t : void 0;
        const l = q(t);
        if (!s) {
            let a;
            if (l && (a = ua[n])) return a;
            if (n === "hasOwnProperty") return da
        }
        const o = Reflect.get(t, n, we(t) ? t : r);
        return (Ge(n) ? xi.has(n) : ha(n)) || (s || ke(t, "get", n), i) ? o : we(o) ? l && Tr(n) ? o : o.value : he(o) ? s ? un(o) : cn(o) : o
    }
}

class Ci extends _i {
    constructor(t = !1) {
        super(!1, t)
    }

    set(t, n, r, s) {
        let i = t[n];
        if (!this._isShallow) {
            const a = $t(i);
            if (!Oe(r) && !$t(r) && (i = te(i), r = te(r)), !q(t) && we(i) && !we(r)) return a ? !1 : (i.value = r, !0)
        }
        const l = q(t) && Tr(n) ? Number(n) < t.length : ee(t, n), o = Reflect.set(t, n, r, we(t) ? t : s);
        return t === te(s) && (l ? ft(r, i) && tt(t, "set", n, r) : tt(t, "add", n, r)), o
    }

    deleteProperty(t, n) {
        const r = ee(t, n), s = Reflect.deleteProperty(t, n);
        return s && r && tt(t, "delete", n, void 0), s
    }

    has(t, n) {
        const r = Reflect.has(t, n);
        return (!Ge(n) || !xi.has(n)) && ke(t, "has", n), r
    }

    ownKeys(t) {
        return ke(t, "iterate", q(t) ? "length" : St), Reflect.ownKeys(t)
    }
}

class pa extends _i {
    constructor(t = !1) {
        super(!0, t)
    }

    set(t, n) {
        return !0
    }

    deleteProperty(t, n) {
        return !0
    }
}

const ga = new Ci, ma = new pa, va = new Ci(!0), Vr = e => e, Wn = e => Reflect.getPrototypeOf(e);

function ba(e, t, n) {
    return function (...r) {
        const s = this.__v_raw, i = te(s), l = Dt(i), o = e === "entries" || e === Symbol.iterator && l,
            a = e === "keys" && l, c = s[e](...r), u = n ? Vr : t ? Gr : xe;
        return !t && ke(i, "iterate", a ? Ur : St), {
            next() {
                const {value: f, done: p} = c.next();
                return p ? {value: f, done: p} : {value: o ? [u(f[0]), u(f[1])] : u(f), done: p}
            }, [Symbol.iterator]() {
                return this
            }
        }
    }
}

function qn(e) {
    return function (...t) {
        return e === "delete" ? !1 : e === "clear" ? void 0 : this
    }
}

function ya(e, t) {
    const n = {
        get(s) {
            const i = this.__v_raw, l = te(i), o = te(s);
            e || (ft(s, o) && ke(l, "get", s), ke(l, "get", o));
            const {has: a} = Wn(l), c = t ? Vr : e ? Gr : xe;
            if (a.call(l, s)) return c(i.get(s));
            if (a.call(l, o)) return c(i.get(o));
            i !== l && i.get(s)
        }, get size() {
            const s = this.__v_raw;
            return !e && ke(te(s), "iterate", St), Reflect.get(s, "size", s)
        }, has(s) {
            const i = this.__v_raw, l = te(i), o = te(s);
            return e || (ft(s, o) && ke(l, "has", s), ke(l, "has", o)), s === o ? i.has(s) : i.has(s) || i.has(o)
        }, forEach(s, i) {
            const l = this, o = l.__v_raw, a = te(o), c = t ? Vr : e ? Gr : xe;
            return !e && ke(a, "iterate", St), o.forEach((u, f) => s.call(i, c(u), c(f), l))
        }
    };
    return Me(n, e ? {add: qn("add"), set: qn("set"), delete: qn("delete"), clear: qn("clear")} : {
        add(s) {
            !t && !Oe(s) && !$t(s) && (s = te(s));
            const i = te(this);
            return Wn(i).has.call(i, s) || (i.add(s), tt(i, "add", s, s)), this
        }, set(s, i) {
            !t && !Oe(i) && !$t(i) && (i = te(i));
            const l = te(this), {has: o, get: a} = Wn(l);
            let c = o.call(l, s);
            c || (s = te(s), c = o.call(l, s));
            const u = a.call(l, s);
            return l.set(s, i), c ? ft(i, u) && tt(l, "set", s, i) : tt(l, "add", s, i), this
        }, delete(s) {
            const i = te(this), {has: l, get: o} = Wn(i);
            let a = l.call(i, s);
            a || (s = te(s), a = l.call(i, s)), o && o.call(i, s);
            const c = i.delete(s);
            return a && tt(i, "delete", s, void 0), c
        }, clear() {
            const s = te(this), i = s.size !== 0, l = s.clear();
            return i && tt(s, "clear", void 0, void 0), l
        }
    }), ["keys", "values", "entries", Symbol.iterator].forEach(s => {
        n[s] = ba(s, e, t)
    }), n
}

function Wr(e, t) {
    const n = ya(e, t);
    return (r, s, i) => s === "__v_isReactive" ? !e : s === "__v_isReadonly" ? e : s === "__v_raw" ? r : Reflect.get(ee(n, s) && s in r ? n : r, s, i)
}

const wa = {get: Wr(!1, !1)}, ka = {get: Wr(!1, !0)}, xa = {get: Wr(!0, !1)}, Si = new WeakMap, $i = new WeakMap,
    Ri = new WeakMap, _a = new WeakMap;

function Ca(e) {
    switch (e) {
        case"Object":
        case"Array":
            return 1;
        case"Map":
        case"Set":
        case"WeakMap":
        case"WeakSet":
            return 2;
        default:
            return 0
    }
}

function Sa(e) {
    return e.__v_skip || !Object.isExtensible(e) ? 0 : Ca(Jo(e))
}

function cn(e) {
    return $t(e) ? e : qr(e, !1, ga, wa, Si)
}

function $a(e) {
    return qr(e, !1, va, ka, $i)
}

function un(e) {
    return qr(e, !0, ma, xa, Ri)
}

function qr(e, t, n, r, s) {
    if (!he(e) || e.__v_raw && !(t && e.__v_isReactive)) return e;
    const i = s.get(e);
    if (i) return i;
    const l = Sa(e);
    if (l === 0) return e;
    const o = new Proxy(e, l === 2 ? r : n);
    return s.set(e, o), o
}

function Nt(e) {
    return $t(e) ? Nt(e.__v_raw) : !!(e && e.__v_isReactive)
}

function $t(e) {
    return !!(e && e.__v_isReadonly)
}

function Oe(e) {
    return !!(e && e.__v_isShallow)
}

function Kr(e) {
    return e ? !!e.__v_raw : !1
}

function te(e) {
    const t = e && e.__v_raw;
    return t ? te(t) : e
}

function Ra(e) {
    return !ee(e, "__v_skip") && Object.isExtensible(e) && li(e, "__v_skip", !0), e
}

const xe = e => he(e) ? cn(e) : e, Gr = e => he(e) ? un(e) : e;

function we(e) {
    return e ? e.__v_isRef === !0 : !1
}

function Y(e) {
    return Ei(e, !1)
}

function Ai(e) {
    return Ei(e, !0)
}

function Ei(e, t) {
    return we(e) ? e : new Aa(e, t)
}

class Aa {
    constructor(t, n) {
        this.dep = new Dr, this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = n ? t : te(t), this._value = n ? t : xe(t), this.__v_isShallow = n
    }

    get value() {
        return this.dep.track(), this._value
    }

    set value(t) {
        const n = this._rawValue, r = this.__v_isShallow || Oe(t) || $t(t);
        t = r ? t : te(t), ft(t, n) && (this._rawValue = t, this._value = r ? t : xe(t), this.dep.trigger())
    }
}

function G(e) {
    return we(e) ? e.value : e
}

function He(e) {
    return se(e) ? e() : G(e)
}

const Ea = {
    get: (e, t, n) => t === "__v_raw" ? e : G(Reflect.get(e, t, n)), set: (e, t, n, r) => {
        const s = e[t];
        return we(s) && !we(n) ? (s.value = n, !0) : Reflect.set(e, t, n, r)
    }
};

function Ti(e) {
    return Nt(e) ? e : new Proxy(e, Ea)
}

class Ta {
    constructor(t, n, r) {
        this.fn = t, this.setter = n, this._value = void 0, this.dep = new Dr(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = ln - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = r
    }

    notify() {
        if (this.flags |= 16, !(this.flags & 8) && ce !== this) return pi(this, !0), !0
    }

    get value() {
        const t = this.dep.track();
        return vi(this), t && (t.version = this.dep.version), this._value
    }

    set value(t) {
        this.setter && this.setter(t)
    }
}

function La(e, t, n = !1) {
    let r, s;
    return se(e) ? r = e : (r = e.get, s = e.set), new Ta(r, s, n)
}

const Kn = {}, Gn = new WeakMap;
let Rt;

function Ia(e, t = !1, n = Rt) {
    if (n) {
        let r = Gn.get(n);
        r || Gn.set(n, r = []), r.push(e)
    }
}

function Ma(e, t, n = le) {
    const {immediate: r, deep: s, once: i, scheduler: l, augmentJob: o, call: a} = n,
        c = L => s ? L : Oe(L) || s === !1 || s === 0 ? rt(L, 1) : rt(L);
    let u, f, p, g, x = !1, b = !1;
    if (we(e) ? (f = () => e.value, x = Oe(e)) : Nt(e) ? (f = () => c(e), x = !0) : q(e) ? (b = !0, x = e.some(L => Nt(L) || Oe(L)), f = () => e.map(L => {
        if (we(L)) return L.value;
        if (Nt(L)) return c(L);
        if (se(L)) return a ? a(L, 2) : L()
    })) : se(e) ? t ? f = a ? () => a(e, 2) : e : f = () => {
        if (p) {
            _t();
            try {
                p()
            } finally {
                Ct()
            }
        }
        const L = Rt;
        Rt = u;
        try {
            return a ? a(e, 3, [g]) : e(g)
        } finally {
            Rt = L
        }
    } : f = wt, t && s) {
        const L = f, O = s === !0 ? 1 / 0 : s;
        f = () => rt(L(), O)
    }
    const T = fi(), k = () => {
        u.stop(), T && T.active && ti(T.effects, u)
    };
    if (i && t) {
        const L = t;
        t = (...O) => {
            L(...O), k()
        }
    }
    let _ = b ? new Array(e.length).fill(Kn) : Kn;
    const N = L => {
        if (!(!(u.flags & 1) || !u.dirty && !L)) if (t) {
            const O = u.run();
            if (s || x || (b ? O.some((K, j) => ft(K, _[j])) : ft(O, _))) {
                p && p();
                const K = Rt;
                Rt = u;
                try {
                    const j = [O, _ === Kn ? void 0 : b && _[0] === Kn ? [] : _, g];
                    a ? a(t, 3, j) : t(...j), _ = O
                } finally {
                    Rt = K
                }
            }
        } else u.run()
    };
    return o && o(N), u = new hi(f), u.scheduler = l ? () => l(N, !1) : N, g = L => Ia(L, !1, u), p = u.onStop = () => {
        const L = Gn.get(u);
        if (L) {
            if (a) a(L, 4); else for (const O of L) O();
            Gn.delete(u)
        }
    }, t ? r ? N(!0) : _ = u.run() : l ? l(N.bind(null, !0), !0) : u.run(), k.pause = u.pause.bind(u), k.resume = u.resume.bind(u), k.stop = k, k
}

function rt(e, t = 1 / 0, n) {
    if (t <= 0 || !he(e) || e.__v_skip || (n = n || new Set, n.has(e))) return e;
    if (n.add(e), t--, we(e)) rt(e.value, t, n); else if (q(e)) for (let r = 0; r < e.length; r++) rt(e[r], t, n); else if (Ht(e) || Dt(e)) e.forEach(r => {
        rt(r, t, n)
    }); else if (ii(e)) {
        for (const r in e) rt(e[r], t, n);
        for (const r of Object.getOwnPropertySymbols(e)) Object.prototype.propertyIsEnumerable.call(e, r) && rt(e[r], t, n)
    }
    return e
}

/**
 * @vue/runtime-core v3.5.13
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/function fn(e, t, n, r) {
    try {
        return r ? e(...r) : e()
    } catch (s) {
        Zn(s, t, n)
    }
}

function st(e, t, n, r) {
    if (se(e)) {
        const s = fn(e, t, n, r);
        return s && ri(s) && s.catch(i => {
            Zn(i, t, n)
        }), s
    }
    if (q(e)) {
        const s = [];
        for (let i = 0; i < e.length; i++) s.push(st(e[i], t, n, r));
        return s
    }
}

function Zn(e, t, n, r = !0) {
    const s = t ? t.vnode : null, {
        errorHandler: i,
        throwUnhandledErrorInProduction: l
    } = t && t.appContext.config || le;
    if (t) {
        let o = t.parent;
        const a = t.proxy, c = `https://vuejs.org/error-reference/#runtime-${n}`;
        for (; o;) {
            const u = o.ec;
            if (u) {
                for (let f = 0; f < u.length; f++) if (u[f](e, a, c) === !1) return
            }
            o = o.parent
        }
        if (i) {
            _t(), fn(i, null, 10, [e, a, c]), Ct();
            return
        }
    }
    Pa(e, n, s, r, l)
}

function Pa(e, t, n, r = !0, s = !1) {
    if (s) throw e;
    console.error(e)
}

const Ce = [];
let Ze = -1;
const Bt = [];
let ht = null, Vt = 0;
const Li = Promise.resolve();
let Jn = null;

function Wt(e) {
    const t = Jn || Li;
    return e ? t.then(this ? e.bind(this) : e) : t
}

function Oa(e) {
    let t = Ze + 1, n = Ce.length;
    for (; t < n;) {
        const r = t + n >>> 1, s = Ce[r], i = hn(s);
        i < e || i === e && s.flags & 2 ? t = r + 1 : n = r
    }
    return t
}

function Zr(e) {
    if (!(e.flags & 1)) {
        const t = hn(e), n = Ce[Ce.length - 1];
        !n || !(e.flags & 2) && t >= hn(n) ? Ce.push(e) : Ce.splice(Oa(t), 0, e), e.flags |= 1, Ii()
    }
}

function Ii() {
    Jn || (Jn = Li.then(Oi))
}

function ja(e) {
    q(e) ? Bt.push(...e) : ht && e.id === -1 ? ht.splice(Vt + 1, 0, e) : e.flags & 1 || (Bt.push(e), e.flags |= 1), Ii()
}

function Mi(e, t, n = Ze + 1) {
    for (; n < Ce.length; n++) {
        const r = Ce[n];
        if (r && r.flags & 2) {
            if (e && r.id !== e.uid) continue;
            Ce.splice(n, 1), n--, r.flags & 4 && (r.flags &= -2), r(), r.flags & 4 || (r.flags &= -2)
        }
    }
}

function Pi(e) {
    if (Bt.length) {
        const t = [...new Set(Bt)].sort((n, r) => hn(n) - hn(r));
        if (Bt.length = 0, ht) {
            ht.push(...t);
            return
        }
        for (ht = t, Vt = 0; Vt < ht.length; Vt++) {
            const n = ht[Vt];
            n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2
        }
        ht = null, Vt = 0
    }
}

const hn = e => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;

function Oi(e) {
    try {
        for (Ze = 0; Ze < Ce.length; Ze++) {
            const t = Ce[Ze];
            t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), fn(t, t.i, t.i ? 15 : 14), t.flags & 4 || (t.flags &= -2))
        }
    } finally {
        for (; Ze < Ce.length; Ze++) {
            const t = Ce[Ze];
            t && (t.flags &= -2)
        }
        Ze = -1, Ce.length = 0, Pi(), Jn = null, (Ce.length || Bt.length) && Oi()
    }
}

let Ae = null, ji = null;

function Yn(e) {
    const t = Ae;
    return Ae = e, ji = e && e.type.__scopeId || null, t
}

function za(e, t = Ae, n) {
    if (!t || e._n) return e;
    const r = (...s) => {
        r._d && nl(-1);
        const i = Yn(t);
        let l;
        try {
            l = e(...s)
        } finally {
            Yn(i), r._d && nl(1)
        }
        return l
    };
    return r._n = !0, r._c = !0, r._d = !0, r
}

function Qn(e, t) {
    if (Ae === null) return e;
    const n = lr(Ae), r = e.dirs || (e.dirs = []);
    for (let s = 0; s < t.length; s++) {
        let [i, l, o, a = le] = t[s];
        i && (se(i) && (i = {mounted: i, updated: i}), i.deep && rt(l), r.push({
            dir: i,
            instance: n,
            value: l,
            oldValue: void 0,
            arg: o,
            modifiers: a
        }))
    }
    return e
}

function At(e, t, n, r) {
    const s = e.dirs, i = t && t.dirs;
    for (let l = 0; l < s.length; l++) {
        const o = s[l];
        i && (o.oldValue = i[l].value);
        let a = o.dir[r];
        a && (_t(), st(a, n, 8, [e.el, o, e, t]), Ct())
    }
}

const Fa = Symbol("_vte"), Da = e => e.__isTeleport;

function Jr(e, t) {
    e.shapeFlag & 6 && e.component ? (e.transition = t, Jr(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t
}/*! #__NO_SIDE_EFFECTS__ */
function dn(e, t) {
    return se(e) ? Me({name: e.name}, t, {setup: e}) : e
}

function Ha(e) {
    e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0]
}

function dt(e) {
    const t = il(), n = Ai(null);
    if (t) {
        const s = t.refs === le ? t.refs = {} : t.refs;
        Object.defineProperty(s, e, {enumerable: !0, get: () => n.value, set: i => n.value = i})
    }
    return n
}

function Xn(e, t, n, r, s = !1) {
    if (q(e)) {
        e.forEach((x, b) => Xn(x, t && (q(t) ? t[b] : t), n, r, s));
        return
    }
    if (pn(r) && !s) {
        r.shapeFlag & 512 && r.type.__asyncResolved && r.component.subTree.component && Xn(e, t, n, r.component.subTree);
        return
    }
    const i = r.shapeFlag & 4 ? lr(r.component) : r.el, l = s ? null : i, {i: o, r: a} = e, c = t && t.r,
        u = o.refs === le ? o.refs = {} : o.refs, f = o.setupState, p = te(f), g = f === le ? () => !1 : x => ee(p, x);
    if (c != null && c !== a && (be(c) ? (u[c] = null, g(c) && (f[c] = null)) : we(c) && (c.value = null)), se(a)) fn(a, o, 12, [l, u]); else {
        const x = be(a), b = we(a);
        if (x || b) {
            const T = () => {
                if (e.f) {
                    const k = x ? g(a) ? f[a] : u[a] : a.value;
                    s ? q(k) && ti(k, i) : q(k) ? k.includes(i) || k.push(i) : x ? (u[a] = [i], g(a) && (f[a] = u[a])) : (a.value = [i], e.k && (u[e.k] = a.value))
                } else x ? (u[a] = l, g(a) && (f[a] = l)) : b && (a.value = l, e.k && (u[e.k] = l))
            };
            l ? (T.id = -1, Le(T, n)) : T()
        }
    }
}

tn().requestIdleCallback, tn().cancelIdleCallback;
const pn = e => !!e.type.__asyncLoader, Ua = e => e.type.__isKeepAlive;

function Na(e, t, n = Se, r = !1) {
    if (n) {
        const s = n[e] || (n[e] = []), i = t.__weh || (t.__weh = (...l) => {
            _t();
            const o = os(n), a = st(t, n, e, l);
            return o(), Ct(), a
        });
        return r ? s.unshift(i) : s.push(i), i
    }
}

const Yr = e => (t, n = Se) => {
    (!wn || e === "sp") && Na(e, (...r) => t(...r), n)
}, gn = Yr("m"), Ba = Yr("bum"), Qr = Yr("um"), Va = "components";

function Wa(e, t) {
    return Ka(Va, e, !0, t) || e
}

const qa = Symbol.for("v-ndc");

function Ka(e, t, n = !0, r = !1) {
    const s = Ae || Se;
    if (s) {
        const i = s.type;
        {
            const o = Tc(i, !1);
            if (o && (o === t || o === Pe(t) || o === Un(Pe(t)))) return i
        }
        const l = zi(s[e] || i[e], t) || zi(s.appContext[e], t);
        return !l && r ? i : l
    }
}

function zi(e, t) {
    return e && (e[t] || e[Pe(t)] || e[Un(Pe(t))])
}

function je(e, t, n, r) {
    let s;
    const i = n, l = q(e);
    if (l || be(e)) {
        const o = l && Nt(e);
        let a = !1;
        o && (a = !Oe(e), e = Vn(e)), s = new Array(e.length);
        for (let c = 0, u = e.length; c < u; c++) s[c] = t(a ? xe(e[c]) : e[c], c, void 0, i)
    } else if (typeof e == "number") {
        s = new Array(e);
        for (let o = 0; o < e; o++) s[o] = t(o + 1, o, void 0, i)
    } else if (he(e)) if (e[Symbol.iterator]) s = Array.from(e, (o, a) => t(o, a, void 0, i)); else {
        const o = Object.keys(e);
        s = new Array(o.length);
        for (let a = 0, c = o.length; a < c; a++) {
            const u = o[a];
            s[a] = t(e[u], u, a, i)
        }
    } else s = [];
    return s
}

const Xr = e => e ? ol(e) ? lr(e) : Xr(e.parent) : null, mn = Me(Object.create(null), {
    $: e => e,
    $el: e => e.vnode.el,
    $data: e => e.data,
    $props: e => e.props,
    $attrs: e => e.attrs,
    $slots: e => e.slots,
    $refs: e => e.refs,
    $parent: e => Xr(e.parent),
    $root: e => Xr(e.root),
    $host: e => e.ce,
    $emit: e => e.emit,
    $options: e => e.type,
    $forceUpdate: e => e.f || (e.f = () => {
        Zr(e.update)
    }),
    $nextTick: e => e.n || (e.n = Wt.bind(e.proxy)),
    $watch: e => wt
}), es = (e, t) => e !== le && !e.__isScriptSetup && ee(e, t), Ga = {
    get({_: e}, t) {
        if (t === "__v_skip") return !0;
        const {ctx: n, setupState: r, data: s, props: i, accessCache: l, type: o, appContext: a} = e;
        let c;
        if (t[0] !== "$") {
            const g = l[t];
            if (g !== void 0) switch (g) {
                case 1:
                    return r[t];
                case 2:
                    return s[t];
                case 4:
                    return n[t];
                case 3:
                    return i[t]
            } else {
                if (es(r, t)) return l[t] = 1, r[t];
                if (s !== le && ee(s, t)) return l[t] = 2, s[t];
                if ((c = e.propsOptions[0]) && ee(c, t)) return l[t] = 3, i[t];
                if (n !== le && ee(n, t)) return l[t] = 4, n[t];
                l[t] = 0
            }
        }
        const u = mn[t];
        let f, p;
        if (u) return t === "$attrs" && ke(e.attrs, "get", ""), u(e);
        if ((f = o.__cssModules) && (f = f[t])) return f;
        if (n !== le && ee(n, t)) return l[t] = 4, n[t];
        if (p = a.config.globalProperties, ee(p, t)) return p[t]
    }, set({_: e}, t, n) {
        const {data: r, setupState: s, ctx: i} = e;
        return es(s, t) ? (s[t] = n, !0) : r !== le && ee(r, t) ? (r[t] = n, !0) : ee(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (i[t] = n, !0)
    }, has({_: {data: e, setupState: t, accessCache: n, ctx: r, appContext: s, propsOptions: i}}, l) {
        let o;
        return !!n[l] || e !== le && ee(e, l) || es(t, l) || (o = i[0]) && ee(o, l) || ee(r, l) || ee(mn, l) || ee(s.config.globalProperties, l)
    }, defineProperty(e, t, n) {
        return n.get != null ? e._.accessCache[t] = 0 : ee(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n)
    }
};

function Fi() {
    return {
        app: null,
        config: {
            isNativeTag: Go,
            performance: !1,
            globalProperties: {},
            optionMergeStrategies: {},
            errorHandler: void 0,
            warnHandler: void 0,
            compilerOptions: {}
        },
        mixins: [],
        components: {},
        directives: {},
        provides: Object.create(null),
        optionsCache: new WeakMap,
        propsCache: new WeakMap,
        emitsCache: new WeakMap
    }
}

let Za = 0;

function Ja(e, t) {
    return function (r, s = null) {
        se(r) || (r = Me({}, r)), s != null && !he(s) && (s = null);
        const i = Fi(), l = new WeakSet, o = [];
        let a = !1;
        const c = i.app = {
            _uid: Za++,
            _component: r,
            _props: s,
            _container: null,
            _context: i,
            _instance: null,
            version: Ic,
            get config() {
                return i.config
            },
            set config(u) {
            },
            use(u, ...f) {
                return l.has(u) || (u && se(u.install) ? (l.add(u), u.install(c, ...f)) : se(u) && (l.add(u), u(c, ...f))), c
            },
            mixin(u) {
                return c
            },
            component(u, f) {
                return f ? (i.components[u] = f, c) : i.components[u]
            },
            directive(u, f) {
                return f ? (i.directives[u] = f, c) : i.directives[u]
            },
            mount(u, f, p) {
                if (!a) {
                    const g = c._ceVNode || oe(r, s);
                    return g.appContext = i, p === !0 ? p = "svg" : p === !1 && (p = void 0), e(g, u, p), a = !0, c._container = u, u.__vue_app__ = c, lr(g.component)
                }
            },
            onUnmount(u) {
                o.push(u)
            },
            unmount() {
                a && (st(o, c._instance, 16), e(null, c._container), delete c._container.__vue_app__)
            },
            provide(u, f) {
                return i.provides[u] = f, c
            },
            runWithContext(u) {
                const f = qt;
                qt = c;
                try {
                    return u()
                } finally {
                    qt = f
                }
            }
        };
        return c
    }
}

let qt = null;

function Ya(e, t) {
    if (Se) {
        let n = Se.provides;
        const r = Se.parent && Se.parent.provides;
        r === n && (n = Se.provides = Object.create(r)), n[e] = t
    }
}

function er(e, t, n = !1) {
    const r = Se || Ae;
    if (r || qt) {
        const s = qt ? qt._context.provides : r ? r.parent == null ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : void 0;
        if (s && e in s) return s[e];
        if (arguments.length > 1) return n && se(t) ? t.call(r && r.proxy) : t
    }
}

const Di = {}, Hi = () => Object.create(Di), Ui = e => Object.getPrototypeOf(e) === Di;

function Qa(e, t, n, r = !1) {
    const s = {}, i = Hi();
    e.propsDefaults = Object.create(null), Ni(e, t, s, i);
    for (const l in e.propsOptions[0]) l in s || (s[l] = void 0);
    n ? e.props = r ? s : $a(s) : e.type.props ? e.props = s : e.props = i, e.attrs = i
}

function Xa(e, t, n, r) {
    const {props: s, attrs: i, vnode: {patchFlag: l}} = e, o = te(s), [a] = e.propsOptions;
    let c = !1;
    if ((r || l > 0) && !(l & 16)) {
        if (l & 8) {
            const u = e.vnode.dynamicProps;
            for (let f = 0; f < u.length; f++) {
                let p = u[f];
                if (tr(e.emitsOptions, p)) continue;
                const g = t[p];
                if (a) if (ee(i, p)) g !== i[p] && (i[p] = g, c = !0); else {
                    const x = Pe(p);
                    s[x] = ts(a, o, x, g, e, !1)
                } else g !== i[p] && (i[p] = g, c = !0)
            }
        }
    } else {
        Ni(e, t, s, i) && (c = !0);
        let u;
        for (const f in o) (!t || !ee(t, f) && ((u = kt(f)) === f || !ee(t, u))) && (a ? n && (n[f] !== void 0 || n[u] !== void 0) && (s[f] = ts(a, o, f, void 0, e, !0)) : delete s[f]);
        if (i !== o) for (const f in i) (!t || !ee(t, f)) && (delete i[f], c = !0)
    }
    c && tt(e.attrs, "set", "")
}

function Ni(e, t, n, r) {
    const [s, i] = e.propsOptions;
    let l = !1, o;
    if (t) for (let a in t) {
        if (en(a)) continue;
        const c = t[a];
        let u;
        s && ee(s, u = Pe(a)) ? !i || !i.includes(u) ? n[u] = c : (o || (o = {}))[u] = c : tr(e.emitsOptions, a) || (!(a in r) || c !== r[a]) && (r[a] = c, l = !0)
    }
    if (i) {
        const a = te(n), c = o || le;
        for (let u = 0; u < i.length; u++) {
            const f = i[u];
            n[f] = ts(s, a, f, c[f], e, !ee(c, f))
        }
    }
    return l
}

function ts(e, t, n, r, s, i) {
    const l = e[n];
    if (l != null) {
        const o = ee(l, "default");
        if (o && r === void 0) {
            const a = l.default;
            if (l.type !== Function && !l.skipFactory && se(a)) {
                const {propsDefaults: c} = s;
                if (n in c) r = c[n]; else {
                    const u = os(s);
                    r = c[n] = a.call(null, t), u()
                }
            } else r = a;
            s.ce && s.ce._setProp(n, r)
        }
        l[0] && (i && !o ? r = !1 : l[1] && (r === "" || r === kt(n)) && (r = !0))
    }
    return r
}

function ec(e, t, n = !1) {
    const r = t.propsCache, s = r.get(e);
    if (s) return s;
    const i = e.props, l = {}, o = [];
    if (!i) return he(e) && r.set(e, Ft), Ft;
    if (q(i)) for (let c = 0; c < i.length; c++) {
        const u = Pe(i[c]);
        Bi(u) && (l[u] = le)
    } else if (i) for (const c in i) {
        const u = Pe(c);
        if (Bi(u)) {
            const f = i[c], p = l[u] = q(f) || se(f) ? {type: f} : Me({}, f), g = p.type;
            let x = !1, b = !0;
            if (q(g)) for (let T = 0; T < g.length; ++T) {
                const k = g[T], _ = se(k) && k.name;
                if (_ === "Boolean") {
                    x = !0;
                    break
                } else _ === "String" && (b = !1)
            } else x = se(g) && g.name === "Boolean";
            p[0] = x, p[1] = b, (x || ee(p, "default")) && o.push(u)
        }
    }
    const a = [l, o];
    return he(e) && r.set(e, a), a
}

function Bi(e) {
    return e[0] !== "$" && !en(e)
}

const Vi = e => e[0] === "_" || e === "$stable", ns = e => q(e) ? e.map(Je) : [Je(e)], tc = (e, t, n) => {
    if (t._n) return t;
    const r = za((...s) => ns(t(...s)), n);
    return r._c = !1, r
}, Wi = (e, t, n) => {
    const r = e._ctx;
    for (const s in e) {
        if (Vi(s)) continue;
        const i = e[s];
        if (se(i)) t[s] = tc(s, i, r); else if (i != null) {
            const l = ns(i);
            t[s] = () => l
        }
    }
}, qi = (e, t) => {
    const n = ns(t);
    e.slots.default = () => n
}, Ki = (e, t, n) => {
    for (const r in t) (n || r !== "_") && (e[r] = t[r])
}, nc = (e, t, n) => {
    const r = e.slots = Hi();
    if (e.vnode.shapeFlag & 32) {
        const s = t._;
        s ? (Ki(r, t, n), n && li(r, "_", s, !0)) : Wi(t, r)
    } else t && qi(e, t)
}, rc = (e, t, n) => {
    const {vnode: r, slots: s} = e;
    let i = !0, l = le;
    if (r.shapeFlag & 32) {
        const o = t._;
        o ? n && o === 1 ? i = !1 : Ki(s, t, n) : (i = !t.$stable, Wi(t, s)), l = t
    } else t && (qi(e, t), l = {default: 1});
    if (i) for (const o in s) !Vi(o) && l[o] == null && delete s[o]
};

function sc() {
    typeof __VUE_PROD_HYDRATION_MISMATCH_DETAILS__ != "boolean" && (tn().__VUE_PROD_HYDRATION_MISMATCH_DETAILS__ = !1)
}

const Le = bc;

function ic(e) {
    return lc(e)
}

function lc(e, t) {
    sc();
    const n = tn();
    n.__VUE__ = !0;
    const {
        insert: r,
        remove: s,
        patchProp: i,
        createElement: l,
        createText: o,
        createComment: a,
        setText: c,
        setElementText: u,
        parentNode: f,
        nextSibling: p,
        setScopeId: g = wt,
        insertStaticContent: x
    } = e, b = (h, d, m, y = null, w = null, v = null, A = void 0, S = null, $ = !!d.dynamicChildren) => {
        if (h === d) return;
        h && !yn(h, d) && (y = bt(h), Fe(h, w, v, !0), h = null), d.patchFlag === -2 && ($ = !1, d.dynamicChildren = null);
        const {type: C, ref: U, shapeFlag: M} = d;
        switch (C) {
            case nr:
                T(h, d, m, y);
                break;
            case Tt:
                k(h, d, m, y);
                break;
            case ss:
                h == null && _(d, m, y, A);
                break;
            case ue:
                V(h, d, m, y, w, v, A, S, $);
                break;
            default:
                M & 1 ? O(h, d, m, y, w, v, A, S, $) : M & 6 ? D(h, d, m, y, w, v, A, S, $) : (M & 64 || M & 128) && C.process(h, d, m, y, w, v, A, S, $, R)
        }
        U != null && w && Xn(U, h && h.ref, v, d || h, !d)
    }, T = (h, d, m, y) => {
        if (h == null) r(d.el = o(d.children), m, y); else {
            const w = d.el = h.el;
            d.children !== h.children && c(w, d.children)
        }
    }, k = (h, d, m, y) => {
        h == null ? r(d.el = a(d.children || ""), m, y) : d.el = h.el
    }, _ = (h, d, m, y) => {
        [h.el, h.anchor] = x(h.children, d, m, y, h.el, h.anchor)
    }, N = ({el: h, anchor: d}, m, y) => {
        let w;
        for (; h && h !== d;) w = p(h), r(h, m, y), h = w;
        r(d, m, y)
    }, L = ({el: h, anchor: d}) => {
        let m;
        for (; h && h !== d;) m = p(h), s(h), h = m;
        s(d)
    }, O = (h, d, m, y, w, v, A, S, $) => {
        d.type === "svg" ? A = "svg" : d.type === "math" && (A = "mathml"), h == null ? K(d, m, y, w, v, A, S, $) : me(h, d, w, v, A, S, $)
    }, K = (h, d, m, y, w, v, A, S) => {
        let $, C;
        const {props: U, shapeFlag: M, transition: H, dirs: B} = h;
        if ($ = h.el = l(h.type, v, U && U.is, U), M & 8 ? u($, h.children) : M & 16 && J(h.children, $, null, y, w, rs(h, v), A, S), B && At(h, null, y, "created"), j($, h, h.scopeId, A, y), U) {
            for (const ae in U) ae !== "value" && !en(ae) && i($, ae, null, U[ae], v, y);
            "value" in U && i($, "value", null, U.value, v), (C = U.onVnodeBeforeMount) && Ye(C, y, h)
        }
        B && At(h, null, y, "beforeMount");
        const Z = oc(w, H);
        Z && H.beforeEnter($), r($, d, m), ((C = U && U.onVnodeMounted) || Z || B) && Le(() => {
            C && Ye(C, y, h), Z && H.enter($), B && At(h, null, y, "mounted")
        }, w)
    }, j = (h, d, m, y, w) => {
        if (m && g(h, m), y) for (let v = 0; v < y.length; v++) g(h, y[v]);
        if (w) {
            let v = w.subTree;
            if (d === v || tl(v.type) && (v.ssContent === d || v.ssFallback === d)) {
                const A = w.vnode;
                j(h, A, A.scopeId, A.slotScopeIds, w.parent)
            }
        }
    }, J = (h, d, m, y, w, v, A, S, $ = 0) => {
        for (let C = $; C < h.length; C++) {
            const U = h[C] = S ? pt(h[C]) : Je(h[C]);
            b(null, U, d, m, y, w, v, A, S)
        }
    }, me = (h, d, m, y, w, v, A) => {
        const S = d.el = h.el;
        let {patchFlag: $, dynamicChildren: C, dirs: U} = d;
        $ |= h.patchFlag & 16;
        const M = h.props || le, H = d.props || le;
        let B;
        if (m && Et(m, !1), (B = H.onVnodeBeforeUpdate) && Ye(B, m, d, h), U && At(d, h, m, "beforeUpdate"), m && Et(m, !0), (M.innerHTML && H.innerHTML == null || M.textContent && H.textContent == null) && u(S, ""), C ? Be(h.dynamicChildren, C, S, m, y, rs(d, w), v) : A || ut(h, d, S, null, m, y, rs(d, w), v, !1), $ > 0) {
            if ($ & 16) E(S, M, H, m, w); else if ($ & 2 && M.class !== H.class && i(S, "class", null, H.class, w), $ & 4 && i(S, "style", M.style, H.style, w), $ & 8) {
                const Z = d.dynamicProps;
                for (let ae = 0; ae < Z.length; ae++) {
                    const re = Z[ae], Ee = M[re], Re = H[re];
                    (Re !== Ee || re === "value") && i(S, re, Ee, Re, w, m)
                }
            }
            $ & 1 && h.children !== d.children && u(S, d.children)
        } else !A && C == null && E(S, M, H, m, w);
        ((B = H.onVnodeUpdated) || U) && Le(() => {
            B && Ye(B, m, d, h), U && At(d, h, m, "updated")
        }, y)
    }, Be = (h, d, m, y, w, v, A) => {
        for (let S = 0; S < d.length; S++) {
            const $ = h[S], C = d[S], U = $.el && ($.type === ue || !yn($, C) || $.shapeFlag & 70) ? f($.el) : m;
            b($, C, U, null, y, w, v, A, !0)
        }
    }, E = (h, d, m, y, w) => {
        if (d !== m) {
            if (d !== le) for (const v in d) !en(v) && !(v in m) && i(h, v, d[v], null, w, y);
            for (const v in m) {
                if (en(v)) continue;
                const A = m[v], S = d[v];
                A !== S && v !== "value" && i(h, v, S, A, w, y)
            }
            "value" in m && i(h, "value", d.value, m.value, w)
        }
    }, V = (h, d, m, y, w, v, A, S, $) => {
        const C = d.el = h ? h.el : o(""), U = d.anchor = h ? h.anchor : o("");
        let {patchFlag: M, dynamicChildren: H, slotScopeIds: B} = d;
        B && (S = S ? S.concat(B) : B), h == null ? (r(C, m, y), r(U, m, y), J(d.children || [], m, U, w, v, A, S, $)) : M > 0 && M & 64 && H && h.dynamicChildren ? (Be(h.dynamicChildren, H, m, w, v, A, S), (d.key != null || w && d === w.subTree) && Gi(h, d, !0)) : ut(h, d, m, U, w, v, A, S, $)
    }, D = (h, d, m, y, w, v, A, S, $) => {
        d.slotScopeIds = S, h == null ? d.shapeFlag & 512 ? w.ctx.activate(d, m, y, A, $) : de(d, m, y, w, v, A, $) : ye(h, d, $)
    }, de = (h, d, m, y, w, v, A) => {
        const S = h.component = Sc(h, y, w);
        if (Ua(h) && (S.ctx.renderer = R), $c(S, !1, A), S.asyncDep) {
            if (w && w.registerDep(S, ve, A), !h.el) {
                const $ = S.subTree = oe(Tt);
                k(null, $, d, m)
            }
        } else ve(S, h, d, m, w, v, A)
    }, ye = (h, d, m) => {
        const y = d.component = h.component;
        if (mc(h, d, m)) if (y.asyncDep && !y.asyncResolved) {
            Xe(y, d, m);
            return
        } else y.next = d, y.update(); else d.el = h.el, y.vnode = d
    }, ve = (h, d, m, y, w, v, A) => {
        const S = () => {
            if (h.isMounted) {
                let {next: M, bu: H, u: B, parent: Z, vnode: ae} = h;
                {
                    const We = Zi(h);
                    if (We) {
                        M && (M.el = ae.el, Xe(h, M, A)), We.asyncDep.then(() => {
                            h.isUnmounted || S()
                        });
                        return
                    }
                }
                let re = M, Ee;
                Et(h, !1), M ? (M.el = ae.el, Xe(h, M, A)) : M = ae, H && Nn(H), (Ee = M.props && M.props.onVnodeBeforeUpdate) && Ye(Ee, Z, M, ae), Et(h, !0);
                const Re = Xi(h), Ve = h.subTree;
                h.subTree = Re, b(Ve, Re, f(Ve.el), bt(Ve), h, w, v), M.el = Re.el, re === null && vc(h, Re.el), B && Le(B, w), (Ee = M.props && M.props.onVnodeUpdated) && Le(() => Ye(Ee, Z, M, ae), w)
            } else {
                let M;
                const {el: H, props: B} = d, {bm: Z, m: ae, parent: re, root: Ee, type: Re} = h, Ve = pn(d);
                Et(h, !1), Z && Nn(Z), !Ve && (M = B && B.onVnodeBeforeMount) && Ye(M, re, d), Et(h, !0);
                {
                    Ee.ce && Ee.ce._injectChildStyle(Re);
                    const We = h.subTree = Xi(h);
                    b(null, We, m, y, h, w, v), d.el = We.el
                }
                if (ae && Le(ae, w), !Ve && (M = B && B.onVnodeMounted)) {
                    const We = d;
                    Le(() => Ye(M, re, We), w)
                }
                (d.shapeFlag & 256 || re && pn(re.vnode) && re.vnode.shapeFlag & 256) && h.a && Le(h.a, w), h.isMounted = !0, d = m = y = null
            }
        };
        h.scope.on();
        const $ = h.effect = new hi(S);
        h.scope.off();
        const C = h.update = $.run.bind($), U = h.job = $.runIfDirty.bind($);
        U.i = h, U.id = h.uid, $.scheduler = () => Zr(U), Et(h, !0), C()
    }, Xe = (h, d, m) => {
        d.component = h;
        const y = h.vnode.props;
        h.vnode = d, h.next = null, Xa(h, d.props, y, m), rc(h, d.children, m), _t(), Mi(h), Ct()
    }, ut = (h, d, m, y, w, v, A, S, $ = !1) => {
        const C = h && h.children, U = h ? h.shapeFlag : 0, M = d.children, {patchFlag: H, shapeFlag: B} = d;
        if (H > 0) {
            if (H & 128) {
                In(C, M, m, y, w, v, A, S, $);
                return
            } else if (H & 256) {
                Jt(C, M, m, y, w, v, A, S, $);
                return
            }
        }
        B & 8 ? (U & 16 && vt(C, w, v), M !== C && u(m, M)) : U & 16 ? B & 16 ? In(C, M, m, y, w, v, A, S, $) : vt(C, w, v, !0) : (U & 8 && u(m, ""), B & 16 && J(M, m, y, w, v, A, S, $))
    }, Jt = (h, d, m, y, w, v, A, S, $) => {
        h = h || Ft, d = d || Ft;
        const C = h.length, U = d.length, M = Math.min(C, U);
        let H;
        for (H = 0; H < M; H++) {
            const B = d[H] = $ ? pt(d[H]) : Je(d[H]);
            b(h[H], B, m, null, w, v, A, S, $)
        }
        C > U ? vt(h, w, v, !0, !1, M) : J(d, m, y, w, v, A, S, $, M)
    }, In = (h, d, m, y, w, v, A, S, $) => {
        let C = 0;
        const U = d.length;
        let M = h.length - 1, H = U - 1;
        for (; C <= M && C <= H;) {
            const B = h[C], Z = d[C] = $ ? pt(d[C]) : Je(d[C]);
            if (yn(B, Z)) b(B, Z, m, null, w, v, A, S, $); else break;
            C++
        }
        for (; C <= M && C <= H;) {
            const B = h[M], Z = d[H] = $ ? pt(d[H]) : Je(d[H]);
            if (yn(B, Z)) b(B, Z, m, null, w, v, A, S, $); else break;
            M--, H--
        }
        if (C > M) {
            if (C <= H) {
                const B = H + 1, Z = B < U ? d[B].el : y;
                for (; C <= H;) b(null, d[C] = $ ? pt(d[C]) : Je(d[C]), m, Z, w, v, A, S, $), C++
            }
        } else if (C > H) for (; C <= M;) Fe(h[C], w, v, !0), C++; else {
            const B = C, Z = C, ae = new Map;
            for (C = Z; C <= H; C++) {
                const Te = d[C] = $ ? pt(d[C]) : Je(d[C]);
                Te.key != null && ae.set(Te.key, C)
            }
            let re, Ee = 0;
            const Re = H - Z + 1;
            let Ve = !1, We = 0;
            const Yt = new Array(Re);
            for (C = 0; C < Re; C++) Yt[C] = 0;
            for (C = B; C <= M; C++) {
                const Te = h[C];
                if (Ee >= Re) {
                    Fe(Te, w, v, !0);
                    continue
                }
                let qe;
                if (Te.key != null) qe = ae.get(Te.key); else for (re = Z; re <= H; re++) if (Yt[re - Z] === 0 && yn(Te, d[re])) {
                    qe = re;
                    break
                }
                qe === void 0 ? Fe(Te, w, v, !0) : (Yt[qe - Z] = C + 1, qe >= We ? We = qe : Ve = !0, b(Te, d[qe], m, null, w, v, A, S, $), Ee++)
            }
            const Ss = Ve ? ac(Yt) : Ft;
            for (re = Ss.length - 1, C = Re - 1; C >= 0; C--) {
                const Te = Z + C, qe = d[Te], $s = Te + 1 < U ? d[Te + 1].el : y;
                Yt[C] === 0 ? b(null, qe, m, $s, w, v, A, S, $) : Ve && (re < 0 || C !== Ss[re] ? Pt(qe, m, $s, 2) : re--)
            }
        }
    }, Pt = (h, d, m, y, w = null) => {
        const {el: v, type: A, transition: S, children: $, shapeFlag: C} = h;
        if (C & 6) {
            Pt(h.component.subTree, d, m, y);
            return
        }
        if (C & 128) {
            h.suspense.move(d, m, y);
            return
        }
        if (C & 64) {
            A.move(h, d, m, R);
            return
        }
        if (A === ue) {
            r(v, d, m);
            for (let M = 0; M < $.length; M++) Pt($[M], d, m, y);
            r(h.anchor, d, m);
            return
        }
        if (A === ss) {
            N(h, d, m);
            return
        }
        if (y !== 2 && C & 1 && S) if (y === 0) S.beforeEnter(v), r(v, d, m), Le(() => S.enter(v), w); else {
            const {leave: M, delayLeave: H, afterLeave: B} = S, Z = () => r(v, d, m), ae = () => {
                M(v, () => {
                    Z(), B && B()
                })
            };
            H ? H(v, Z, ae) : ae()
        } else r(v, d, m)
    }, Fe = (h, d, m, y = !1, w = !1) => {
        const {
            type: v,
            props: A,
            ref: S,
            children: $,
            dynamicChildren: C,
            shapeFlag: U,
            patchFlag: M,
            dirs: H,
            cacheIndex: B
        } = h;
        if (M === -2 && (w = !1), S != null && Xn(S, null, m, h, !0), B != null && (d.renderCache[B] = void 0), U & 256) {
            d.ctx.deactivate(h);
            return
        }
        const Z = U & 1 && H, ae = !pn(h);
        let re;
        if (ae && (re = A && A.onVnodeBeforeUnmount) && Ye(re, d, h), U & 6) Pn(h.component, m, y); else {
            if (U & 128) {
                h.suspense.unmount(m, y);
                return
            }
            Z && At(h, null, d, "beforeUnmount"), U & 64 ? h.type.remove(h, d, m, R, y) : C && !C.hasOnce && (v !== ue || M > 0 && M & 64) ? vt(C, d, m, !1, !0) : (v === ue && M & 384 || !w && U & 16) && vt($, d, m), y && Mn(h)
        }
        (ae && (re = A && A.onVnodeUnmounted) || Z) && Le(() => {
            re && Ye(re, d, h), Z && At(h, null, d, "unmounted")
        }, m)
    }, Mn = h => {
        const {type: d, el: m, anchor: y, transition: w} = h;
        if (d === ue) {
            _r(m, y);
            return
        }
        if (d === ss) {
            L(h);
            return
        }
        const v = () => {
            s(m), w && !w.persisted && w.afterLeave && w.afterLeave()
        };
        if (h.shapeFlag & 1 && w && !w.persisted) {
            const {leave: A, delayLeave: S} = w, $ = () => A(m, v);
            S ? S(h.el, v, $) : $()
        } else v()
    }, _r = (h, d) => {
        let m;
        for (; h !== d;) m = p(h), s(h), h = m;
        s(d)
    }, Pn = (h, d, m) => {
        const {bum: y, scope: w, job: v, subTree: A, um: S, m: $, a: C} = h;
        Ji($), Ji(C), y && Nn(y), w.stop(), v && (v.flags |= 8, Fe(A, h, d, m)), S && Le(S, d), Le(() => {
            h.isUnmounted = !0
        }, d), d && d.pendingBranch && !d.isUnmounted && h.asyncDep && !h.asyncResolved && h.suspenseId === d.pendingId && (d.deps--, d.deps === 0 && d.resolve())
    }, vt = (h, d, m, y = !1, w = !1, v = 0) => {
        for (let A = v; A < h.length; A++) Fe(h[A], d, m, y, w)
    }, bt = h => {
        if (h.shapeFlag & 6) return bt(h.component.subTree);
        if (h.shapeFlag & 128) return h.suspense.next();
        const d = p(h.anchor || h.el), m = d && d[Fa];
        return m ? p(m) : d
    };
    let Ot = !1;
    const z = (h, d, m) => {
        h == null ? d._vnode && Fe(d._vnode, null, null, !0) : b(d._vnode || null, h, d, null, null, null, m), d._vnode = h, Ot || (Ot = !0, Mi(), Pi(), Ot = !1)
    }, R = {p: b, um: Fe, m: Pt, r: Mn, mt: de, mc: J, pc: ut, pbc: Be, n: bt, o: e};
    return {render: z, hydrate: void 0, createApp: Ja(z)}
}

function rs({type: e, props: t}, n) {
    return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n
}

function Et({effect: e, job: t}, n) {
    n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5)
}

function oc(e, t) {
    return (!e || e && !e.pendingBranch) && t && !t.persisted
}

function Gi(e, t, n = !1) {
    const r = e.children, s = t.children;
    if (q(r) && q(s)) for (let i = 0; i < r.length; i++) {
        const l = r[i];
        let o = s[i];
        o.shapeFlag & 1 && !o.dynamicChildren && ((o.patchFlag <= 0 || o.patchFlag === 32) && (o = s[i] = pt(s[i]), o.el = l.el), !n && o.patchFlag !== -2 && Gi(l, o)), o.type === nr && (o.el = l.el)
    }
}

function ac(e) {
    const t = e.slice(), n = [0];
    let r, s, i, l, o;
    const a = e.length;
    for (r = 0; r < a; r++) {
        const c = e[r];
        if (c !== 0) {
            if (s = n[n.length - 1], e[s] < c) {
                t[r] = s, n.push(r);
                continue
            }
            for (i = 0, l = n.length - 1; i < l;) o = i + l >> 1, e[n[o]] < c ? i = o + 1 : l = o;
            c < e[n[i]] && (i > 0 && (t[r] = n[i - 1]), n[i] = r)
        }
    }
    for (i = n.length, l = n[i - 1]; i-- > 0;) n[i] = l, l = t[l];
    return n
}

function Zi(e) {
    const t = e.subTree.component;
    if (t) return t.asyncDep && !t.asyncResolved ? t : Zi(t)
}

function Ji(e) {
    if (e) for (let t = 0; t < e.length; t++) e[t].flags |= 8
}

const cc = Symbol.for("v-scx"), uc = () => er(cc);

function Yi(e, t) {
    return Qi(e, null, t)
}

function it(e, t, n) {
    return Qi(e, t, n)
}

function Qi(e, t, n = le) {
    const {immediate: r, deep: s, flush: i, once: l} = n, o = Me({}, n), a = t && r || !t && i !== "post";
    let c;
    if (wn) {
        if (i === "sync") {
            const g = uc();
            c = g.__watcherHandles || (g.__watcherHandles = [])
        } else if (!a) {
            const g = () => {
            };
            return g.stop = wt, g.resume = wt, g.pause = wt, g
        }
    }
    const u = Se;
    o.call = (g, x, b) => st(g, u, x, b);
    let f = !1;
    i === "post" ? o.scheduler = g => {
        Le(g, u && u.suspense)
    } : i !== "sync" && (f = !0, o.scheduler = (g, x) => {
        x ? g() : Zr(g)
    }), o.augmentJob = g => {
        t && (g.flags |= 4), f && (g.flags |= 2, u && (g.id = u.uid, g.i = u))
    };
    const p = Ma(e, t, o);
    return wn && (c ? c.push(p) : a && p()), p
}

const fc = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${Pe(t)}Modifiers`] || e[`${kt(t)}Modifiers`];

function hc(e, t, ...n) {
    if (e.isUnmounted) return;
    const r = e.vnode.props || le;
    let s = n;
    const i = t.startsWith("update:"), l = i && fc(r, t.slice(7));
    l && (l.trim && (s = n.map(u => be(u) ? u.trim() : u)), l.number && (s = n.map(Bn)));
    let o, a = r[o = Lr(t)] || r[o = Lr(Pe(t))];
    !a && i && (a = r[o = Lr(kt(t))]), a && st(a, e, 6, s);
    const c = r[o + "Once"];
    if (c) {
        if (!e.emitted) e.emitted = {}; else if (e.emitted[o]) return;
        e.emitted[o] = !0, st(c, e, 6, s)
    }
}

function dc(e, t, n = !1) {
    const r = t.emitsCache, s = r.get(e);
    if (s !== void 0) return s;
    const i = e.emits;
    let l = {};
    return i ? (q(i) ? i.forEach(o => l[o] = null) : Me(l, i), he(e) && r.set(e, l), l) : (he(e) && r.set(e, null), null)
}

function tr(e, t) {
    return !e || !Dn(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), ee(e, t[0].toLowerCase() + t.slice(1)) || ee(e, kt(t)) || ee(e, t))
}

function Xi(e) {
    const {
        type: t,
        vnode: n,
        proxy: r,
        withProxy: s,
        propsOptions: [i],
        slots: l,
        attrs: o,
        emit: a,
        render: c,
        renderCache: u,
        props: f,
        data: p,
        setupState: g,
        ctx: x,
        inheritAttrs: b
    } = e, T = Yn(e);
    let k, _;
    try {
        if (n.shapeFlag & 4) {
            const L = s || r, O = L;
            k = Je(c.call(O, L, u, f, g, p, x)), _ = o
        } else {
            const L = t;
            k = Je(L.length > 1 ? L(f, {attrs: o, slots: l, emit: a}) : L(f, null)), _ = t.props ? o : pc(o)
        }
    } catch (L) {
        vn.length = 0, Zn(L, e, 1), k = oe(Tt)
    }
    let N = k;
    if (_ && b !== !1) {
        const L = Object.keys(_), {shapeFlag: O} = N;
        L.length && O & 7 && (i && L.some(Er) && (_ = gc(_, i)), N = Kt(N, _, !1, !0))
    }
    return n.dirs && (N = Kt(N, null, !1, !0), N.dirs = N.dirs ? N.dirs.concat(n.dirs) : n.dirs), n.transition && Jr(N, n.transition), k = N, Yn(T), k
}

const pc = e => {
    let t;
    for (const n in e) (n === "class" || n === "style" || Dn(n)) && ((t || (t = {}))[n] = e[n]);
    return t
}, gc = (e, t) => {
    const n = {};
    for (const r in e) (!Er(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
    return n
};

function mc(e, t, n) {
    const {props: r, children: s, component: i} = e, {props: l, children: o, patchFlag: a} = t, c = i.emitsOptions;
    if (t.dirs || t.transition) return !0;
    if (n && a >= 0) {
        if (a & 1024) return !0;
        if (a & 16) return r ? el(r, l, c) : !!l;
        if (a & 8) {
            const u = t.dynamicProps;
            for (let f = 0; f < u.length; f++) {
                const p = u[f];
                if (l[p] !== r[p] && !tr(c, p)) return !0
            }
        }
    } else return (s || o) && (!o || !o.$stable) ? !0 : r === l ? !1 : r ? l ? el(r, l, c) : !0 : !!l;
    return !1
}

function el(e, t, n) {
    const r = Object.keys(t);
    if (r.length !== Object.keys(e).length) return !0;
    for (let s = 0; s < r.length; s++) {
        const i = r[s];
        if (t[i] !== e[i] && !tr(n, i)) return !0
    }
    return !1
}

function vc({vnode: e, parent: t}, n) {
    for (; t;) {
        const r = t.subTree;
        if (r.suspense && r.suspense.activeBranch === e && (r.el = e.el), r === e) (e = t.vnode).el = n, t = t.parent; else break
    }
}

const tl = e => e.__isSuspense;

function bc(e, t) {
    t && t.pendingBranch ? q(e) ? t.effects.push(...e) : t.effects.push(e) : ja(e)
}

const ue = Symbol.for("v-fgt"), nr = Symbol.for("v-txt"), Tt = Symbol.for("v-cmt"), ss = Symbol.for("v-stc"), vn = [];
let Ie = null;

function I(e = !1) {
    vn.push(Ie = e ? null : [])
}

function yc() {
    vn.pop(), Ie = vn[vn.length - 1] || null
}

let bn = 1;

function nl(e, t = !1) {
    bn += e, e < 0 && Ie && t && (Ie.hasOnce = !0)
}

function rl(e) {
    return e.dynamicChildren = bn > 0 ? Ie || Ft : null, yc(), bn > 0 && Ie && Ie.push(e), e
}

function P(e, t, n, r, s, i) {
    return rl(F(e, t, n, r, s, i, !0))
}

function lt(e, t, n, r, s) {
    return rl(oe(e, t, n, r, s, !0))
}

function rr(e) {
    return e ? e.__v_isVNode === !0 : !1
}

function yn(e, t) {
    return e.type === t.type && e.key === t.key
}

const sl = ({key: e}) => e ?? null, sr = ({
                                              ref: e,
                                              ref_key: t,
                                              ref_for: n
                                          }) => (typeof e == "number" && (e = "" + e), e != null ? be(e) || we(e) || se(e) ? {
    i: Ae,
    r: e,
    k: t,
    f: !!n
} : e : null);

function F(e, t = null, n = null, r = 0, s = null, i = e === ue ? 0 : 1, l = !1, o = !1) {
    const a = {
        __v_isVNode: !0,
        __v_skip: !0,
        type: e,
        props: t,
        key: t && sl(t),
        ref: t && sr(t),
        scopeId: ji,
        slotScopeIds: null,
        children: n,
        component: null,
        suspense: null,
        ssContent: null,
        ssFallback: null,
        dirs: null,
        transition: null,
        el: null,
        anchor: null,
        target: null,
        targetStart: null,
        targetAnchor: null,
        staticCount: 0,
        shapeFlag: i,
        patchFlag: r,
        dynamicProps: s,
        dynamicChildren: null,
        appContext: null,
        ctx: Ae
    };
    return o ? (is(a, n), i & 128 && e.normalize(a)) : n && (a.shapeFlag |= be(n) ? 8 : 16), bn > 0 && !l && Ie && (a.patchFlag > 0 || i & 6) && a.patchFlag !== 32 && Ie.push(a), a
}

const oe = wc;

function wc(e, t = null, n = null, r = 0, s = null, i = !1) {
    if ((!e || e === qa) && (e = Tt), rr(e)) {
        const o = Kt(e, t, !0);
        return n && is(o, n), bn > 0 && !i && Ie && (o.shapeFlag & 6 ? Ie[Ie.indexOf(e)] = o : Ie.push(o)), o.patchFlag = -2, o
    }
    if (Lc(e) && (e = e.__vccOpts), t) {
        t = kc(t);
        let {class: o, style: a} = t;
        o && !be(o) && (t.class = pe(o)), he(a) && (Kr(a) && !q(a) && (a = Me({}, a)), t.style = nn(a))
    }
    const l = be(e) ? 1 : tl(e) ? 128 : Da(e) ? 64 : he(e) ? 4 : se(e) ? 2 : 0;
    return F(e, t, n, r, s, l, i, !0)
}

function kc(e) {
    return e ? Kr(e) || Ui(e) ? Me({}, e) : e : null
}

function Kt(e, t, n = !1, r = !1) {
    const {props: s, ref: i, patchFlag: l, children: o, transition: a} = e, c = t ? xc(s || {}, t) : s, u = {
        __v_isVNode: !0,
        __v_skip: !0,
        type: e.type,
        props: c,
        key: c && sl(c),
        ref: t && t.ref ? n && i ? q(i) ? i.concat(sr(t)) : [i, sr(t)] : sr(t) : i,
        scopeId: e.scopeId,
        slotScopeIds: e.slotScopeIds,
        children: o,
        target: e.target,
        targetStart: e.targetStart,
        targetAnchor: e.targetAnchor,
        staticCount: e.staticCount,
        shapeFlag: e.shapeFlag,
        patchFlag: t && e.type !== ue ? l === -1 ? 16 : l | 16 : l,
        dynamicProps: e.dynamicProps,
        dynamicChildren: e.dynamicChildren,
        appContext: e.appContext,
        dirs: e.dirs,
        transition: a,
        component: e.component,
        suspense: e.suspense,
        ssContent: e.ssContent && Kt(e.ssContent),
        ssFallback: e.ssFallback && Kt(e.ssFallback),
        el: e.el,
        anchor: e.anchor,
        ctx: e.ctx,
        ce: e.ce
    };
    return a && r && Jr(u, a.clone(u)), u
}

function ot(e = " ", t = 0) {
    return oe(nr, null, e, t)
}

function Q(e = "", t = !1) {
    return t ? (I(), lt(Tt, null, e)) : oe(Tt, null, e)
}

function Je(e) {
    return e == null || typeof e == "boolean" ? oe(Tt) : q(e) ? oe(ue, null, e.slice()) : rr(e) ? pt(e) : oe(nr, null, String(e))
}

function pt(e) {
    return e.el === null && e.patchFlag !== -1 || e.memo ? e : Kt(e)
}

function is(e, t) {
    let n = 0;
    const {shapeFlag: r} = e;
    if (t == null) t = null; else if (q(t)) n = 16; else if (typeof t == "object") if (r & 65) {
        const s = t.default;
        s && (s._c && (s._d = !1), is(e, s()), s._c && (s._d = !0));
        return
    } else {
        n = 32;
        const s = t._;
        !s && !Ui(t) ? t._ctx = Ae : s === 3 && Ae && (Ae.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024))
    } else se(t) ? (t = {default: t, _ctx: Ae}, n = 32) : (t = String(t), r & 64 ? (n = 16, t = [ot(t)]) : n = 8);
    e.children = t, e.shapeFlag |= n
}

function xc(...e) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
        const r = e[n];
        for (const s in r) if (s === "class") t.class !== r.class && (t.class = pe([t.class, r.class])); else if (s === "style") t.style = nn([t.style, r.style]); else if (Dn(s)) {
            const i = t[s], l = r[s];
            l && i !== l && !(q(i) && i.includes(l)) && (t[s] = i ? [].concat(i, l) : l)
        } else s !== "" && (t[s] = r[s])
    }
    return t
}

function Ye(e, t, n, r = null) {
    st(e, t, 7, [n, r])
}

const _c = Fi();
let Cc = 0;

function Sc(e, t, n) {
    const r = e.type, s = (t ? t.appContext : e.appContext) || _c, i = {
        uid: Cc++,
        vnode: e,
        type: r,
        parent: t,
        appContext: s,
        root: null,
        next: null,
        subTree: null,
        effect: null,
        update: null,
        job: null,
        scope: new la(!0),
        render: null,
        proxy: null,
        exposed: null,
        exposeProxy: null,
        withProxy: null,
        provides: t ? t.provides : Object.create(s.provides),
        ids: t ? t.ids : ["", 0, 0],
        accessCache: null,
        renderCache: [],
        components: null,
        directives: null,
        propsOptions: ec(r, s),
        emitsOptions: dc(r, s),
        emit: null,
        emitted: null,
        propsDefaults: le,
        inheritAttrs: r.inheritAttrs,
        ctx: le,
        data: le,
        props: le,
        attrs: le,
        slots: le,
        refs: le,
        setupState: le,
        setupContext: null,
        suspense: n,
        suspenseId: n ? n.pendingId : 0,
        asyncDep: null,
        asyncResolved: !1,
        isMounted: !1,
        isUnmounted: !1,
        isDeactivated: !1,
        bc: null,
        c: null,
        bm: null,
        m: null,
        bu: null,
        u: null,
        um: null,
        bum: null,
        da: null,
        a: null,
        rtg: null,
        rtc: null,
        ec: null,
        sp: null
    };
    return i.ctx = {_: i}, i.root = t ? t.root : i, i.emit = hc.bind(null, i), e.ce && e.ce(i), i
}

let Se = null;
const il = () => Se || Ae;
let ir, ls;
{
    const e = tn(), t = (n, r) => {
        let s;
        return (s = e[n]) || (s = e[n] = []), s.push(r), i => {
            s.length > 1 ? s.forEach(l => l(i)) : s[0](i)
        }
    };
    ir = t("__VUE_INSTANCE_SETTERS__", n => Se = n), ls = t("__VUE_SSR_SETTERS__", n => wn = n)
}
const os = e => {
    const t = Se;
    return ir(e), e.scope.on(), () => {
        e.scope.off(), ir(t)
    }
}, ll = () => {
    Se && Se.scope.off(), ir(null)
};

function ol(e) {
    return e.vnode.shapeFlag & 4
}

let wn = !1;

function $c(e, t = !1, n = !1) {
    t && ls(t);
    const {props: r, children: s} = e.vnode, i = ol(e);
    Qa(e, r, i, t), nc(e, s, n);
    const l = i ? Rc(e, t) : void 0;
    return t && ls(!1), l
}

function Rc(e, t) {
    const n = e.type;
    e.accessCache = Object.create(null), e.proxy = new Proxy(e.ctx, Ga);
    const {setup: r} = n;
    if (r) {
        _t();
        const s = e.setupContext = r.length > 1 ? Ec(e) : null, i = os(e), l = fn(r, e, 0, [e.props, s]), o = ri(l);
        if (Ct(), i(), (o || e.sp) && !pn(e) && Ha(e), o) {
            if (l.then(ll, ll), t) return l.then(a => {
                al(e, a, t)
            }).catch(a => {
                Zn(a, e, 0)
            });
            e.asyncDep = l
        } else al(e, l, t)
    } else ul(e, t)
}

function al(e, t, n) {
    se(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : he(t) && (e.setupState = Ti(t)), ul(e, n)
}

let cl;

function ul(e, t, n) {
    const r = e.type;
    if (!e.render) {
        if (!t && cl && !r.render) {
            const s = r.template || !1;
            if (s) {
                const {isCustomElement: i, compilerOptions: l} = e.appContext.config, {
                    delimiters: o,
                    compilerOptions: a
                } = r, c = Me(Me({isCustomElement: i, delimiters: o}, l), a);
                r.render = cl(s, c)
            }
        }
        e.render = r.render || wt
    }
}

const Ac = {
    get(e, t) {
        return ke(e, "get", ""), e[t]
    }
};

function Ec(e) {
    const t = n => {
        e.exposed = n || {}
    };
    return {attrs: new Proxy(e.attrs, Ac), slots: e.slots, emit: e.emit, expose: t}
}

function lr(e) {
    return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(Ti(Ra(e.exposed)), {
        get(t, n) {
            if (n in t) return t[n];
            if (n in mn) return mn[n](e)
        }, has(t, n) {
            return n in t || n in mn
        }
    })) : e.proxy
}

function Tc(e, t = !0) {
    return se(e) ? e.displayName || e.name : e.name || t && e.__name
}

function Lc(e) {
    return se(e) && "__vccOpts" in e
}

const ge = (e, t) => La(e, t, wn);

function ne(e, t, n) {
    const r = arguments.length;
    return r === 2 ? he(t) && !q(t) ? rr(t) ? oe(e, null, [t]) : oe(e, t) : oe(e, null, t) : (r > 3 ? n = Array.prototype.slice.call(arguments, 2) : r === 3 && rr(n) && (n = [n]), oe(e, t, n))
}

const Ic = "3.5.13";
/**
 * @vue/runtime-dom v3.5.13
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/let as;
const fl = typeof window < "u" && window.trustedTypes;
if (fl) try {
    as = fl.createPolicy("vue", {createHTML: e => e})
} catch {
}
const hl = as ? e => as.createHTML(e) : e => e, Mc = "http://www.w3.org/2000/svg",
    Pc = "http://www.w3.org/1998/Math/MathML", at = typeof document < "u" ? document : null,
    dl = at && at.createElement("template"), Oc = {
        insert: (e, t, n) => {
            t.insertBefore(e, n || null)
        },
        remove: e => {
            const t = e.parentNode;
            t && t.removeChild(e)
        },
        createElement: (e, t, n, r) => {
            const s = t === "svg" ? at.createElementNS(Mc, e) : t === "mathml" ? at.createElementNS(Pc, e) : n ? at.createElement(e, {is: n}) : at.createElement(e);
            return e === "select" && r && r.multiple != null && s.setAttribute("multiple", r.multiple), s
        },
        createText: e => at.createTextNode(e),
        createComment: e => at.createComment(e),
        setText: (e, t) => {
            e.nodeValue = t
        },
        setElementText: (e, t) => {
            e.textContent = t
        },
        parentNode: e => e.parentNode,
        nextSibling: e => e.nextSibling,
        querySelector: e => at.querySelector(e),
        setScopeId(e, t) {
            e.setAttribute(t, "")
        },
        insertStaticContent(e, t, n, r, s, i) {
            const l = n ? n.previousSibling : t.lastChild;
            if (s && (s === i || s.nextSibling)) for (; t.insertBefore(s.cloneNode(!0), n), !(s === i || !(s = s.nextSibling));) ; else {
                dl.innerHTML = hl(r === "svg" ? `<svg>${e}</svg>` : r === "mathml" ? `<math>${e}</math>` : e);
                const o = dl.content;
                if (r === "svg" || r === "mathml") {
                    const a = o.firstChild;
                    for (; a.firstChild;) o.appendChild(a.firstChild);
                    o.removeChild(a)
                }
                t.insertBefore(o, n)
            }
            return [l ? l.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild]
        }
    }, jc = Symbol("_vtc");

function zc(e, t, n) {
    const r = e[jc];
    r && (t = (t ? [t, ...r] : [...r]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t
}

const or = Symbol("_vod"), pl = Symbol("_vsh"), gl = {
    beforeMount(e, {value: t}, {transition: n}) {
        e[or] = e.style.display === "none" ? "" : e.style.display, n && t ? n.beforeEnter(e) : kn(e, t)
    }, mounted(e, {value: t}, {transition: n}) {
        n && t && n.enter(e)
    }, updated(e, {value: t, oldValue: n}, {transition: r}) {
        !t != !n && (r ? t ? (r.beforeEnter(e), kn(e, !0), r.enter(e)) : r.leave(e, () => {
            kn(e, !1)
        }) : kn(e, t))
    }, beforeUnmount(e, {value: t}) {
        kn(e, t)
    }
};

function kn(e, t) {
    e.style.display = t ? e[or] : "none", e[pl] = !t
}

const Fc = Symbol(""), Dc = /(^|;)\s*display\s*:/;

function Hc(e, t, n) {
    const r = e.style, s = be(n);
    let i = !1;
    if (n && !s) {
        if (t) if (be(t)) for (const l of t.split(";")) {
            const o = l.slice(0, l.indexOf(":")).trim();
            n[o] == null && ar(r, o, "")
        } else for (const l in t) n[l] == null && ar(r, l, "");
        for (const l in n) l === "display" && (i = !0), ar(r, l, n[l])
    } else if (s) {
        if (t !== n) {
            const l = r[Fc];
            l && (n += ";" + l), r.cssText = n, i = Dc.test(n)
        }
    } else t && e.removeAttribute("style");
    or in e && (e[or] = i ? r.display : "", e[pl] && (r.display = "none"))
}

const ml = /\s*!important$/;

function ar(e, t, n) {
    if (q(n)) n.forEach(r => ar(e, t, r)); else if (n == null && (n = ""), t.startsWith("--")) e.setProperty(t, n); else {
        const r = Uc(e, t);
        ml.test(n) ? e.setProperty(kt(r), n.replace(ml, ""), "important") : e[r] = n
    }
}

const vl = ["Webkit", "Moz", "ms"], cs = {};

function Uc(e, t) {
    const n = cs[t];
    if (n) return n;
    let r = Pe(t);
    if (r !== "filter" && r in e) return cs[t] = r;
    r = Un(r);
    for (let s = 0; s < vl.length; s++) {
        const i = vl[s] + r;
        if (i in e) return cs[t] = i
    }
    return t
}

const bl = "http://www.w3.org/1999/xlink";

function yl(e, t, n, r, s, i = sa(t)) {
    r && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(bl, t.slice(6, t.length)) : e.setAttributeNS(bl, t, n) : n == null || i && !ai(n) ? e.removeAttribute(t) : e.setAttribute(t, i ? "" : Ge(n) ? String(n) : n)
}

function wl(e, t, n, r, s) {
    if (t === "innerHTML" || t === "textContent") {
        n != null && (e[t] = t === "innerHTML" ? hl(n) : n);
        return
    }
    const i = e.tagName;
    if (t === "value" && i !== "PROGRESS" && !i.includes("-")) {
        const o = i === "OPTION" ? e.getAttribute("value") || "" : e.value,
            a = n == null ? e.type === "checkbox" ? "on" : "" : String(n);
        (o !== a || !("_value" in e)) && (e.value = a), n == null && e.removeAttribute(t), e._value = n;
        return
    }
    let l = !1;
    if (n === "" || n == null) {
        const o = typeof e[t];
        o === "boolean" ? n = ai(n) : n == null && o === "string" ? (n = "", l = !0) : o === "number" && (n = 0, l = !0)
    }
    try {
        e[t] = n
    } catch {
    }
    l && e.removeAttribute(s || t)
}

function ct(e, t, n, r) {
    e.addEventListener(t, n, r)
}

function Nc(e, t, n, r) {
    e.removeEventListener(t, n, r)
}

const kl = Symbol("_vei");

function Bc(e, t, n, r, s = null) {
    const i = e[kl] || (e[kl] = {}), l = i[t];
    if (r && l) l.value = r; else {
        const [o, a] = Vc(t);
        if (r) {
            const c = i[t] = Kc(r, s);
            ct(e, o, c, a)
        } else l && (Nc(e, o, l, a), i[t] = void 0)
    }
}

const xl = /(?:Once|Passive|Capture)$/;

function Vc(e) {
    let t;
    if (xl.test(e)) {
        t = {};
        let r;
        for (; r = e.match(xl);) e = e.slice(0, e.length - r[0].length), t[r[0].toLowerCase()] = !0
    }
    return [e[2] === ":" ? e.slice(3) : kt(e.slice(2)), t]
}

let us = 0;
const Wc = Promise.resolve(), qc = () => us || (Wc.then(() => us = 0), us = Date.now());

function Kc(e, t) {
    const n = r => {
        if (!r._vts) r._vts = Date.now(); else if (r._vts <= n.attached) return;
        st(Gc(r, n.value), t, 5, [r])
    };
    return n.value = e, n.attached = qc(), n
}

function Gc(e, t) {
    if (q(t)) {
        const n = e.stopImmediatePropagation;
        return e.stopImmediatePropagation = () => {
            n.call(e), e._stopped = !0
        }, t.map(r => s => !s._stopped && r && r(s))
    } else return t
}

const _l = e => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123,
    Zc = (e, t, n, r, s, i) => {
        const l = s === "svg";
        t === "class" ? zc(e, r, l) : t === "style" ? Hc(e, n, r) : Dn(t) ? Er(t) || Bc(e, t, n, r, i) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : Jc(e, t, r, l)) ? (wl(e, t, r), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && yl(e, t, r, l, i, t !== "value")) : e._isVueCE && (/[A-Z]/.test(t) || !be(r)) ? wl(e, Pe(t), r, i, t) : (t === "true-value" ? e._trueValue = r : t === "false-value" && (e._falseValue = r), yl(e, t, r, l))
    };

function Jc(e, t, n, r) {
    if (r) return !!(t === "innerHTML" || t === "textContent" || t in e && _l(t) && se(n));
    if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA") return !1;
    if (t === "width" || t === "height") {
        const s = e.tagName;
        if (s === "IMG" || s === "VIDEO" || s === "CANVAS" || s === "SOURCE") return !1
    }
    return _l(t) && be(n) ? !1 : t in e
}

const gt = e => {
    const t = e.props["onUpdate:modelValue"] || !1;
    return q(t) ? n => Nn(t, n) : t
};

function Yc(e) {
    e.target.composing = !0
}

function Cl(e) {
    const t = e.target;
    t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")))
}

const ze = Symbol("_assign"), fs = {
    created(e, {modifiers: {lazy: t, trim: n, number: r}}, s) {
        e[ze] = gt(s);
        const i = r || s.props && s.props.type === "number";
        ct(e, t ? "change" : "input", l => {
            if (l.target.composing) return;
            let o = e.value;
            n && (o = o.trim()), i && (o = Bn(o)), e[ze](o)
        }), n && ct(e, "change", () => {
            e.value = e.value.trim()
        }), t || (ct(e, "compositionstart", Yc), ct(e, "compositionend", Cl), ct(e, "change", Cl))
    }, mounted(e, {value: t}) {
        e.value = t ?? ""
    }, beforeUpdate(e, {value: t, oldValue: n, modifiers: {lazy: r, trim: s, number: i}}, l) {
        if (e[ze] = gt(l), e.composing) return;
        const o = (i || e.type === "number") && !/^0\d/.test(e.value) ? Bn(e.value) : e.value, a = t ?? "";
        o !== a && (document.activeElement === e && e.type !== "range" && (r && t === n || s && e.value.trim() === a) || (e.value = a))
    }
}, Qc = {
    deep: !0, created(e, t, n) {
        e[ze] = gt(n), ct(e, "change", () => {
            const r = e._modelValue, s = Gt(e), i = e.checked, l = e[ze];
            if (q(r)) {
                const o = Ir(r, s), a = o !== -1;
                if (i && !a) l(r.concat(s)); else if (!i && a) {
                    const c = [...r];
                    c.splice(o, 1), l(c)
                }
            } else if (Ht(r)) {
                const o = new Set(r);
                i ? o.add(s) : o.delete(s), l(o)
            } else l(Rl(e, i))
        })
    }, mounted: Sl, beforeUpdate(e, t, n) {
        e[ze] = gt(n), Sl(e, t, n)
    }
};

function Sl(e, {value: t, oldValue: n}, r) {
    e._modelValue = t;
    let s;
    if (q(t)) s = Ir(t, r.props.value) > -1; else if (Ht(t)) s = t.has(r.props.value); else {
        if (t === n) return;
        s = xt(t, Rl(e, !0))
    }
    e.checked !== s && (e.checked = s)
}

const Xc = {
    created(e, {value: t}, n) {
        e.checked = xt(t, n.props.value), e[ze] = gt(n), ct(e, "change", () => {
            e[ze](Gt(e))
        })
    }, beforeUpdate(e, {value: t, oldValue: n}, r) {
        e[ze] = gt(r), t !== n && (e.checked = xt(t, r.props.value))
    }
}, eu = {
    deep: !0, created(e, {value: t, modifiers: {number: n}}, r) {
        const s = Ht(t);
        ct(e, "change", () => {
            const i = Array.prototype.filter.call(e.options, l => l.selected).map(l => n ? Bn(Gt(l)) : Gt(l));
            e[ze](e.multiple ? s ? new Set(i) : i : i[0]), e._assigning = !0, Wt(() => {
                e._assigning = !1
            })
        }), e[ze] = gt(r)
    }, mounted(e, {value: t}) {
        $l(e, t)
    }, beforeUpdate(e, t, n) {
        e[ze] = gt(n)
    }, updated(e, {value: t}) {
        e._assigning || $l(e, t)
    }
};

function $l(e, t) {
    const n = e.multiple, r = q(t);
    if (!(n && !r && !Ht(t))) {
        for (let s = 0, i = e.options.length; s < i; s++) {
            const l = e.options[s], o = Gt(l);
            if (n) if (r) {
                const a = typeof o;
                a === "string" || a === "number" ? l.selected = t.some(c => String(c) === String(o)) : l.selected = Ir(t, o) > -1
            } else l.selected = t.has(o); else if (xt(Gt(l), t)) {
                e.selectedIndex !== s && (e.selectedIndex = s);
                return
            }
        }
        !n && e.selectedIndex !== -1 && (e.selectedIndex = -1)
    }
}

function Gt(e) {
    return "_value" in e ? e._value : e.value
}

function Rl(e, t) {
    const n = t ? "_trueValue" : "_falseValue";
    return n in e ? e[n] : t
}

const tu = {
    created(e, t, n) {
        cr(e, t, n, null, "created")
    }, mounted(e, t, n) {
        cr(e, t, n, null, "mounted")
    }, beforeUpdate(e, t, n, r) {
        cr(e, t, n, r, "beforeUpdate")
    }, updated(e, t, n, r) {
        cr(e, t, n, r, "updated")
    }
};

function nu(e, t) {
    switch (e) {
        case"SELECT":
            return eu;
        case"TEXTAREA":
            return fs;
        default:
            switch (t) {
                case"checkbox":
                    return Qc;
                case"radio":
                    return Xc;
                default:
                    return fs
            }
    }
}

function cr(e, t, n, r, s) {
    const l = nu(e.tagName, n.props && n.props.type)[s];
    l && l(e, t, n, r)
}

const ru = Me({patchProp: Zc}, Oc);
let Al;

function su() {
    return Al || (Al = ic(ru))
}

const iu = (...e) => {
    const t = su().createApp(...e), {mount: n} = t;
    return t.mount = r => {
        const s = ou(r);
        if (!s) return;
        const i = t._component;
        !se(i) && !i.render && !i.template && (i.template = s.innerHTML), s.nodeType === 1 && (s.textContent = "");
        const l = n(s, !1, lu(s));
        return s instanceof Element && (s.removeAttribute("v-cloak"), s.setAttribute("data-v-app", "")), l
    }, t
};

function lu(e) {
    if (e instanceof SVGElement) return "svg";
    if (typeof MathMLElement == "function" && e instanceof MathMLElement) return "mathml"
}

function ou(e) {
    return be(e) ? document.querySelector(e) : e
}

function xn(e) {
    return fi() ? (oa(e), !0) : !1
}

const ur = typeof window < "u" && typeof document < "u", au = e => typeof e < "u", cu = Object.prototype.toString,
    uu = e => cu.call(e) === "[object Object]", fr = () => {
    };

function El(e, t) {
    function n(...r) {
        return new Promise((s, i) => {
            Promise.resolve(e(() => t.apply(this, r), {fn: t, thisArg: this, args: r})).then(s).catch(i)
        })
    }

    return n
}

const Tl = e => e();

function fu(e, t = {}) {
    let n, r, s = fr;
    const i = o => {
        clearTimeout(o), s(), s = fr
    };
    return o => {
        const a = He(e), c = He(t.maxWait);
        return n && i(n), a <= 0 || c !== void 0 && c <= 0 ? (r && (i(r), r = null), Promise.resolve(o())) : new Promise((u, f) => {
            s = t.rejectOnCancel ? f : u, c && !r && (r = setTimeout(() => {
                n && i(n), r = null, u(o())
            }, c)), n = setTimeout(() => {
                r && i(r), r = null, u(o())
            }, a)
        })
    }
}

function hu(e = Tl) {
    const t = Y(!0);

    function n() {
        t.value = !1
    }

    function r() {
        t.value = !0
    }

    const s = (...i) => {
        t.value && e(...i)
    };
    return {isActive: un(t), pause: n, resume: r, eventFilter: s}
}

function Ll(e) {
    return il()
}

function Il(e) {
    return Array.isArray(e) ? e : [e]
}

function du(e, t = 200, n = {}) {
    return El(fu(t, n), e)
}

function pu(e, t, n = {}) {
    const {eventFilter: r = Tl, ...s} = n;
    return it(e, El(r, t), s)
}

function gu(e, t, n = {}) {
    const {eventFilter: r, ...s} = n, {eventFilter: i, pause: l, resume: o, isActive: a} = hu(r);
    return {stop: pu(e, t, {...s, eventFilter: i}), pause: l, resume: o, isActive: a}
}

function hs(e, t = !0, n) {
    Ll() ? gn(e, n) : t ? e() : Wt(e)
}

function mu(e, t) {
    Ll() && Qr(e, t)
}

function vu(e, t = 1e3, n = {}) {
    const {immediate: r = !0, immediateCallback: s = !1} = n;
    let i = null;
    const l = Y(!1);

    function o() {
        i && (clearInterval(i), i = null)
    }

    function a() {
        l.value = !1, o()
    }

    function c() {
        const u = He(t);
        u <= 0 || (l.value = !0, s && e(), o(), l.value && (i = setInterval(e, u)))
    }

    if (r && ur && c(), we(t) || typeof t == "function") {
        const u = it(t, () => {
            l.value && ur && c()
        });
        xn(u)
    }
    return xn(a), {isActive: l, pause: a, resume: c}
}

function _n(e, t, n) {
    return it(e, t, {...n, immediate: !0})
}

const hr = ur ? window : void 0, Ml = ur ? window.document : void 0;

function bu(e) {
    var t;
    const n = He(e);
    return (t = n == null ? void 0 : n.$el) != null ? t : n
}

function dr(...e) {
    let t, n, r, s;
    if (typeof e[0] == "string" || Array.isArray(e[0]) ? ([n, r, s] = e, t = hr) : [t, n, r, s] = e, !t) return fr;
    n = Il(n), r = Il(r);
    const i = [], l = () => {
            i.forEach(u => u()), i.length = 0
        }, o = (u, f, p, g) => (u.addEventListener(f, p, g), () => u.removeEventListener(f, p, g)),
        a = it(() => [bu(t), He(s)], ([u, f]) => {
            if (l(), !u) return;
            const p = uu(f) ? {...f} : f;
            i.push(...n.flatMap(g => r.map(x => o(u, g, x, p))))
        }, {immediate: !0, flush: "post"}), c = () => {
            a(), l()
        };
    return xn(c), c
}

function yu(e, t = {}) {
    const {immediate: n = !0, fpsLimit: r = void 0, window: s = hr} = t, i = Y(!1),
        l = ge(() => r ? 1e3 / He(r) : null);
    let o = 0, a = null;

    function c(p) {
        if (!i.value || !s) return;
        o || (o = p);
        const g = p - o;
        if (l.value && g < l.value) {
            a = s.requestAnimationFrame(c);
            return
        }
        o = p, e({delta: g, timestamp: p}), a = s.requestAnimationFrame(c)
    }

    function u() {
        !i.value && s && (i.value = !0, o = 0, a = s.requestAnimationFrame(c))
    }

    function f() {
        i.value = !1, a != null && s && (s.cancelAnimationFrame(a), a = null)
    }

    return n && u(), xn(f), {isActive: un(i), pause: f, resume: u}
}

const pr = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {},
    gr = "__vueuse_ssr_handlers__", wu = ku();

function ku() {
    return gr in pr || (pr[gr] = pr[gr] || {}), pr[gr]
}

function xu(e, t) {
    return wu[e] || t
}

function _u(e) {
    return e == null ? "any" : e instanceof Set ? "set" : e instanceof Map ? "map" : e instanceof Date ? "date" : typeof e == "boolean" ? "boolean" : typeof e == "string" ? "string" : typeof e == "object" ? "object" : Number.isNaN(e) ? "any" : "number"
}

const Cu = {
    boolean: {read: e => e === "true", write: e => String(e)},
    object: {read: e => JSON.parse(e), write: e => JSON.stringify(e)},
    number: {read: e => Number.parseFloat(e), write: e => String(e)},
    any: {read: e => e, write: e => String(e)},
    string: {read: e => e, write: e => String(e)},
    map: {read: e => new Map(JSON.parse(e)), write: e => JSON.stringify(Array.from(e.entries()))},
    set: {read: e => new Set(JSON.parse(e)), write: e => JSON.stringify(Array.from(e))},
    date: {read: e => new Date(e), write: e => e.toISOString()}
}, Pl = "vueuse-storage";

function Zt(e, t, n, r = {}) {
    var s;
    const {
        flush: i = "pre",
        deep: l = !0,
        listenToStorageChanges: o = !0,
        writeDefaults: a = !0,
        mergeDefaults: c = !1,
        shallow: u,
        window: f = hr,
        eventFilter: p,
        onError: g = E => {
            console.error(E)
        },
        initOnMounted: x
    } = r, b = (u ? Ai : Y)(typeof t == "function" ? t() : t), T = ge(() => He(e));
    if (!n) try {
        n = xu("getDefaultStorage", () => {
            var E;
            return (E = hr) == null ? void 0 : E.localStorage
        })()
    } catch (E) {
        g(E)
    }
    if (!n) return b;
    const k = He(t), _ = _u(k), N = (s = r.serializer) != null ? s : Cu[_], {
        pause: L,
        resume: O
    } = gu(b, () => j(b.value), {flush: i, deep: l, eventFilter: p});
    it(T, () => me(), {flush: i}), f && o && hs(() => {
        n instanceof Storage ? dr(f, "storage", me, {passive: !0}) : dr(f, Pl, Be), x && me()
    }), x || me();

    function K(E, V) {
        if (f) {
            const D = {key: T.value, oldValue: E, newValue: V, storageArea: n};
            f.dispatchEvent(n instanceof Storage ? new StorageEvent("storage", D) : new CustomEvent(Pl, {detail: D}))
        }
    }

    function j(E) {
        try {
            const V = n.getItem(T.value);
            if (E == null) K(V, null), n.removeItem(T.value); else {
                const D = N.write(E);
                V !== D && (n.setItem(T.value, D), K(V, D))
            }
        } catch (V) {
            g(V)
        }
    }

    function J(E) {
        const V = E ? E.newValue : n.getItem(T.value);
        if (V == null) return a && k != null && n.setItem(T.value, N.write(k)), k;
        if (!E && c) {
            const D = N.read(V);
            return typeof c == "function" ? c(D, k) : _ === "object" && !Array.isArray(D) ? {...k, ...D} : D
        } else return typeof V != "string" ? V : N.read(V)
    }

    function me(E) {
        if (!(E && E.storageArea !== n)) {
            if (E && E.key == null) {
                b.value = k;
                return
            }
            if (!(E && E.key !== T.value)) {
                L();
                try {
                    (E == null ? void 0 : E.newValue) !== N.write(b.value) && (b.value = J(E))
                } catch (V) {
                    g(V)
                } finally {
                    E ? Wt(O) : O()
                }
            }
        }
    }

    function Be(E) {
        me(E.detail)
    }

    return b
}

function Su(e = {}) {
    const {controls: t = !1, interval: n = "requestAnimationFrame"} = e, r = Y(new Date), s = () => r.value = new Date,
        i = n === "requestAnimationFrame" ? yu(s, {immediate: !0}) : vu(s, n, {immediate: !0});
    return t ? {now: r, ...i} : r
}

function $u(e, t = fr, n = {}) {
    const {
        immediate: r = !0,
        manual: s = !1,
        type: i = "text/javascript",
        async: l = !0,
        crossOrigin: o,
        referrerPolicy: a,
        noModule: c,
        defer: u,
        document: f = Ml,
        attrs: p = {}
    } = n, g = Y(null);
    let x = null;
    const b = _ => new Promise((N, L) => {
        const O = J => (g.value = J, N(J), J);
        if (!f) {
            N(!1);
            return
        }
        let K = !1, j = f.querySelector(`script[src="${He(e)}"]`);
        j ? j.hasAttribute("data-loaded") && O(j) : (j = f.createElement("script"), j.type = i, j.async = l, j.src = He(e), u && (j.defer = u), o && (j.crossOrigin = o), c && (j.noModule = c), a && (j.referrerPolicy = a), Object.entries(p).forEach(([J, me]) => j == null ? void 0 : j.setAttribute(J, me)), K = !0), j.addEventListener("error", J => L(J)), j.addEventListener("abort", J => L(J)), j.addEventListener("load", () => {
            j.setAttribute("data-loaded", "true"), t(j), O(j)
        }), K && (j = f.head.appendChild(j)), _ || O(j)
    }), T = (_ = !0) => (x || (x = b(_)), x), k = () => {
        if (!f) return;
        x = null, g.value && (g.value = null);
        const _ = f.querySelector(`script[src="${He(e)}"]`);
        _ && f.head.removeChild(_)
    };
    return r && !s && hs(T), s || mu(k), {scriptTag: g, load: T, unload: k}
}

let Ru = 0;

function Au(e, t = {}) {
    const n = Y(!1), {document: r = Ml, immediate: s = !0, manual: i = !1, id: l = `vueuse_styletag_${++Ru}`} = t,
        o = Y(e);
    let a = () => {
    };
    const c = () => {
        if (!r) return;
        const f = r.getElementById(l) || r.createElement("style");
        f.isConnected || (f.id = l, t.media && (f.media = t.media), r.head.appendChild(f)), !n.value && (a = it(o, p => {
            f.textContent = p
        }, {immediate: !0}), n.value = !0)
    }, u = () => {
        !r || !n.value || (a(), r.head.removeChild(r.getElementById(l)), n.value = !1)
    };
    return s && !i && hs(c), i || xn(u), {id: l, css: o, unload: u, load: c, isLoaded: un(n)}
}

const Eu = "WALINE_EMOJI", Ol = Zt(Eu, {}), Tu = e => !!/@[0-9]+\.[0-9]+\.[0-9]+/.test(e), Lu = e => {
        const t = Tu(e);
        if (t) {
            const n = Ol.value[e];
            if (n) return Promise.resolve(n)
        }
        return fetch(`${e}/info.json`).then(n => n.json()).then(n => {
            const r = {folder: e, ...n};
            return t && (Ol.value[e] = r), r
        })
    }, jl = (e, t = "", n = "", r = "") => `${t ? `${t}/` : ""}${n}${e}${r ? `.${r}` : ""}`,
    Iu = e => Promise.all(e ? e.map(t => zt(t) ? Lu(Xs(t)) : Promise.resolve(t)) : []).then(t => {
        const n = {tabs: [], map: {}};
        return t.forEach(r => {
            const {name: s, folder: i, icon: l, prefix: o = "", type: a, items: c} = r;
            n.tabs.push({
                name: s, icon: jl(l, i, o, a), items: c.map(u => {
                    const f = `${o}${u}`;
                    return n.map[f] = jl(u, i, o, a), f
                })
            })
        }), n
    }), zl = e => {
        e.name !== "AbortError" && console.error(e.message)
    }, ds = e => e instanceof HTMLElement ? e : zt(e) ? document.querySelector(e) : null,
    Mu = e => e.type.includes("image"), Fl = e => {
        const t = Array.from(e).find(Mu);
        return t ? t.getAsFile() : null
    };

function ps() {
    return {
        async: !1,
        breaks: !1,
        extensions: null,
        gfm: !0,
        hooks: null,
        pedantic: !1,
        renderer: null,
        silent: !1,
        tokenizer: null,
        walkTokens: null
    }
}

let Lt = ps();

function Dl(e) {
    Lt = e
}

const Cn = {exec: () => null};

function ie(e, t = "") {
    let n = typeof e == "string" ? e : e.source;
    const r = {
        replace: (s, i) => {
            let l = typeof i == "string" ? i : i.source;
            return l = l.replace($e.caret, "$1"), n = n.replace(s, l), r
        }, getRegex: () => new RegExp(n, t)
    };
    return r
}

const $e = {
        codeRemoveIndent: /^(?: {1,4}| {0,3}\t)/gm,
        outputLinkReplace: /\\([\[\]])/g,
        indentCodeCompensation: /^(\s+)(?:```)/,
        beginningSpace: /^\s+/,
        endingHash: /#$/,
        startingSpaceChar: /^ /,
        endingSpaceChar: / $/,
        nonSpaceChar: /[^ ]/,
        newLineCharGlobal: /\n/g,
        tabCharGlobal: /\t/g,
        multipleSpaceGlobal: /\s+/g,
        blankLine: /^[ \t]*$/,
        doubleBlankLine: /\n[ \t]*\n[ \t]*$/,
        blockquoteStart: /^ {0,3}>/,
        blockquoteSetextReplace: /\n {0,3}((?:=+|-+) *)(?=\n|$)/g,
        blockquoteSetextReplace2: /^ {0,3}>[ \t]?/gm,
        listReplaceTabs: /^\t+/,
        listReplaceNesting: /^ {1,4}(?=( {4})*[^ ])/g,
        listIsTask: /^\[[ xX]\] /,
        listReplaceTask: /^\[[ xX]\] +/,
        anyLine: /\n.*\n/,
        hrefBrackets: /^<(.*)>$/,
        tableDelimiter: /[:|]/,
        tableAlignChars: /^\||\| *$/g,
        tableRowBlankLine: /\n[ \t]*$/,
        tableAlignRight: /^ *-+: *$/,
        tableAlignCenter: /^ *:-+: *$/,
        tableAlignLeft: /^ *:-+ *$/,
        startATag: /^<a /i,
        endATag: /^<\/a>/i,
        startPreScriptTag: /^<(pre|code|kbd|script)(\s|>)/i,
        endPreScriptTag: /^<\/(pre|code|kbd|script)(\s|>)/i,
        startAngleBracket: /^</,
        endAngleBracket: />$/,
        pedanticHrefTitle: /^([^'"]*[^\s])\s+(['"])(.*)\2/,
        unicodeAlphaNumeric: /[\p{L}\p{N}]/u,
        escapeTest: /[&<>"']/,
        escapeReplace: /[&<>"']/g,
        escapeTestNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,
        escapeReplaceNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,
        unescapeTest: /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,
        caret: /(^|[^\[])\^/g,
        percentDecode: /%25/g,
        findPipe: /\|/g,
        splitPipe: / \|/,
        slashPipe: /\\\|/g,
        carriageReturn: /\r\n|\r/g,
        spaceLine: /^ +$/gm,
        notSpaceStart: /^\S*/,
        endingNewline: /\n$/,
        listItemRegex: e => new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),
        nextBulletRegex: e => new RegExp(`^ {0,${Math.min(3, e - 1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),
        hrRegex: e => new RegExp(`^ {0,${Math.min(3, e - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),
        fencesBeginRegex: e => new RegExp(`^ {0,${Math.min(3, e - 1)}}(?:\`\`\`|~~~)`),
        headingBeginRegex: e => new RegExp(`^ {0,${Math.min(3, e - 1)}}#`),
        htmlBeginRegex: e => new RegExp(`^ {0,${Math.min(3, e - 1)}}<(?:[a-z].*>|!--)`, "i")
    }, Pu = /^(?:[ \t]*(?:\n|$))+/, Ou = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,
    ju = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,
    Sn = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,
    zu = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/, Hl = /(?:[*+-]|\d{1,9}[.)])/,
    Ul = ie(/^(?!bull |blockCode|fences|blockquote|heading|html)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html))+?)\n {0,3}(=+|-+) *(?:\n+|$)/).replace(/bull/g, Hl).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).getRegex(),
    gs = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/, Fu = /^[^\n]+/,
    ms = /(?!\s*\])(?:\\.|[^\[\]\\])+/,
    Du = ie(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label", ms).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),
    Hu = ie(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g, Hl).getRegex(),
    mr = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",
    vs = /<!--(?:-?>|[\s\S]*?(?:-->|$))/,
    Uu = ie("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))", "i").replace("comment", vs).replace("tag", mr).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),
    Nl = ie(gs).replace("hr", Sn).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", mr).getRegex(),
    Nu = ie(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", Nl).getRegex(), bs = {
        blockquote: Nu,
        code: Ou,
        def: Du,
        fences: ju,
        heading: zu,
        hr: Sn,
        html: Uu,
        lheading: Ul,
        list: Hu,
        newline: Pu,
        paragraph: Nl,
        table: Cn,
        text: Fu
    },
    Bl = ie("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr", Sn).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", "(?: {4}| {0,3}	)[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", mr).getRegex(),
    Bu = {
        ...bs,
        table: Bl,
        paragraph: ie(gs).replace("hr", Sn).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", Bl).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", mr).getRegex()
    }, Vu = {
        ...bs,
        html: ie(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment", vs).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
        def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
        heading: /^(#{1,6})(.*)(?:\n+|$)/,
        fences: Cn,
        lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
        paragraph: ie(gs).replace("hr", Sn).replace("heading", ` *#{1,6} *[^
]`).replace("lheading", Ul).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex()
    }, Wu = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/, qu = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,
    Vl = /^( {2,}|\\)\n(?!\s*$)/, Ku = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,
    vr = /[\p{P}\p{S}]/u, ys = /[\s\p{P}\p{S}]/u, Wl = /[^\s\p{P}\p{S}]/u,
    Gu = ie(/^((?![*_])punctSpace)/, "u").replace(/punctSpace/g, ys).getRegex(), ql = /(?!~)[\p{P}\p{S}]/u,
    Zu = /(?!~)[\s\p{P}\p{S}]/u, Ju = /(?:[^\s\p{P}\p{S}]|~)/u,
    Yu = /\[[^[\]]*?\]\((?:\\.|[^\\\(\)]|\((?:\\.|[^\\\(\)])*\))*\)|`[^`]*?`|<[^<>]*?>/g,
    Kl = /^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,
    Qu = ie(Kl, "u").replace(/punct/g, vr).getRegex(), Xu = ie(Kl, "u").replace(/punct/g, ql).getRegex(),
    Gl = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",
    ef = ie(Gl, "gu").replace(/notPunctSpace/g, Wl).replace(/punctSpace/g, ys).replace(/punct/g, vr).getRegex(),
    tf = ie(Gl, "gu").replace(/notPunctSpace/g, Ju).replace(/punctSpace/g, Zu).replace(/punct/g, ql).getRegex(),
    nf = ie("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)", "gu").replace(/notPunctSpace/g, Wl).replace(/punctSpace/g, ys).replace(/punct/g, vr).getRegex(),
    rf = ie(/\\(punct)/, "gu").replace(/punct/g, vr).getRegex(),
    sf = ie(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),
    lf = ie(vs).replace("(?:-->|$)", "-->").getRegex(),
    of = ie("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment", lf).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),
    br = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,
    af = ie(/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/).replace("label", br).replace("href", /<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),
    Zl = ie(/^!?\[(label)\]\[(ref)\]/).replace("label", br).replace("ref", ms).getRegex(),
    Jl = ie(/^!?\[(ref)\](?:\[\])?/).replace("ref", ms).getRegex(),
    cf = ie("reflink|nolink(?!\\()", "g").replace("reflink", Zl).replace("nolink", Jl).getRegex(), ws = {
        _backpedal: Cn,
        anyPunctuation: rf,
        autolink: sf,
        blockSkip: Yu,
        br: Vl,
        code: qu,
        del: Cn,
        emStrongLDelim: Qu,
        emStrongRDelimAst: ef,
        emStrongRDelimUnd: nf,
        escape: Wu,
        link: af,
        nolink: Jl,
        punctuation: Gu,
        reflink: Zl,
        reflinkSearch: cf,
        tag: of,
        text: Ku,
        url: Cn
    }, uf = {
        ...ws,
        link: ie(/^!?\[(label)\]\((.*?)\)/).replace("label", br).getRegex(),
        reflink: ie(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", br).getRegex()
    }, ks = {
        ...ws,
        emStrongRDelimAst: tf,
        emStrongLDelim: Xu,
        url: ie(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/, "i").replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),
        _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
        del: /^(~~?)(?=[^\s~])((?:\\.|[^\\])*?(?:\\.|[^\s~\\]))\1(?=[^~]|$)/,
        text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/
    }, ff = {
        ...ks,
        br: ie(Vl).replace("{2,}", "*").getRegex(),
        text: ie(ks.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex()
    }, yr = {normal: bs, gfm: Bu, pedantic: Vu}, $n = {normal: ws, gfm: ks, breaks: ff, pedantic: uf},
    hf = {"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"}, Yl = e => hf[e];

function Qe(e, t) {
    if (t) {
        if ($e.escapeTest.test(e)) return e.replace($e.escapeReplace, Yl)
    } else if ($e.escapeTestNoEncode.test(e)) return e.replace($e.escapeReplaceNoEncode, Yl);
    return e
}

function Ql(e) {
    try {
        e = encodeURI(e).replace($e.percentDecode, "%")
    } catch {
        return null
    }
    return e
}

function Xl(e, t) {
    var i;
    const n = e.replace($e.findPipe, (l, o, a) => {
        let c = !1, u = o;
        for (; --u >= 0 && a[u] === "\\";) c = !c;
        return c ? "|" : " |"
    }), r = n.split($e.splitPipe);
    let s = 0;
    if (r[0].trim() || r.shift(), r.length > 0 && !((i = r.at(-1)) != null && i.trim()) && r.pop(), t) if (r.length > t) r.splice(t); else for (; r.length < t;) r.push("");
    for (; s < r.length; s++) r[s] = r[s].trim().replace($e.slashPipe, "|");
    return r
}

function Rn(e, t, n) {
    const r = e.length;
    if (r === 0) return "";
    let s = 0;
    for (; s < r && e.charAt(r - s - 1) === t;) s++;
    return e.slice(0, r - s)
}

function df(e, t) {
    if (e.indexOf(t[1]) === -1) return -1;
    let n = 0;
    for (let r = 0; r < e.length; r++) if (e[r] === "\\") r++; else if (e[r] === t[0]) n++; else if (e[r] === t[1] && (n--, n < 0)) return r;
    return -1
}

function eo(e, t, n, r, s) {
    const i = t.href, l = t.title || null, o = e[1].replace(s.other.outputLinkReplace, "$1");
    if (e[0].charAt(0) !== "!") {
        r.state.inLink = !0;
        const a = {type: "link", raw: n, href: i, title: l, text: o, tokens: r.inlineTokens(o)};
        return r.state.inLink = !1, a
    }
    return {type: "image", raw: n, href: i, title: l, text: o}
}

function pf(e, t, n) {
    const r = e.match(n.other.indentCodeCompensation);
    if (r === null) return t;
    const s = r[1];
    return t.split(`
`).map(i => {
        const l = i.match(n.other.beginningSpace);
        if (l === null) return i;
        const [o] = l;
        return o.length >= s.length ? i.slice(s.length) : i
    }).join(`
`)
}

class wr {
    options;
    rules;
    lexer;

    constructor(t) {
        this.options = t || Lt
    }

    space(t) {
        const n = this.rules.block.newline.exec(t);
        if (n && n[0].length > 0) return {type: "space", raw: n[0]}
    }

    code(t) {
        const n = this.rules.block.code.exec(t);
        if (n) {
            const r = n[0].replace(this.rules.other.codeRemoveIndent, "");
            return {
                type: "code", raw: n[0], codeBlockStyle: "indented", text: this.options.pedantic ? r : Rn(r, `
`)
            }
        }
    }

    fences(t) {
        const n = this.rules.block.fences.exec(t);
        if (n) {
            const r = n[0], s = pf(r, n[3] || "", this.rules);
            return {
                type: "code",
                raw: r,
                lang: n[2] ? n[2].trim().replace(this.rules.inline.anyPunctuation, "$1") : n[2],
                text: s
            }
        }
    }

    heading(t) {
        const n = this.rules.block.heading.exec(t);
        if (n) {
            let r = n[2].trim();
            if (this.rules.other.endingHash.test(r)) {
                const s = Rn(r, "#");
                (this.options.pedantic || !s || this.rules.other.endingSpaceChar.test(s)) && (r = s.trim())
            }
            return {type: "heading", raw: n[0], depth: n[1].length, text: r, tokens: this.lexer.inline(r)}
        }
    }

    hr(t) {
        const n = this.rules.block.hr.exec(t);
        if (n) return {
            type: "hr", raw: Rn(n[0], `
`)
        }
    }

    blockquote(t) {
        const n = this.rules.block.blockquote.exec(t);
        if (n) {
            let r = Rn(n[0], `
`).split(`
`), s = "", i = "";
            const l = [];
            for (; r.length > 0;) {
                let o = !1;
                const a = [];
                let c;
                for (c = 0; c < r.length; c++) if (this.rules.other.blockquoteStart.test(r[c])) a.push(r[c]), o = !0; else if (!o) a.push(r[c]); else break;
                r = r.slice(c);
                const u = a.join(`
`), f = u.replace(this.rules.other.blockquoteSetextReplace, `
    $1`).replace(this.rules.other.blockquoteSetextReplace2, "");
                s = s ? `${s}
${u}` : u, i = i ? `${i}
${f}` : f;
                const p = this.lexer.state.top;
                if (this.lexer.state.top = !0, this.lexer.blockTokens(f, l, !0), this.lexer.state.top = p, r.length === 0) break;
                const g = l.at(-1);
                if ((g == null ? void 0 : g.type) === "code") break;
                if ((g == null ? void 0 : g.type) === "blockquote") {
                    const x = g, b = x.raw + `
` + r.join(`
`), T = this.blockquote(b);
                    l[l.length - 1] = T, s = s.substring(0, s.length - x.raw.length) + T.raw, i = i.substring(0, i.length - x.text.length) + T.text;
                    break
                } else if ((g == null ? void 0 : g.type) === "list") {
                    const x = g, b = x.raw + `
` + r.join(`
`), T = this.list(b);
                    l[l.length - 1] = T, s = s.substring(0, s.length - g.raw.length) + T.raw, i = i.substring(0, i.length - x.raw.length) + T.raw, r = b.substring(l.at(-1).raw.length).split(`
`);
                    continue
                }
            }
            return {type: "blockquote", raw: s, tokens: l, text: i}
        }
    }

    list(t) {
        let n = this.rules.block.list.exec(t);
        if (n) {
            let r = n[1].trim();
            const s = r.length > 1,
                i = {type: "list", raw: "", ordered: s, start: s ? +r.slice(0, -1) : "", loose: !1, items: []};
            r = s ? `\\d{1,9}\\${r.slice(-1)}` : `\\${r}`, this.options.pedantic && (r = s ? r : "[*+-]");
            const l = this.rules.other.listItemRegex(r);
            let o = !1;
            for (; t;) {
                let c = !1, u = "", f = "";
                if (!(n = l.exec(t)) || this.rules.block.hr.test(t)) break;
                u = n[0], t = t.substring(u.length);
                let p = n[2].split(`
`, 1)[0].replace(this.rules.other.listReplaceTabs, _ => " ".repeat(3 * _.length)), g = t.split(`
`, 1)[0], x = !p.trim(), b = 0;
                if (this.options.pedantic ? (b = 2, f = p.trimStart()) : x ? b = n[1].length + 1 : (b = n[2].search(this.rules.other.nonSpaceChar), b = b > 4 ? 1 : b, f = p.slice(b), b += n[1].length), x && this.rules.other.blankLine.test(g) && (u += g + `
`, t = t.substring(g.length + 1), c = !0), !c) {
                    const _ = this.rules.other.nextBulletRegex(b), N = this.rules.other.hrRegex(b),
                        L = this.rules.other.fencesBeginRegex(b), O = this.rules.other.headingBeginRegex(b),
                        K = this.rules.other.htmlBeginRegex(b);
                    for (; t;) {
                        const j = t.split(`
`, 1)[0];
                        let J;
                        if (g = j, this.options.pedantic ? (g = g.replace(this.rules.other.listReplaceNesting, "  "), J = g) : J = g.replace(this.rules.other.tabCharGlobal, "    "), L.test(g) || O.test(g) || K.test(g) || _.test(g) || N.test(g)) break;
                        if (J.search(this.rules.other.nonSpaceChar) >= b || !g.trim()) f += `
` + J.slice(b); else {
                            if (x || p.replace(this.rules.other.tabCharGlobal, "    ").search(this.rules.other.nonSpaceChar) >= 4 || L.test(p) || O.test(p) || N.test(p)) break;
                            f += `
` + g
                        }
                        !x && !g.trim() && (x = !0), u += j + `
`, t = t.substring(j.length + 1), p = J.slice(b)
                    }
                }
                i.loose || (o ? i.loose = !0 : this.rules.other.doubleBlankLine.test(u) && (o = !0));
                let T = null, k;
                this.options.gfm && (T = this.rules.other.listIsTask.exec(f), T && (k = T[0] !== "[ ] ", f = f.replace(this.rules.other.listReplaceTask, ""))), i.items.push({
                    type: "list_item",
                    raw: u,
                    task: !!T,
                    checked: k,
                    loose: !1,
                    text: f,
                    tokens: []
                }), i.raw += u
            }
            const a = i.items.at(-1);
            if (a) a.raw = a.raw.trimEnd(), a.text = a.text.trimEnd(); else return;
            i.raw = i.raw.trimEnd();
            for (let c = 0; c < i.items.length; c++) if (this.lexer.state.top = !1, i.items[c].tokens = this.lexer.blockTokens(i.items[c].text, []), !i.loose) {
                const u = i.items[c].tokens.filter(p => p.type === "space"),
                    f = u.length > 0 && u.some(p => this.rules.other.anyLine.test(p.raw));
                i.loose = f
            }
            if (i.loose) for (let c = 0; c < i.items.length; c++) i.items[c].loose = !0;
            return i
        }
    }

    html(t) {
        const n = this.rules.block.html.exec(t);
        if (n) return {
            type: "html",
            block: !0,
            raw: n[0],
            pre: n[1] === "pre" || n[1] === "script" || n[1] === "style",
            text: n[0]
        }
    }

    def(t) {
        const n = this.rules.block.def.exec(t);
        if (n) {
            const r = n[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal, " "),
                s = n[2] ? n[2].replace(this.rules.other.hrefBrackets, "$1").replace(this.rules.inline.anyPunctuation, "$1") : "",
                i = n[3] ? n[3].substring(1, n[3].length - 1).replace(this.rules.inline.anyPunctuation, "$1") : n[3];
            return {type: "def", tag: r, raw: n[0], href: s, title: i}
        }
    }

    table(t) {
        var o;
        const n = this.rules.block.table.exec(t);
        if (!n || !this.rules.other.tableDelimiter.test(n[2])) return;
        const r = Xl(n[1]), s = n[2].replace(this.rules.other.tableAlignChars, "").split("|"),
            i = (o = n[3]) != null && o.trim() ? n[3].replace(this.rules.other.tableRowBlankLine, "").split(`
`) : [], l = {type: "table", raw: n[0], header: [], align: [], rows: []};
        if (r.length === s.length) {
            for (const a of s) this.rules.other.tableAlignRight.test(a) ? l.align.push("right") : this.rules.other.tableAlignCenter.test(a) ? l.align.push("center") : this.rules.other.tableAlignLeft.test(a) ? l.align.push("left") : l.align.push(null);
            for (let a = 0; a < r.length; a++) l.header.push({
                text: r[a],
                tokens: this.lexer.inline(r[a]),
                header: !0,
                align: l.align[a]
            });
            for (const a of i) l.rows.push(Xl(a, l.header.length).map((c, u) => ({
                text: c,
                tokens: this.lexer.inline(c),
                header: !1,
                align: l.align[u]
            })));
            return l
        }
    }

    lheading(t) {
        const n = this.rules.block.lheading.exec(t);
        if (n) return {
            type: "heading",
            raw: n[0],
            depth: n[2].charAt(0) === "=" ? 1 : 2,
            text: n[1],
            tokens: this.lexer.inline(n[1])
        }
    }

    paragraph(t) {
        const n = this.rules.block.paragraph.exec(t);
        if (n) {
            const r = n[1].charAt(n[1].length - 1) === `
` ? n[1].slice(0, -1) : n[1];
            return {type: "paragraph", raw: n[0], text: r, tokens: this.lexer.inline(r)}
        }
    }

    text(t) {
        const n = this.rules.block.text.exec(t);
        if (n) return {type: "text", raw: n[0], text: n[0], tokens: this.lexer.inline(n[0])}
    }

    escape(t) {
        const n = this.rules.inline.escape.exec(t);
        if (n) return {type: "escape", raw: n[0], text: n[1]}
    }

    tag(t) {
        const n = this.rules.inline.tag.exec(t);
        if (n) return !this.lexer.state.inLink && this.rules.other.startATag.test(n[0]) ? this.lexer.state.inLink = !0 : this.lexer.state.inLink && this.rules.other.endATag.test(n[0]) && (this.lexer.state.inLink = !1), !this.lexer.state.inRawBlock && this.rules.other.startPreScriptTag.test(n[0]) ? this.lexer.state.inRawBlock = !0 : this.lexer.state.inRawBlock && this.rules.other.endPreScriptTag.test(n[0]) && (this.lexer.state.inRawBlock = !1), {
            type: "html",
            raw: n[0],
            inLink: this.lexer.state.inLink,
            inRawBlock: this.lexer.state.inRawBlock,
            block: !1,
            text: n[0]
        }
    }

    link(t) {
        const n = this.rules.inline.link.exec(t);
        if (n) {
            const r = n[2].trim();
            if (!this.options.pedantic && this.rules.other.startAngleBracket.test(r)) {
                if (!this.rules.other.endAngleBracket.test(r)) return;
                const l = Rn(r.slice(0, -1), "\\");
                if ((r.length - l.length) % 2 === 0) return
            } else {
                const l = df(n[2], "()");
                if (l > -1) {
                    const a = (n[0].indexOf("!") === 0 ? 5 : 4) + n[1].length + l;
                    n[2] = n[2].substring(0, l), n[0] = n[0].substring(0, a).trim(), n[3] = ""
                }
            }
            let s = n[2], i = "";
            if (this.options.pedantic) {
                const l = this.rules.other.pedanticHrefTitle.exec(s);
                l && (s = l[1], i = l[3])
            } else i = n[3] ? n[3].slice(1, -1) : "";
            return s = s.trim(), this.rules.other.startAngleBracket.test(s) && (this.options.pedantic && !this.rules.other.endAngleBracket.test(r) ? s = s.slice(1) : s = s.slice(1, -1)), eo(n, {
                href: s && s.replace(this.rules.inline.anyPunctuation, "$1"),
                title: i && i.replace(this.rules.inline.anyPunctuation, "$1")
            }, n[0], this.lexer, this.rules)
        }
    }

    reflink(t, n) {
        let r;
        if ((r = this.rules.inline.reflink.exec(t)) || (r = this.rules.inline.nolink.exec(t))) {
            const s = (r[2] || r[1]).replace(this.rules.other.multipleSpaceGlobal, " "), i = n[s.toLowerCase()];
            if (!i) {
                const l = r[0].charAt(0);
                return {type: "text", raw: l, text: l}
            }
            return eo(r, i, r[0], this.lexer, this.rules)
        }
    }

    emStrong(t, n, r = "") {
        let s = this.rules.inline.emStrongLDelim.exec(t);
        if (!s || s[3] && r.match(this.rules.other.unicodeAlphaNumeric)) return;
        if (!(s[1] || s[2] || "") || !r || this.rules.inline.punctuation.exec(r)) {
            const l = [...s[0]].length - 1;
            let o, a, c = l, u = 0;
            const f = s[0][0] === "*" ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
            for (f.lastIndex = 0, n = n.slice(-1 * t.length + l); (s = f.exec(n)) != null;) {
                if (o = s[1] || s[2] || s[3] || s[4] || s[5] || s[6], !o) continue;
                if (a = [...o].length, s[3] || s[4]) {
                    c += a;
                    continue
                } else if ((s[5] || s[6]) && l % 3 && !((l + a) % 3)) {
                    u += a;
                    continue
                }
                if (c -= a, c > 0) continue;
                a = Math.min(a, a + c + u);
                const p = [...s[0]][0].length, g = t.slice(0, l + s.index + p + a);
                if (Math.min(l, a) % 2) {
                    const b = g.slice(1, -1);
                    return {type: "em", raw: g, text: b, tokens: this.lexer.inlineTokens(b)}
                }
                const x = g.slice(2, -2);
                return {type: "strong", raw: g, text: x, tokens: this.lexer.inlineTokens(x)}
            }
        }
    }

    codespan(t) {
        const n = this.rules.inline.code.exec(t);
        if (n) {
            let r = n[2].replace(this.rules.other.newLineCharGlobal, " ");
            const s = this.rules.other.nonSpaceChar.test(r),
                i = this.rules.other.startingSpaceChar.test(r) && this.rules.other.endingSpaceChar.test(r);
            return s && i && (r = r.substring(1, r.length - 1)), {type: "codespan", raw: n[0], text: r}
        }
    }

    br(t) {
        const n = this.rules.inline.br.exec(t);
        if (n) return {type: "br", raw: n[0]}
    }

    del(t) {
        const n = this.rules.inline.del.exec(t);
        if (n) return {type: "del", raw: n[0], text: n[2], tokens: this.lexer.inlineTokens(n[2])}
    }

    autolink(t) {
        const n = this.rules.inline.autolink.exec(t);
        if (n) {
            let r, s;
            return n[2] === "@" ? (r = n[1], s = "mailto:" + r) : (r = n[1], s = r), {
                type: "link",
                raw: n[0],
                text: r,
                href: s,
                tokens: [{type: "text", raw: r, text: r}]
            }
        }
    }

    url(t) {
        var r;
        let n;
        if (n = this.rules.inline.url.exec(t)) {
            let s, i;
            if (n[2] === "@") s = n[0], i = "mailto:" + s; else {
                let l;
                do l = n[0], n[0] = ((r = this.rules.inline._backpedal.exec(n[0])) == null ? void 0 : r[0]) ?? ""; while (l !== n[0]);
                s = n[0], n[1] === "www." ? i = "http://" + n[0] : i = n[0]
            }
            return {type: "link", raw: n[0], text: s, href: i, tokens: [{type: "text", raw: s, text: s}]}
        }
    }

    inlineText(t) {
        const n = this.rules.inline.text.exec(t);
        if (n) {
            const r = this.lexer.state.inRawBlock;
            return {type: "text", raw: n[0], text: n[0], escaped: r}
        }
    }
}

class Ue {
    tokens;
    options;
    state;
    tokenizer;
    inlineQueue;

    constructor(t) {
        this.tokens = [], this.tokens.links = Object.create(null), this.options = t || Lt, this.options.tokenizer = this.options.tokenizer || new wr, this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = {
            inLink: !1,
            inRawBlock: !1,
            top: !0
        };
        const n = {other: $e, block: yr.normal, inline: $n.normal};
        this.options.pedantic ? (n.block = yr.pedantic, n.inline = $n.pedantic) : this.options.gfm && (n.block = yr.gfm, this.options.breaks ? n.inline = $n.breaks : n.inline = $n.gfm), this.tokenizer.rules = n
    }

    static get rules() {
        return {block: yr, inline: $n}
    }

    static lex(t, n) {
        return new Ue(n).lex(t)
    }

    static lexInline(t, n) {
        return new Ue(n).inlineTokens(t)
    }

    lex(t) {
        t = t.replace($e.carriageReturn, `
`), this.blockTokens(t, this.tokens);
        for (let n = 0; n < this.inlineQueue.length; n++) {
            const r = this.inlineQueue[n];
            this.inlineTokens(r.src, r.tokens)
        }
        return this.inlineQueue = [], this.tokens
    }

    blockTokens(t, n = [], r = !1) {
        var s, i, l;
        for (this.options.pedantic && (t = t.replace($e.tabCharGlobal, "    ").replace($e.spaceLine, "")); t;) {
            let o;
            if ((i = (s = this.options.extensions) == null ? void 0 : s.block) != null && i.some(c => (o = c.call({lexer: this}, t, n)) ? (t = t.substring(o.raw.length), n.push(o), !0) : !1)) continue;
            if (o = this.tokenizer.space(t)) {
                t = t.substring(o.raw.length);
                const c = n.at(-1);
                o.raw.length === 1 && c !== void 0 ? c.raw += `
` : n.push(o);
                continue
            }
            if (o = this.tokenizer.code(t)) {
                t = t.substring(o.raw.length);
                const c = n.at(-1);
                (c == null ? void 0 : c.type) === "paragraph" || (c == null ? void 0 : c.type) === "text" ? (c.raw += `
` + o.raw, c.text += `
` + o.text, this.inlineQueue.at(-1).src = c.text) : n.push(o);
                continue
            }
            if (o = this.tokenizer.fences(t)) {
                t = t.substring(o.raw.length), n.push(o);
                continue
            }
            if (o = this.tokenizer.heading(t)) {
                t = t.substring(o.raw.length), n.push(o);
                continue
            }
            if (o = this.tokenizer.hr(t)) {
                t = t.substring(o.raw.length), n.push(o);
                continue
            }
            if (o = this.tokenizer.blockquote(t)) {
                t = t.substring(o.raw.length), n.push(o);
                continue
            }
            if (o = this.tokenizer.list(t)) {
                t = t.substring(o.raw.length), n.push(o);
                continue
            }
            if (o = this.tokenizer.html(t)) {
                t = t.substring(o.raw.length), n.push(o);
                continue
            }
            if (o = this.tokenizer.def(t)) {
                t = t.substring(o.raw.length);
                const c = n.at(-1);
                (c == null ? void 0 : c.type) === "paragraph" || (c == null ? void 0 : c.type) === "text" ? (c.raw += `
` + o.raw, c.text += `
` + o.raw, this.inlineQueue.at(-1).src = c.text) : this.tokens.links[o.tag] || (this.tokens.links[o.tag] = {
                    href: o.href,
                    title: o.title
                });
                continue
            }
            if (o = this.tokenizer.table(t)) {
                t = t.substring(o.raw.length), n.push(o);
                continue
            }
            if (o = this.tokenizer.lheading(t)) {
                t = t.substring(o.raw.length), n.push(o);
                continue
            }
            let a = t;
            if ((l = this.options.extensions) != null && l.startBlock) {
                let c = 1 / 0;
                const u = t.slice(1);
                let f;
                this.options.extensions.startBlock.forEach(p => {
                    f = p.call({lexer: this}, u), typeof f == "number" && f >= 0 && (c = Math.min(c, f))
                }), c < 1 / 0 && c >= 0 && (a = t.substring(0, c + 1))
            }
            if (this.state.top && (o = this.tokenizer.paragraph(a))) {
                const c = n.at(-1);
                r && (c == null ? void 0 : c.type) === "paragraph" ? (c.raw += `
` + o.raw, c.text += `
` + o.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = c.text) : n.push(o), r = a.length !== t.length, t = t.substring(o.raw.length);
                continue
            }
            if (o = this.tokenizer.text(t)) {
                t = t.substring(o.raw.length);
                const c = n.at(-1);
                (c == null ? void 0 : c.type) === "text" ? (c.raw += `
` + o.raw, c.text += `
` + o.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = c.text) : n.push(o);
                continue
            }
            if (t) {
                const c = "Infinite loop on byte: " + t.charCodeAt(0);
                if (this.options.silent) {
                    console.error(c);
                    break
                } else throw new Error(c)
            }
        }
        return this.state.top = !0, n
    }

    inline(t, n = []) {
        return this.inlineQueue.push({src: t, tokens: n}), n
    }

    inlineTokens(t, n = []) {
        var o, a, c;
        let r = t, s = null;
        if (this.tokens.links) {
            const u = Object.keys(this.tokens.links);
            if (u.length > 0) for (; (s = this.tokenizer.rules.inline.reflinkSearch.exec(r)) != null;) u.includes(s[0].slice(s[0].lastIndexOf("[") + 1, -1)) && (r = r.slice(0, s.index) + "[" + "a".repeat(s[0].length - 2) + "]" + r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))
        }
        for (; (s = this.tokenizer.rules.inline.blockSkip.exec(r)) != null;) r = r.slice(0, s.index) + "[" + "a".repeat(s[0].length - 2) + "]" + r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
        for (; (s = this.tokenizer.rules.inline.anyPunctuation.exec(r)) != null;) r = r.slice(0, s.index) + "++" + r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);
        let i = !1, l = "";
        for (; t;) {
            i || (l = ""), i = !1;
            let u;
            if ((a = (o = this.options.extensions) == null ? void 0 : o.inline) != null && a.some(p => (u = p.call({lexer: this}, t, n)) ? (t = t.substring(u.raw.length), n.push(u), !0) : !1)) continue;
            if (u = this.tokenizer.escape(t)) {
                t = t.substring(u.raw.length), n.push(u);
                continue
            }
            if (u = this.tokenizer.tag(t)) {
                t = t.substring(u.raw.length), n.push(u);
                continue
            }
            if (u = this.tokenizer.link(t)) {
                t = t.substring(u.raw.length), n.push(u);
                continue
            }
            if (u = this.tokenizer.reflink(t, this.tokens.links)) {
                t = t.substring(u.raw.length);
                const p = n.at(-1);
                u.type === "text" && (p == null ? void 0 : p.type) === "text" ? (p.raw += u.raw, p.text += u.text) : n.push(u);
                continue
            }
            if (u = this.tokenizer.emStrong(t, r, l)) {
                t = t.substring(u.raw.length), n.push(u);
                continue
            }
            if (u = this.tokenizer.codespan(t)) {
                t = t.substring(u.raw.length), n.push(u);
                continue
            }
            if (u = this.tokenizer.br(t)) {
                t = t.substring(u.raw.length), n.push(u);
                continue
            }
            if (u = this.tokenizer.del(t)) {
                t = t.substring(u.raw.length), n.push(u);
                continue
            }
            if (u = this.tokenizer.autolink(t)) {
                t = t.substring(u.raw.length), n.push(u);
                continue
            }
            if (!this.state.inLink && (u = this.tokenizer.url(t))) {
                t = t.substring(u.raw.length), n.push(u);
                continue
            }
            let f = t;
            if ((c = this.options.extensions) != null && c.startInline) {
                let p = 1 / 0;
                const g = t.slice(1);
                let x;
                this.options.extensions.startInline.forEach(b => {
                    x = b.call({lexer: this}, g), typeof x == "number" && x >= 0 && (p = Math.min(p, x))
                }), p < 1 / 0 && p >= 0 && (f = t.substring(0, p + 1))
            }
            if (u = this.tokenizer.inlineText(f)) {
                t = t.substring(u.raw.length), u.raw.slice(-1) !== "_" && (l = u.raw.slice(-1)), i = !0;
                const p = n.at(-1);
                (p == null ? void 0 : p.type) === "text" ? (p.raw += u.raw, p.text += u.text) : n.push(u);
                continue
            }
            if (t) {
                const p = "Infinite loop on byte: " + t.charCodeAt(0);
                if (this.options.silent) {
                    console.error(p);
                    break
                } else throw new Error(p)
            }
        }
        return n
    }
}

class kr {
    options;
    parser;

    constructor(t) {
        this.options = t || Lt
    }

    space(t) {
        return ""
    }

    code({text: t, lang: n, escaped: r}) {
        var l;
        const s = (l = (n || "").match($e.notSpaceStart)) == null ? void 0 : l[0],
            i = t.replace($e.endingNewline, "") + `
`;
        return s ? '<pre><code class="language-' + Qe(s) + '">' + (r ? i : Qe(i, !0)) + `</code></pre>
` : "<pre><code>" + (r ? i : Qe(i, !0)) + `</code></pre>
`
    }

    blockquote({tokens: t}) {
        return `<blockquote>
${this.parser.parse(t)}</blockquote>
`
    }

    html({text: t}) {
        return t
    }

    heading({tokens: t, depth: n}) {
        return `<h${n}>${this.parser.parseInline(t)}</h${n}>
`
    }

    hr(t) {
        return `<hr>
`
    }

    list(t) {
        const n = t.ordered, r = t.start;
        let s = "";
        for (let o = 0; o < t.items.length; o++) {
            const a = t.items[o];
            s += this.listitem(a)
        }
        const i = n ? "ol" : "ul", l = n && r !== 1 ? ' start="' + r + '"' : "";
        return "<" + i + l + `>
` + s + "</" + i + `>
`
    }

    listitem(t) {
        var r;
        let n = "";
        if (t.task) {
            const s = this.checkbox({checked: !!t.checked});
            t.loose ? ((r = t.tokens[0]) == null ? void 0 : r.type) === "paragraph" ? (t.tokens[0].text = s + " " + t.tokens[0].text, t.tokens[0].tokens && t.tokens[0].tokens.length > 0 && t.tokens[0].tokens[0].type === "text" && (t.tokens[0].tokens[0].text = s + " " + Qe(t.tokens[0].tokens[0].text), t.tokens[0].tokens[0].escaped = !0)) : t.tokens.unshift({
                type: "text",
                raw: s + " ",
                text: s + " ",
                escaped: !0
            }) : n += s + " "
        }
        return n += this.parser.parse(t.tokens, !!t.loose), `<li>${n}</li>
`
    }

    checkbox({checked: t}) {
        return "<input " + (t ? 'checked="" ' : "") + 'disabled="" type="checkbox">'
    }

    paragraph({tokens: t}) {
        return `<p>${this.parser.parseInline(t)}</p>
`
    }

    table(t) {
        let n = "", r = "";
        for (let i = 0; i < t.header.length; i++) r += this.tablecell(t.header[i]);
        n += this.tablerow({text: r});
        let s = "";
        for (let i = 0; i < t.rows.length; i++) {
            const l = t.rows[i];
            r = "";
            for (let o = 0; o < l.length; o++) r += this.tablecell(l[o]);
            s += this.tablerow({text: r})
        }
        return s && (s = `<tbody>${s}</tbody>`), `<table>
<thead>
` + n + `</thead>
` + s + `</table>
`
    }

    tablerow({text: t}) {
        return `<tr>
${t}</tr>
`
    }

    tablecell(t) {
        const n = this.parser.parseInline(t.tokens), r = t.header ? "th" : "td";
        return (t.align ? `<${r} align="${t.align}">` : `<${r}>`) + n + `</${r}>
`
    }

    strong({tokens: t}) {
        return `<strong>${this.parser.parseInline(t)}</strong>`
    }

    em({tokens: t}) {
        return `<em>${this.parser.parseInline(t)}</em>`
    }

    codespan({text: t}) {
        return `<code>${Qe(t, !0)}</code>`
    }

    br(t) {
        return "<br>"
    }

    del({tokens: t}) {
        return `<del>${this.parser.parseInline(t)}</del>`
    }

    link({href: t, title: n, tokens: r}) {
        const s = this.parser.parseInline(r), i = Ql(t);
        if (i === null) return s;
        t = i;
        let l = '<a href="' + t + '"';
        return n && (l += ' title="' + Qe(n) + '"'), l += ">" + s + "</a>", l
    }

    image({href: t, title: n, text: r}) {
        const s = Ql(t);
        if (s === null) return Qe(r);
        t = s;
        let i = `<img src="${t}" alt="${r}"`;
        return n && (i += ` title="${Qe(n)}"`), i += ">", i
    }

    text(t) {
        return "tokens" in t && t.tokens ? this.parser.parseInline(t.tokens) : "escaped" in t && t.escaped ? t.text : Qe(t.text)
    }
}

class xs {
    strong({text: t}) {
        return t
    }

    em({text: t}) {
        return t
    }

    codespan({text: t}) {
        return t
    }

    del({text: t}) {
        return t
    }

    html({text: t}) {
        return t
    }

    text({text: t}) {
        return t
    }

    link({text: t}) {
        return "" + t
    }

    image({text: t}) {
        return "" + t
    }

    br() {
        return ""
    }
}

class Ne {
    options;
    renderer;
    textRenderer;

    constructor(t) {
        this.options = t || Lt, this.options.renderer = this.options.renderer || new kr, this.renderer = this.options.renderer, this.renderer.options = this.options, this.renderer.parser = this, this.textRenderer = new xs
    }

    static parse(t, n) {
        return new Ne(n).parse(t)
    }

    static parseInline(t, n) {
        return new Ne(n).parseInline(t)
    }

    parse(t, n = !0) {
        var s, i;
        let r = "";
        for (let l = 0; l < t.length; l++) {
            const o = t[l];
            if ((i = (s = this.options.extensions) == null ? void 0 : s.renderers) != null && i[o.type]) {
                const c = o, u = this.options.extensions.renderers[c.type].call({parser: this}, c);
                if (u !== !1 || !["space", "hr", "heading", "code", "table", "blockquote", "list", "html", "paragraph", "text"].includes(c.type)) {
                    r += u || "";
                    continue
                }
            }
            const a = o;
            switch (a.type) {
                case"space": {
                    r += this.renderer.space(a);
                    continue
                }
                case"hr": {
                    r += this.renderer.hr(a);
                    continue
                }
                case"heading": {
                    r += this.renderer.heading(a);
                    continue
                }
                case"code": {
                    r += this.renderer.code(a);
                    continue
                }
                case"table": {
                    r += this.renderer.table(a);
                    continue
                }
                case"blockquote": {
                    r += this.renderer.blockquote(a);
                    continue
                }
                case"list": {
                    r += this.renderer.list(a);
                    continue
                }
                case"html": {
                    r += this.renderer.html(a);
                    continue
                }
                case"paragraph": {
                    r += this.renderer.paragraph(a);
                    continue
                }
                case"text": {
                    let c = a, u = this.renderer.text(c);
                    for (; l + 1 < t.length && t[l + 1].type === "text";) c = t[++l], u += `
` + this.renderer.text(c);
                    n ? r += this.renderer.paragraph({
                        type: "paragraph",
                        raw: u,
                        text: u,
                        tokens: [{type: "text", raw: u, text: u, escaped: !0}]
                    }) : r += u;
                    continue
                }
                default: {
                    const c = 'Token with "' + a.type + '" type was not found.';
                    if (this.options.silent) return console.error(c), "";
                    throw new Error(c)
                }
            }
        }
        return r
    }

    parseInline(t, n = this.renderer) {
        var s, i;
        let r = "";
        for (let l = 0; l < t.length; l++) {
            const o = t[l];
            if ((i = (s = this.options.extensions) == null ? void 0 : s.renderers) != null && i[o.type]) {
                const c = this.options.extensions.renderers[o.type].call({parser: this}, o);
                if (c !== !1 || !["escape", "html", "link", "image", "strong", "em", "codespan", "br", "del", "text"].includes(o.type)) {
                    r += c || "";
                    continue
                }
            }
            const a = o;
            switch (a.type) {
                case"escape": {
                    r += n.text(a);
                    break
                }
                case"html": {
                    r += n.html(a);
                    break
                }
                case"link": {
                    r += n.link(a);
                    break
                }
                case"image": {
                    r += n.image(a);
                    break
                }
                case"strong": {
                    r += n.strong(a);
                    break
                }
                case"em": {
                    r += n.em(a);
                    break
                }
                case"codespan": {
                    r += n.codespan(a);
                    break
                }
                case"br": {
                    r += n.br(a);
                    break
                }
                case"del": {
                    r += n.del(a);
                    break
                }
                case"text": {
                    r += n.text(a);
                    break
                }
                default: {
                    const c = 'Token with "' + a.type + '" type was not found.';
                    if (this.options.silent) return console.error(c), "";
                    throw new Error(c)
                }
            }
        }
        return r
    }
}

class An {
    options;
    block;

    constructor(t) {
        this.options = t || Lt
    }

    preprocess(t) {
        return t
    }

    postprocess(t) {
        return t
    }

    processAllTokens(t) {
        return t
    }

    provideLexer() {
        return this.block ? Ue.lex : Ue.lexInline
    }

    provideParser() {
        return this.block ? Ne.parse : Ne.parseInline
    }
}

Rs(An, "passThroughHooks", new Set(["preprocess", "postprocess", "processAllTokens"]));

class to {
    defaults = ps();
    options = this.setOptions;
    parse = this.parseMarkdown(!0);
    parseInline = this.parseMarkdown(!1);
    Parser = Ne;
    Renderer = kr;
    TextRenderer = xs;
    Lexer = Ue;
    Tokenizer = wr;
    Hooks = An;

    constructor(...t) {
        this.use(...t)
    }

    walkTokens(t, n) {
        var s, i;
        let r = [];
        for (const l of t) switch (r = r.concat(n.call(this, l)), l.type) {
            case"table": {
                const o = l;
                for (const a of o.header) r = r.concat(this.walkTokens(a.tokens, n));
                for (const a of o.rows) for (const c of a) r = r.concat(this.walkTokens(c.tokens, n));
                break
            }
            case"list": {
                const o = l;
                r = r.concat(this.walkTokens(o.items, n));
                break
            }
            default: {
                const o = l;
                (i = (s = this.defaults.extensions) == null ? void 0 : s.childTokens) != null && i[o.type] ? this.defaults.extensions.childTokens[o.type].forEach(a => {
                    const c = o[a].flat(1 / 0);
                    r = r.concat(this.walkTokens(c, n))
                }) : o.tokens && (r = r.concat(this.walkTokens(o.tokens, n)))
            }
        }
        return r
    }

    use(...t) {
        const n = this.defaults.extensions || {renderers: {}, childTokens: {}};
        return t.forEach(r => {
            const s = {...r};
            if (s.async = this.defaults.async || s.async || !1, r.extensions && (r.extensions.forEach(i => {
                if (!i.name) throw new Error("extension name required");
                if ("renderer" in i) {
                    const l = n.renderers[i.name];
                    l ? n.renderers[i.name] = function (...o) {
                        let a = i.renderer.apply(this, o);
                        return a === !1 && (a = l.apply(this, o)), a
                    } : n.renderers[i.name] = i.renderer
                }
                if ("tokenizer" in i) {
                    if (!i.level || i.level !== "block" && i.level !== "inline") throw new Error("extension level must be 'block' or 'inline'");
                    const l = n[i.level];
                    l ? l.unshift(i.tokenizer) : n[i.level] = [i.tokenizer], i.start && (i.level === "block" ? n.startBlock ? n.startBlock.push(i.start) : n.startBlock = [i.start] : i.level === "inline" && (n.startInline ? n.startInline.push(i.start) : n.startInline = [i.start]))
                }
                "childTokens" in i && i.childTokens && (n.childTokens[i.name] = i.childTokens)
            }), s.extensions = n), r.renderer) {
                const i = this.defaults.renderer || new kr(this.defaults);
                for (const l in r.renderer) {
                    if (!(l in i)) throw new Error(`renderer '${l}' does not exist`);
                    if (["options", "parser"].includes(l)) continue;
                    const o = l, a = r.renderer[o], c = i[o];
                    i[o] = (...u) => {
                        let f = a.apply(i, u);
                        return f === !1 && (f = c.apply(i, u)), f || ""
                    }
                }
                s.renderer = i
            }
            if (r.tokenizer) {
                const i = this.defaults.tokenizer || new wr(this.defaults);
                for (const l in r.tokenizer) {
                    if (!(l in i)) throw new Error(`tokenizer '${l}' does not exist`);
                    if (["options", "rules", "lexer"].includes(l)) continue;
                    const o = l, a = r.tokenizer[o], c = i[o];
                    i[o] = (...u) => {
                        let f = a.apply(i, u);
                        return f === !1 && (f = c.apply(i, u)), f
                    }
                }
                s.tokenizer = i
            }
            if (r.hooks) {
                const i = this.defaults.hooks || new An;
                for (const l in r.hooks) {
                    if (!(l in i)) throw new Error(`hook '${l}' does not exist`);
                    if (["options", "block"].includes(l)) continue;
                    const o = l, a = r.hooks[o], c = i[o];
                    An.passThroughHooks.has(l) ? i[o] = u => {
                        if (this.defaults.async) return Promise.resolve(a.call(i, u)).then(p => c.call(i, p));
                        const f = a.call(i, u);
                        return c.call(i, f)
                    } : i[o] = (...u) => {
                        let f = a.apply(i, u);
                        return f === !1 && (f = c.apply(i, u)), f
                    }
                }
                s.hooks = i
            }
            if (r.walkTokens) {
                const i = this.defaults.walkTokens, l = r.walkTokens;
                s.walkTokens = function (o) {
                    let a = [];
                    return a.push(l.call(this, o)), i && (a = a.concat(i.call(this, o))), a
                }
            }
            this.defaults = {...this.defaults, ...s}
        }), this
    }

    setOptions(t) {
        return this.defaults = {...this.defaults, ...t}, this
    }

    lexer(t, n) {
        return Ue.lex(t, n ?? this.defaults)
    }

    parser(t, n) {
        return Ne.parse(t, n ?? this.defaults)
    }

    parseMarkdown(t) {
        return (r, s) => {
            const i = {...s}, l = {...this.defaults, ...i}, o = this.onError(!!l.silent, !!l.async);
            if (this.defaults.async === !0 && i.async === !1) return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));
            if (typeof r > "u" || r === null) return o(new Error("marked(): input parameter is undefined or null"));
            if (typeof r != "string") return o(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(r) + ", string expected"));
            l.hooks && (l.hooks.options = l, l.hooks.block = t);
            const a = l.hooks ? l.hooks.provideLexer() : t ? Ue.lex : Ue.lexInline,
                c = l.hooks ? l.hooks.provideParser() : t ? Ne.parse : Ne.parseInline;
            if (l.async) return Promise.resolve(l.hooks ? l.hooks.preprocess(r) : r).then(u => a(u, l)).then(u => l.hooks ? l.hooks.processAllTokens(u) : u).then(u => l.walkTokens ? Promise.all(this.walkTokens(u, l.walkTokens)).then(() => u) : u).then(u => c(u, l)).then(u => l.hooks ? l.hooks.postprocess(u) : u).catch(o);
            try {
                l.hooks && (r = l.hooks.preprocess(r));
                let u = a(r, l);
                l.hooks && (u = l.hooks.processAllTokens(u)), l.walkTokens && this.walkTokens(u, l.walkTokens);
                let f = c(u, l);
                return l.hooks && (f = l.hooks.postprocess(f)), f
            } catch (u) {
                return o(u)
            }
        }
    }

    onError(t, n) {
        return r => {
            if (r.message += `
Please report this to https://github.com/markedjs/marked.`, t) {
                const s = "<p>An error occurred:</p><pre>" + Qe(r.message + "", !0) + "</pre>";
                return n ? Promise.resolve(s) : s
            }
            if (n) return Promise.reject(r);
            throw r
        }
    }
}

const It = new to;

function fe(e, t) {
    return It.parse(e, t)
}

fe.options = fe.setOptions = function (e) {
    return It.setOptions(e), fe.defaults = It.defaults, Dl(fe.defaults), fe
}, fe.getDefaults = ps, fe.defaults = Lt, fe.use = function (...e) {
    return It.use(...e), fe.defaults = It.defaults, Dl(fe.defaults), fe
}, fe.walkTokens = function (e, t) {
    return It.walkTokens(e, t)
}, fe.parseInline = It.parseInline, fe.Parser = Ne, fe.parser = Ne.parse, fe.Renderer = kr, fe.TextRenderer = xs, fe.Lexer = Ue, fe.lexer = Ue.lex, fe.Tokenizer = wr, fe.Hooks = An, fe.parse = fe;

function gf(e) {
    if (typeof e == "function" && (e = {highlight: e}), !e || typeof e.highlight != "function") throw new Error("Must provide highlight function");
    return typeof e.langPrefix != "string" && (e.langPrefix = "language-"), typeof e.emptyLangClass != "string" && (e.emptyLangClass = ""), {
        async: !!e.async, walkTokens(t) {
            if (t.type !== "code") return;
            const n = no(t.lang);
            if (e.async) return Promise.resolve(e.highlight(t.text, n, t.lang || "")).then(ro(t));
            const r = e.highlight(t.text, n, t.lang || "");
            if (r instanceof Promise) throw new Error("markedHighlight is not set to async but the highlight function is async. Set the async option to true on markedHighlight to await the async highlight function.");
            ro(t)(r)
        }, useNewRenderer: !0, renderer: {
            code(t, n, r) {
                typeof t == "object" && (r = t.escaped, n = t.lang, t = t.text);
                const s = no(n), i = s ? e.langPrefix + oo(s) : e.emptyLangClass, l = i ? ` class="${i}"` : "";
                return t = t.replace(/\n$/, ""), `<pre><code${l}>${r ? t : oo(t, !0)}
</code></pre>`
            }
        }
    }
}

function no(e) {
    return (e || "").match(/\S*/)[0]
}

function ro(e) {
    return t => {
        typeof t == "string" && t !== e.text && (e.escaped = !0, e.text = t)
    }
}

const so = /[&<>"']/, mf = new RegExp(so.source, "g"), io = /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,
    vf = new RegExp(io.source, "g"), bf = {"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"},
    lo = e => bf[e];

function oo(e, t) {
    if (t) {
        if (so.test(e)) return e.replace(mf, lo)
    } else if (io.test(e)) return e.replace(vf, lo);
    return e
}

const yf = /\$.*?\$/, wf = /^\$(.*?)\$/, kf = /^(?:\s{0,3})\$\$((?:[^\n]|\n[^\n])+?)\n{0,1}\$\$/, xf = e => [{
        name: "blockMath", level: "block", tokenizer(t) {
            const n = kf.exec(t);
            if (n !== null) return {type: "html", raw: n[0], text: e(!0, n[1])}
        }
    }, {
        name: "inlineMath", level: "inline", start(t) {
            const n = t.search(yf);
            return n !== -1 ? n : t.length
        }, tokenizer(t) {
            const n = wf.exec(t);
            if (n !== null) return {type: "html", raw: n[0], text: e(!1, n[1])}
        }
    }],
    ao = (e = "", t = {}) => e.replace(/:(.+?):/g, (n, r) => t[r] ? `<img class="wl-emoji" src="${t[r]}" alt="${r}">` : n),
    _f = (e, {emojiMap: t, highlighter: n, texRenderer: r}) => {
        const s = new to;
        if (s.setOptions({breaks: !0}), n && s.use(gf({highlight: n})), r) {
            const i = xf(r);
            s.use({extensions: i})
        }
        return s.parse(ao(e, t))
    }, _s = e => {
        const {path: t} = e.dataset;
        return t != null && t.length ? t : null
    }, Cf = e => e.match(/[\w\d\s,.\u00C0-\u024F\u0400-\u04FF]+/giu), Sf = e => e.match(/[\u4E00-\u9FD5]/gu), $f = e => {
        var t, n;
        return (((t = Cf(e)) == null ? void 0 : t.reduce((r, s) => r + (["", ",", "."].includes(s.trim()) ? 0 : s.trim().split(/\s+/u).length), 0)) ?? 0) + (((n = Sf(e)) == null ? void 0 : n.length) ?? 0)
    }, Rf = async () => {
        const {userAgentData: e} = navigator;
        let t = navigator.userAgent;
        if (!e || e.platform !== "Windows") return t;
        const {platformVersion: n} = await e.getHighEntropyValues(["platformVersion"]);
        return n && parseInt(n.split(".")[0]) >= 13 && (t = t.replace("Windows NT 10.0", "Windows NT 11.0")), t
    }, co = ({
                 serverURL: e,
                 path: t = window.location.pathname,
                 selector: n = ".waline-comment-count",
                 lang: r = navigator.language
             }) => {
        const s = new AbortController, i = document.querySelectorAll(n);
        return i.length && Is({
            serverURL: Fn(e),
            paths: Array.from(i).map(l => Qs(_s(l) ?? t)),
            lang: r,
            signal: s.signal
        }).then(l => {
            i.forEach((o, a) => {
                o.innerText = l[a].toString()
            })
        }).catch(zl), s.abort.bind(s)
    }, uo = ({size: e}) => ne("svg", {
        class: "wl-close-icon",
        viewBox: "0 0 1024 1024",
        width: e,
        height: e
    }, [ne("path", {
        d: "M697.173 85.333h-369.92c-144.64 0-241.92 101.547-241.92 252.587v348.587c0 150.613 97.28 252.16 241.92 252.16h369.92c144.64 0 241.494-101.547 241.494-252.16V337.92c0-151.04-96.854-252.587-241.494-252.587z",
        fill: "currentColor"
    }), ne("path", {
        d: "m640.683 587.52-75.947-75.861 75.904-75.862a37.29 37.29 0 0 0 0-52.778 37.205 37.205 0 0 0-52.779 0l-75.946 75.818-75.862-75.946a37.419 37.419 0 0 0-52.821 0 37.419 37.419 0 0 0 0 52.821l75.947 75.947-75.776 75.733a37.29 37.29 0 1 0 52.778 52.821l75.776-75.776 75.947 75.947a37.376 37.376 0 0 0 52.779-52.821z",
        fill: "#888"
    })]), Af = () => ne("svg", {
        viewBox: "0 0 1024 1024",
        width: "24",
        height: "24"
    }, ne("path", {
        d: "m341.013 394.667 27.755 393.45h271.83l27.733-393.45h64.106l-28.01 397.952a64 64 0 0 1-63.83 59.498H368.768a64 64 0 0 1-63.83-59.52l-28.053-397.93h64.128zm139.307 19.818v298.667h-64V414.485h64zm117.013 0v298.667h-64V414.485h64zM181.333 288h640v64h-640v-64zm453.483-106.667v64h-256v-64h256z",
        fill: "red"
    })), Ef = () => ne("svg", {viewBox: "0 0 1024 1024", width: "24", height: "24"}, ne("path", {
        d: "M563.2 463.3 677 540c1.7 1.2 3.7 1.8 5.8 1.8.7 0 1.4-.1 2-.2 2.7-.5 5.1-2.1 6.6-4.4l25.3-37.8c1.5-2.3 2.1-5.1 1.6-7.8s-2.1-5.1-4.4-6.6l-73.6-49.1 73.6-49.1c2.3-1.5 3.9-3.9 4.4-6.6.5-2.7 0-5.5-1.6-7.8l-25.3-37.8a10.1 10.1 0 0 0-6.6-4.4c-.7-.1-1.3-.2-2-.2-2.1 0-4.1.6-5.8 1.8l-113.8 76.6c-9.2 6.2-14.7 16.4-14.7 27.5.1 11 5.5 21.3 14.7 27.4zM387 348.8h-45.5c-5.7 0-10.4 4.7-10.4 10.4v153.3c0 5.7 4.7 10.4 10.4 10.4H387c5.7 0 10.4-4.7 10.4-10.4V359.2c0-5.7-4.7-10.4-10.4-10.4zm333.8 241.3-41-20a10.3 10.3 0 0 0-8.1-.5c-2.6.9-4.8 2.9-5.9 5.4-30.1 64.9-93.1 109.1-164.4 115.2-5.7.5-9.9 5.5-9.5 11.2l3.9 45.5c.5 5.3 5 9.5 10.3 9.5h.9c94.8-8 178.5-66.5 218.6-152.7 2.4-5 .3-11.2-4.8-13.6zm186-186.1c-11.9-42-30.5-81.4-55.2-117.1-24.1-34.9-53.5-65.6-87.5-91.2-33.9-25.6-71.5-45.5-111.6-59.2-41.2-14-84.1-21.1-127.8-21.1h-1.2c-75.4 0-148.8 21.4-212.5 61.7-63.7 40.3-114.3 97.6-146.5 165.8-32.2 68.1-44.3 143.6-35.1 218.4 9.3 74.8 39.4 145 87.3 203.3.1.2.3.3.4.5l36.2 38.4c1.1 1.2 2.5 2.1 3.9 2.6 73.3 66.7 168.2 103.5 267.5 103.5 73.3 0 145.2-20.3 207.7-58.7 37.3-22.9 70.3-51.5 98.1-85 27.1-32.7 48.7-69.5 64.2-109.1 15.5-39.7 24.4-81.3 26.6-123.8 2.4-43.6-2.5-87-14.5-129zm-60.5 181.1c-8.3 37-22.8 72-43 104-19.7 31.1-44.3 58.6-73.1 81.7-28.8 23.1-61 41-95.7 53.4-35.6 12.7-72.9 19.1-110.9 19.1-82.6 0-161.7-30.6-222.8-86.2l-34.1-35.8c-23.9-29.3-42.4-62.2-55.1-97.7-12.4-34.7-18.8-71-19.2-107.9-.4-36.9 5.4-73.3 17.1-108.2 12-35.8 30-69.2 53.4-99.1 31.7-40.4 71.1-72 117.2-94.1 44.5-21.3 94-32.6 143.4-32.6 49.3 0 97 10.8 141.8 32 34.3 16.3 65.3 38.1 92 64.8 26.1 26 47.5 56 63.6 89.2 16.2 33.2 26.6 68.5 31 105.1 4.6 37.5 2.7 75.3-5.6 112.3z",
        fill: "currentColor"
    })), Tf = () => ne("svg", {
        viewBox: "0 0 1024 1024",
        width: "24",
        height: "24"
    }, [ne("path", {
        d: "M784 112H240c-88 0-160 72-160 160v480c0 88 72 160 160 160h544c88 0 160-72 160-160V272c0-88-72-160-160-160zm96 640c0 52.8-43.2 96-96 96H240c-52.8 0-96-43.2-96-96V272c0-52.8 43.2-96 96-96h544c52.8 0 96 43.2 96 96v480z",
        fill: "currentColor"
    }), ne("path", {
        d: "M352 480c52.8 0 96-43.2 96-96s-43.2-96-96-96-96 43.2-96 96 43.2 96 96 96zm0-128c17.6 0 32 14.4 32 32s-14.4 32-32 32-32-14.4-32-32 14.4-32 32-32zm462.4 379.2-3.2-3.2-177.6-177.6c-25.6-25.6-65.6-25.6-91.2 0l-80 80-36.8-36.8c-25.6-25.6-65.6-25.6-91.2 0L200 728c-4.8 6.4-8 14.4-8 24 0 17.6 14.4 32 32 32 9.6 0 16-3.2 22.4-9.6L380.8 640l134.4 134.4c6.4 6.4 14.4 9.6 24 9.6 17.6 0 32-14.4 32-32 0-9.6-4.8-17.6-9.6-24l-52.8-52.8 80-80L769.6 776c6.4 4.8 12.8 8 20.8 8 17.6 0 32-14.4 32-32 0-8-3.2-16-8-20.8z",
        fill: "currentColor"
    })]), Lf = ({active: e = !1}) => ne("svg", {viewBox: "0 0 1024 1024", width: "24", height: "24"}, [ne("path", {
        d: `M850.654 323.804c-11.042-25.625-26.862-48.532-46.885-68.225-20.022-19.61-43.258-34.936-69.213-45.73-26.78-11.124-55.124-16.727-84.375-16.727-40.622 0-80.256 11.123-114.698 32.135A214.79 214.79 0 0 0 512 241.819a214.79 214.79 0 0 0-23.483-16.562c-34.442-21.012-74.076-32.135-114.698-32.135-29.25 0-57.595 5.603-84.375 16.727-25.872 10.711-49.19 26.12-69.213 45.73-20.105 19.693-35.843 42.6-46.885 68.225-11.453 26.615-17.303 54.877-17.303 83.963 0 27.439 5.603 56.03 16.727 85.117 9.31 24.307 22.659 49.52 39.715 74.981 27.027 40.293 64.188 82.316 110.33 124.915 76.465 70.615 152.189 119.394 155.402 121.371l19.528 12.525c8.652 5.52 19.776 5.52 28.427 0l19.529-12.525c3.213-2.06 78.854-50.756 155.401-121.371 46.143-42.6 83.304-84.622 110.33-124.915 17.057-25.46 30.487-50.674 39.716-74.981 11.124-29.087 16.727-57.678 16.727-85.117.082-29.086-5.768-57.348-17.221-83.963z${e ? "" : "M512 761.5S218.665 573.55 218.665 407.767c0-83.963 69.461-152.023 155.154-152.023 60.233 0 112.473 33.618 138.181 82.727 25.708-49.109 77.948-82.727 138.18-82.727 85.694 0 155.155 68.06 155.155 152.023C805.335 573.551 512 761.5 512 761.5z"}`,
        fill: e ? "red" : "currentColor"
    })]), If = () => ne("svg", {
        viewBox: "0 0 1024 1024",
        width: "24",
        height: "24"
    }, [ne("path", {
        d: "M710.816 654.301c70.323-96.639 61.084-230.578-23.705-314.843-46.098-46.098-107.183-71.109-172.28-71.109-65.008 0-126.092 25.444-172.28 71.109-45.227 46.098-70.756 107.183-70.756 172.106 0 64.923 25.444 126.007 71.194 172.106 46.099 46.098 107.184 71.109 172.28 71.109 51.414 0 100.648-16.212 142.824-47.404l126.53 126.006c7.058 7.06 16.297 10.979 26.406 10.979 10.105 0 19.343-3.919 26.402-10.979 14.467-14.467 14.467-38.172 0-52.723L710.816 654.301zm-315.107-23.265c-65.88-65.88-65.88-172.54 0-238.42 32.069-32.07 74.245-49.149 119.471-49.149 45.227 0 87.407 17.603 119.472 49.149 65.88 65.879 65.88 172.539 0 238.42-63.612 63.178-175.242 63.178-238.943 0zm0 0",
        fill: "currentColor"
    }), ne("path", {
        d: "M703.319 121.603H321.03c-109.8 0-199.469 89.146-199.469 199.38v382.034c0 109.796 89.236 199.38 199.469 199.38h207.397c20.653 0 37.384-16.645 37.384-37.299 0-20.649-16.731-37.296-37.384-37.296H321.03c-68.582 0-124.352-55.77-124.352-124.267V321.421c0-68.496 55.77-124.267 124.352-124.267h382.289c68.582 0 124.352 55.771 124.352 124.267V524.72c0 20.654 16.736 37.299 37.385 37.299 20.654 0 37.384-16.645 37.384-37.299V320.549c-.085-109.8-89.321-198.946-199.121-198.946zm0 0",
        fill: "currentColor"
    })]), Mf = () => ne("svg", {
        width: "16",
        height: "16",
        ariaHidden: "true"
    }, ne("path", {
        d: "M14.85 3H1.15C.52 3 0 3.52 0 4.15v7.69C0 12.48.52 13 1.15 13h13.69c.64 0 1.15-.52 1.15-1.15v-7.7C16 3.52 15.48 3 14.85 3zM9 11H7V8L5.5 9.92 4 8v3H2V5h2l1.5 2L7 5h2v6zm2.99.5L9.5 8H11V5h2v3h1.5l-2.51 3.5z",
        fill: "currentColor"
    })), Pf = () => ne("svg", {
        viewBox: "0 0 1024 1024",
        width: "24",
        height: "24"
    }, ne("path", {
        d: "M810.667 213.333a64 64 0 0 1 64 64V704a64 64 0 0 1-64 64H478.336l-146.645 96.107a21.333 21.333 0 0 1-33.024-17.856V768h-85.334a64 64 0 0 1-64-64V277.333a64 64 0 0 1 64-64h597.334zm0 64H213.333V704h149.334v63.296L459.243 704h351.424V277.333zm-271.36 213.334v64h-176.64v-64h176.64zm122.026-128v64H362.667v-64h298.666z",
        fill: "currentColor"
    })), Of = () => ne("svg", {
        viewBox: "0 0 1024 1024",
        width: "24",
        height: "24"
    }, ne("path", {
        d: "M813.039 318.772L480.53 651.278H360.718V531.463L693.227 198.961C697.904 194.284 704.027 192 710.157 192C716.302 192 722.436 194.284 727.114 198.961L813.039 284.88C817.72 289.561 820 295.684 820 301.825C820 307.95 817.72 314.093 813.039 318.772ZM710.172 261.888L420.624 551.431V591.376H460.561L750.109 301.825L710.172 261.888ZM490.517 291.845H240.906V771.09H720.156V521.479C720.156 504.947 733.559 491.529 750.109 491.529C766.653 491.529 780.063 504.947 780.063 521.479V791.059C780.063 813.118 762.18 831 740.125 831H220.937C198.882 831 181 813.118 181 791.059V271.872C181 249.817 198.882 231.935 220.937 231.935H490.517C507.06 231.935 520.47 245.352 520.47 261.888C520.47 278.424 507.06 291.845 490.517 291.845Z",
        fill: "currentColor"
    })), jf = () => ne("svg", {
        class: "verified-icon",
        viewBox: "0 0 1024 1024",
        width: "14",
        height: "14"
    }, ne("path", {
        d: "m894.4 461.56-54.4-63.2c-10.4-12-18.8-34.4-18.8-50.4v-68c0-42.4-34.8-77.2-77.2-77.2h-68c-15.6 0-38.4-8.4-50.4-18.8l-63.2-54.4c-27.6-23.6-72.8-23.6-100.8 0l-62.8 54.8c-12 10-34.8 18.4-50.4 18.4h-69.2c-42.4 0-77.2 34.8-77.2 77.2v68.4c0 15.6-8.4 38-18.4 50l-54 63.6c-23.2 27.6-23.2 72.4 0 100l54 63.6c10 12 18.4 34.4 18.4 50v68.4c0 42.4 34.8 77.2 77.2 77.2h69.2c15.6 0 38.4 8.4 50.4 18.8l63.2 54.4c27.6 23.6 72.8 23.6 100.8 0l63.2-54.4c12-10.4 34.4-18.8 50.4-18.8h68c42.4 0 77.2-34.8 77.2-77.2v-68c0-15.6 8.4-38.4 18.8-50.4l54.4-63.2c23.2-27.6 23.2-73.2-.4-100.8zm-216-25.2-193.2 193.2a30 30 0 0 1-42.4 0l-96.8-96.8a30.16 30.16 0 0 1 0-42.4c11.6-11.6 30.8-11.6 42.4 0l75.6 75.6 172-172c11.6-11.6 30.8-11.6 42.4 0 11.6 11.6 11.6 30.8 0 42.4z",
        fill: "#27ae60"
    })), En = ({size: e = 100}) => ne("svg", {
        width: e,
        height: e,
        viewBox: "0 0 100 100",
        preserveAspectRatio: "xMidYMid"
    }, ne("circle", {
        cx: 50,
        cy: 50,
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "4",
        r: "40",
        "stroke-dasharray": "85 30"
    }, ne("animateTransform", {
        attributeName: "transform",
        type: "rotate",
        repeatCount: "indefinite",
        dur: "1s",
        values: "0 50 50;360 50 50",
        keyTimes: "0;1"
    }))), zf = () => ne("svg", {
        width: 24,
        height: 24,
        fill: "currentcolor",
        viewBox: "0 0 24 24"
    }, [ne("path", {
        style: "transform: translateY(0.5px)",
        d: "M18.968 10.5H15.968V11.484H17.984V12.984H15.968V15H14.468V9H18.968V10.5V10.5ZM8.984 9C9.26533 9 9.49967 9.09367 9.687 9.281C9.87433 9.46833 9.968 9.70267 9.968 9.984V10.5H6.499V13.5H8.468V12H9.968V14.016C9.968 14.2973 9.87433 14.5317 9.687 14.719C9.49967 14.9063 9.26533 15 8.984 15H5.984C5.70267 15 5.46833 14.9063 5.281 14.719C5.09367 14.5317 5 14.2973 5 14.016V9.985C5 9.70367 5.09367 9.46933 5.281 9.282C5.46833 9.09467 5.70267 9.001 5.984 9.001H8.984V9ZM11.468 9H12.968V15H11.468V9V9Z"
    }), ne("path", {d: "M18.5 3H5.75C3.6875 3 2 4.6875 2 6.75V18C2 20.0625 3.6875 21.75 5.75 21.75H18.5C20.5625 21.75 22.25 20.0625 22.25 18V6.75C22.25 4.6875 20.5625 3 18.5 3ZM20.75 18C20.75 19.2375 19.7375 20.25 18.5 20.25H5.75C4.5125 20.25 3.5 19.2375 3.5 18V6.75C3.5 5.5125 4.5125 4.5 5.75 4.5H18.5C19.7375 4.5 20.75 5.5125 20.75 6.75V18Z"})]),
    Ff = () => Zt("WALINE_USER_META", {nick: "", mail: "", link: ""}), Df = () => Zt("WALINE_COMMENT_BOX_EDITOR", ""),
    Hf = "WALINE_LIKE", Uf = Zt(Hf, []), fo = () => Uf, Nf = "WALINE_REACTION", Bf = Zt(Nf, {}), Vf = () => Bf;
var Cs = {}, mt = {}, Mt = {}, ho;

function po() {
    if (ho) return Mt;
    ho = 1;
    var e = Mt.__awaiter || function (r, s, i, l) {
        function o(a) {
            return a instanceof i ? a : new i(function (c) {
                c(a)
            })
        }

        return new (i || (i = Promise))(function (a, c) {
            function u(g) {
                try {
                    p(l.next(g))
                } catch (x) {
                    c(x)
                }
            }

            function f(g) {
                try {
                    p(l.throw(g))
                } catch (x) {
                    c(x)
                }
            }

            function p(g) {
                g.done ? a(g.value) : o(g.value).then(u, f)
            }

            p((l = l.apply(r, s || [])).next())
        })
    }, t = Mt.__generator || function (r, s) {
        var i = {
            label: 0, sent: function () {
                if (a[0] & 1) throw a[1];
                return a[1]
            }, trys: [], ops: []
        }, l, o, a, c;
        return c = {
            next: u(0),
            throw: u(1),
            return: u(2)
        }, typeof Symbol == "function" && (c[Symbol.iterator] = function () {
            return this
        }), c;

        function u(p) {
            return function (g) {
                return f([p, g])
            }
        }

        function f(p) {
            if (l) throw new TypeError("Generator is already executing.");
            for (; c && (c = 0, p[0] && (i = 0)), i;) try {
                if (l = 1, o && (a = p[0] & 2 ? o.return : p[0] ? o.throw || ((a = o.return) && a.call(o), 0) : o.next) && !(a = a.call(o, p[1])).done) return a;
                switch (o = 0, a && (p = [p[0] & 2, a.value]), p[0]) {
                    case 0:
                    case 1:
                        a = p;
                        break;
                    case 4:
                        return i.label++, {value: p[1], done: !1};
                    case 5:
                        i.label++, o = p[1], p = [0];
                        continue;
                    case 7:
                        p = i.ops.pop(), i.trys.pop();
                        continue;
                    default:
                        if (a = i.trys, !(a = a.length > 0 && a[a.length - 1]) && (p[0] === 6 || p[0] === 2)) {
                            i = 0;
                            continue
                        }
                        if (p[0] === 3 && (!a || p[1] > a[0] && p[1] < a[3])) {
                            i.label = p[1];
                            break
                        }
                        if (p[0] === 6 && i.label < a[1]) {
                            i.label = a[1], a = p;
                            break
                        }
                        if (a && i.label < a[2]) {
                            i.label = a[2], i.ops.push(p);
                            break
                        }
                        a[2] && i.ops.pop(), i.trys.pop();
                        continue
                }
                p = s.call(r, i)
            } catch (g) {
                p = [6, g], o = 0
            } finally {
                l = a = 0
            }
            if (p[0] & 5) throw p[1];
            return {value: p[0] ? p[1] : void 0, done: !0}
        }
    };
    Object.defineProperty(Mt, "__esModule", {value: !0}), Mt.ReCaptchaInstance = void 0;
    var n = function () {
        function r(s, i, l) {
            this.siteKey = s, this.recaptchaID = i, this.recaptcha = l, this.styleContainer = null
        }

        return r.prototype.execute = function (s) {
            return e(this, void 0, void 0, function () {
                var i;
                return t(this, function (l) {
                    switch (l.label) {
                        case 0:
                            return this.recaptcha.enterprise ? [4, this.recaptcha.enterprise.execute(this.recaptchaID, {action: s})] : [3, 2];
                        case 1:
                            return i = l.sent(), [3, 4];
                        case 2:
                            return [4, this.recaptcha.execute(this.recaptchaID, {action: s})];
                        case 3:
                            i = l.sent(), l.label = 4;
                        case 4:
                            return [2, i]
                    }
                })
            })
        }, r.prototype.getSiteKey = function () {
            return this.siteKey
        }, r.prototype.hideBadge = function () {
            this.styleContainer === null && (this.styleContainer = document.createElement("style"), this.styleContainer.innerHTML = ".grecaptcha-badge{visibility:hidden !important;}", document.head.appendChild(this.styleContainer))
        }, r.prototype.showBadge = function () {
            this.styleContainer !== null && (document.head.removeChild(this.styleContainer), this.styleContainer = null)
        }, r
    }();
    return Mt.ReCaptchaInstance = n, Mt
}

var go;

function Wf() {
    if (go) return mt;
    go = 1;
    var e = mt.__assign || function () {
        return e = Object.assign || function (s) {
            for (var i, l = 1, o = arguments.length; l < o; l++) {
                i = arguments[l];
                for (var a in i) Object.prototype.hasOwnProperty.call(i, a) && (s[a] = i[a])
            }
            return s
        }, e.apply(this, arguments)
    };
    Object.defineProperty(mt, "__esModule", {value: !0}), mt.getInstance = mt.load = void 0;
    var t = po(), n;
    (function (s) {
        s[s.NOT_LOADED = 0] = "NOT_LOADED", s[s.LOADING = 1] = "LOADING", s[s.LOADED = 2] = "LOADED"
    })(n || (n = {}));
    var r = function () {
        function s() {
        }

        return s.load = function (i, l) {
            if (l === void 0 && (l = {}), typeof document > "u") return Promise.reject(new Error("This is a library for the browser!"));
            if (s.getLoadingState() === n.LOADED) return s.instance.getSiteKey() === i ? Promise.resolve(s.instance) : Promise.reject(new Error("reCAPTCHA already loaded with different site key!"));
            if (s.getLoadingState() === n.LOADING) return i !== s.instanceSiteKey ? Promise.reject(new Error("reCAPTCHA already loaded with different site key!")) : new Promise(function (a, c) {
                s.successfulLoadingConsumers.push(function (u) {
                    return a(u)
                }), s.errorLoadingRunnable.push(function (u) {
                    return c(u)
                })
            });
            s.instanceSiteKey = i, s.setLoadingState(n.LOADING);
            var o = new s;
            return new Promise(function (a, c) {
                o.loadScript(i, l.useRecaptchaNet || !1, l.useEnterprise || !1, l.renderParameters ? l.renderParameters : {}, l.customUrl).then(function () {
                    s.setLoadingState(n.LOADED);
                    var u = o.doExplicitRender(grecaptcha, i, l.explicitRenderParameters ? l.explicitRenderParameters : {}, l.useEnterprise || !1),
                        f = new t.ReCaptchaInstance(i, u, grecaptcha);
                    s.successfulLoadingConsumers.forEach(function (p) {
                        return p(f)
                    }), s.successfulLoadingConsumers = [], l.autoHideBadge && f.hideBadge(), s.instance = f, a(f)
                }).catch(function (u) {
                    s.errorLoadingRunnable.forEach(function (f) {
                        return f(u)
                    }), s.errorLoadingRunnable = [], c(u)
                })
            })
        }, s.getInstance = function () {
            return s.instance
        }, s.setLoadingState = function (i) {
            s.loadingState = i
        }, s.getLoadingState = function () {
            return s.loadingState === null ? n.NOT_LOADED : s.loadingState
        }, s.prototype.loadScript = function (i, l, o, a, c) {
            var u = this;
            l === void 0 && (l = !1), o === void 0 && (o = !1), a === void 0 && (a = {}), c === void 0 && (c = "");
            var f = document.createElement("script");
            f.setAttribute("recaptcha-v3-script", ""), f.setAttribute("async", ""), f.setAttribute("defer", "");
            var p = "https://www.google.com/recaptcha/api.js";
            l ? o ? p = "https://recaptcha.net/recaptcha/enterprise.js" : p = "https://recaptcha.net/recaptcha/api.js" : o && (p = "https://www.google.com/recaptcha/enterprise.js"), c && (p = c), a.render && (a.render = void 0);
            var g = this.buildQueryString(a);
            return f.src = p + "?render=explicit" + g, new Promise(function (x, b) {
                f.addEventListener("load", u.waitForScriptToLoad(function () {
                    x(f)
                }, o), !1), f.onerror = function (T) {
                    s.setLoadingState(n.NOT_LOADED), b(T)
                }, document.head.appendChild(f)
            })
        }, s.prototype.buildQueryString = function (i) {
            var l = Object.keys(i);
            return l.length < 1 ? "" : "&" + Object.keys(i).filter(function (o) {
                return !!i[o]
            }).map(function (o) {
                return o + "=" + i[o]
            }).join("&")
        }, s.prototype.waitForScriptToLoad = function (i, l) {
            var o = this;
            return function () {
                window.grecaptcha === void 0 ? setTimeout(function () {
                    o.waitForScriptToLoad(i, l)
                }, s.SCRIPT_LOAD_DELAY) : l ? window.grecaptcha.enterprise.ready(function () {
                    i()
                }) : window.grecaptcha.ready(function () {
                    i()
                })
            }
        }, s.prototype.doExplicitRender = function (i, l, o, a) {
            var c = e({sitekey: l}, o);
            return o.container ? a ? i.enterprise.render(o.container, c) : i.render(o.container, c) : a ? i.enterprise.render(c) : i.render(c)
        }, s.loadingState = null, s.instance = null, s.instanceSiteKey = null, s.successfulLoadingConsumers = [], s.errorLoadingRunnable = [], s.SCRIPT_LOAD_DELAY = 25, s
    }();
    return mt.load = r.load, mt.getInstance = r.getInstance, mt
}

var mo;

function qf() {
    return mo || (mo = 1, function (e) {
        Object.defineProperty(e, "__esModule", {value: !0}), e.ReCaptchaInstance = e.getInstance = e.load = void 0;
        var t = Wf();
        Object.defineProperty(e, "load", {
            enumerable: !0, get: function () {
                return t.load
            }
        }), Object.defineProperty(e, "getInstance", {
            enumerable: !0, get: function () {
                return t.getInstance
            }
        });
        var n = po();
        Object.defineProperty(e, "ReCaptchaInstance", {
            enumerable: !0, get: function () {
                return n.ReCaptchaInstance
            }
        })
    }(Cs)), Cs
}

var Kf = qf();
const vo = {}, Gf = e => {
        const t = vo[e] ?? (vo[e] = Kf.load(e, {useRecaptchaNet: !0, autoHideBadge: !0}));
        return {execute: n => t.then(r => r.execute(n))}
    }, Zf = e => ({
        execute: async t => {
            const {load: n} = $u("https://challenges.cloudflare.com/turnstile/v0/api.js", void 0, {async: !1});
            await n();
            const r = window.turnstile;
            return new Promise(s => {
                r == null || r.ready(() => {
                    r.render(".wl-captcha-container", {sitekey: e, action: t, size: "compact", callback: s})
                })
            })
        }
    }), Jf = "WALINE_USER", Yf = Zt(Jf, {}), xr = () => Yf, Qf = {key: 0, class: "wl-reaction"}, Xf = ["textContent"],
    eh = {class: "wl-reaction-list"}, th = ["onClick"], nh = {class: "wl-reaction-img"}, rh = ["src", "alt"],
    sh = ["textContent"], ih = ["textContent"];
var lh = dn({
    __name: "ArticleReaction", setup(e) {
        const t = Vf(), n = er(zn), r = Y(-1), s = Y([]), i = ge(() => n.value.locale),
            l = ge(() => n.value.reaction.length > 0), o = ge(() => {
                const {reaction: f, path: p} = n.value;
                return f.length ? f.map((g, x) => ({
                    icon: g,
                    desc: i.value[`reaction${x}`],
                    active: t.value[p] === x
                })) : null
            });
        let a;
        const c = async () => {
            if (!l.value) return;
            const {serverURL: f, lang: p, path: g, reaction: x} = n.value, b = new AbortController;
            a = b.abort.bind(b);
            const [T] = await Cr({
                serverURL: f,
                lang: p,
                paths: [g],
                type: x.map((k, _) => `reaction${_}`),
                signal: b.signal
            });
            s.value = x.map((k, _) => T[`reaction${_}`])
        }, u = async f => {
            if (r.value !== -1) return;
            const {serverURL: p, lang: g, path: x} = n.value, b = t.value[x];
            r.value = f, b !== void 0 && (await On({
                serverURL: p,
                lang: g,
                path: x,
                type: `reaction${b}`,
                action: "desc"
            }), s.value[b] = Math.max(s.value[b] - 1, 0)), b !== f && (await On({
                serverURL: p,
                lang: g,
                path: x,
                type: `reaction${f}`
            }), s.value[f] = (s.value[f] || 0) + 1), b === f ? delete t.value[x] : t.value[x] = f, r.value = -1
        };
        return gn(() => {
            _n(() => [n.value.serverURL, n.value.path], () => c())
        }), Qr(() => {
            a == null || a()
        }), (f, p) => o.value ? (I(), P("div", Qf, [F("div", {
            class: "wl-reaction-title",
            textContent: X(i.value.reactionTitle)
        }, null, 8, Xf), F("ul", eh, [(I(!0), P(ue, null, je(o.value, ({
                                                                           active: g,
                                                                           icon: x,
                                                                           desc: b
                                                                       }, T) => (I(), P("li", {
            key: T,
            class: pe(["wl-reaction-item", {active: g}]),
            onClick: k => u(T)
        }, [F("div", nh, [F("img", {src: x, alt: b}, null, 8, rh), r.value === T ? (I(), lt(G(En), {
            key: 0,
            class: "wl-reaction-loading"
        })) : (I(), P("div", {
            key: 1,
            class: "wl-reaction-votes",
            textContent: X(s.value[T] || 0)
        }, null, 8, sh))]), F("div", {
            class: "wl-reaction-text",
            textContent: X(b)
        }, null, 8, ih)], 10, th))), 128))])])) : Q("v-if", !0)
    }
}), Tn = new Map;

function oh(e) {
    var t = Tn.get(e);
    t && t.destroy()
}

function ah(e) {
    var t = Tn.get(e);
    t && t.update()
}

var Ln = null;
typeof window > "u" ? ((Ln = function (e) {
    return e
}).destroy = function (e) {
    return e
}, Ln.update = function (e) {
    return e
}) : ((Ln = function (e, t) {
    return e && Array.prototype.forEach.call(e.length ? e : [e], function (n) {
        return function (r) {
            if (r && r.nodeName && r.nodeName === "TEXTAREA" && !Tn.has(r)) {
                var s, i = null, l = window.getComputedStyle(r), o = (s = r.value, function () {
                    c({testForHeightReduction: s === "" || !r.value.startsWith(s), restoreTextAlign: null}), s = r.value
                }), a = (function (f) {
                    r.removeEventListener("autosize:destroy", a), r.removeEventListener("autosize:update", u), r.removeEventListener("input", o), window.removeEventListener("resize", u), Object.keys(f).forEach(function (p) {
                        return r.style[p] = f[p]
                    }), Tn.delete(r)
                }).bind(r, {
                    height: r.style.height,
                    resize: r.style.resize,
                    textAlign: r.style.textAlign,
                    overflowY: r.style.overflowY,
                    overflowX: r.style.overflowX,
                    wordWrap: r.style.wordWrap
                });
                r.addEventListener("autosize:destroy", a), r.addEventListener("autosize:update", u), r.addEventListener("input", o), window.addEventListener("resize", u), r.style.overflowX = "hidden", r.style.wordWrap = "break-word", Tn.set(r, {
                    destroy: a,
                    update: u
                }), u()
            }

            function c(f) {
                var p, g, x = f.restoreTextAlign, b = x === void 0 ? null : x, T = f.testForHeightReduction,
                    k = T === void 0 || T, _ = l.overflowY;
                if (r.scrollHeight !== 0 && (l.resize === "vertical" ? r.style.resize = "none" : l.resize === "both" && (r.style.resize = "horizontal"), k && (p = function (L) {
                    for (var O = []; L && L.parentNode && L.parentNode instanceof Element;) L.parentNode.scrollTop && O.push([L.parentNode, L.parentNode.scrollTop]), L = L.parentNode;
                    return function () {
                        return O.forEach(function (K) {
                            var j = K[0], J = K[1];
                            j.style.scrollBehavior = "auto", j.scrollTop = J, j.style.scrollBehavior = null
                        })
                    }
                }(r), r.style.height = ""), g = l.boxSizing === "content-box" ? r.scrollHeight - (parseFloat(l.paddingTop) + parseFloat(l.paddingBottom)) : r.scrollHeight + parseFloat(l.borderTopWidth) + parseFloat(l.borderBottomWidth), l.maxHeight !== "none" && g > parseFloat(l.maxHeight) ? (l.overflowY === "hidden" && (r.style.overflow = "scroll"), g = parseFloat(l.maxHeight)) : l.overflowY !== "hidden" && (r.style.overflow = "hidden"), r.style.height = g + "px", b && (r.style.textAlign = b), p && p(), i !== g && (r.dispatchEvent(new Event("autosize:resized", {bubbles: !0})), i = g), _ !== l.overflow && !b)) {
                    var N = l.textAlign;
                    l.overflow === "hidden" && (r.style.textAlign = N === "start" ? "end" : "start"), c({
                        restoreTextAlign: N,
                        testForHeightReduction: !0
                    })
                }
            }

            function u() {
                c({testForHeightReduction: !0, restoreTextAlign: null})
            }
        }(n)
    }), e
}).destroy = function (e) {
    return e && Array.prototype.forEach.call(e.length ? e : [e], oh), e
}, Ln.update = function (e) {
    return e && Array.prototype.forEach.call(e.length ? e : [e], ah), e
});
var bo = Ln;
const ch = ["data-index"], uh = ["src", "title", "onClick"];
var fh = dn({
    __name: "ImageWall",
    props: {items: {default: () => []}, columnWidth: {default: 300}, gap: {default: 0}},
    emits: ["insert"],
    setup(e) {
        const t = e;
        let n = null;
        const r = dt("wall"), s = Y({}), i = Y([]), l = () => {
            const f = Math.floor((r.value.getBoundingClientRect().width + t.gap) / (t.columnWidth + t.gap));
            return f > 0 ? f : 1
        }, o = f => new Array(f).fill(null).map(() => []), a = async f => {
            var p;
            if (f >= t.items.length) return;
            await Wt();
            const g = Array.from(((p = r.value) == null ? void 0 : p.children) ?? []).reduce((x, b) => b.getBoundingClientRect().height < x.getBoundingClientRect().height ? b : x);
            i.value[Number(g.dataset.index)].push(f), await a(f + 1)
        }, c = async (f = !1) => {
            if (i.value.length === l() && !f) return;
            i.value = o(l());
            const p = window.scrollY;
            await a(0), window.scrollTo({top: p})
        }, u = f => {
            s.value[f.target.src] = !0
        };
        return gn(() => {
            c(!0), n = new ResizeObserver(() => {
                c()
            }), n.observe(r.value), it(() => [t.items], () => {
                s.value = {}, c(!0)
            }), it(() => [t.columnWidth, t.gap], () => {
                c()
            })
        }), Ba(() => {
            n.unobserve(r.value)
        }), (f, p) => (I(), P("div", {
            ref_key: "wall",
            ref: r,
            class: "wl-gallery",
            style: nn({gap: `${f.gap}px`})
        }, [(I(!0), P(ue, null, je(i.value, (g, x) => (I(), P("div", {
            key: x,
            class: "wl-gallery-column",
            "data-index": x,
            style: nn({gap: `${f.gap}px`})
        }, [(I(!0), P(ue, null, je(g, b => (I(), P(ue, {key: b}, [s.value[f.items[b].src] ? Q("v-if", !0) : (I(), lt(G(En), {
            key: 0,
            size: 36,
            style: {margin: "20px auto"}
        })), F("img", {
            class: "wl-gallery-item",
            src: f.items[b].src,
            title: f.items[b].title,
            loading: "lazy",
            onLoad: u,
            onClick: T => f.$emit("insert", `![](${f.items[b].src})`)
        }, null, 40, uh)], 64))), 128))], 12, ch))), 128))], 4))
    }
});
const hh = {key: 0, class: "wl-login-info"}, dh = {class: "wl-avatar"}, ph = ["title"], gh = ["title"], mh = ["src"],
    vh = ["title", "textContent"], bh = {class: "wl-panel"}, yh = ["for", "textContent"],
    wh = ["id", "onUpdate:modelValue", "name", "type"], kh = ["placeholder"], xh = {class: "wl-preview"},
    _h = ["innerHTML"], Ch = {class: "wl-footer"}, Sh = {class: "wl-actions"}, $h = {
        href: "https://guides.github.com/features/mastering-markdown/",
        title: "Markdown Guide",
        "aria-label": "Markdown is supported",
        class: "wl-action",
        target: "_blank",
        rel: "noopener noreferrer"
    }, Rh = ["title"], Ah = ["title"], Eh = ["title", "aria-label"], Th = ["title"], Lh = {class: "wl-info"},
    Ih = {class: "wl-text-number"}, Mh = {key: 0}, Ph = ["textContent"], Oh = ["textContent"], jh = ["disabled"],
    zh = ["placeholder"], Fh = {key: 1, class: "wl-loading"}, Dh = {key: 0, class: "wl-tab-wrapper"},
    Hh = ["title", "onClick"], Uh = ["src", "alt"], Nh = {key: 0, class: "wl-tabs"}, Bh = ["onClick"],
    Vh = ["src", "alt", "title"], Wh = ["title"];
var yo = dn({
    __name: "CommentBox",
    props: {edit: {}, rootId: {}, replyId: {}, replyUser: {}},
    emits: ["log", "cancelEdit", "cancelReply", "submit"],
    setup(e, {emit: t}) {
        const n = e, r = t, s = er(zn), i = Df(), l = Ff(), o = xr(), a = Y({}), c = dt("textarea"),
            u = dt("image-uploader"), f = dt("emoji-button"), p = dt("emoji-popup"), g = dt("gif-button"),
            x = dt("gif-popup"), b = dt("gif-search"), T = Y({tabs: [], map: {}}), k = Y(0), _ = Y(!1), N = Y(!1),
            L = Y(!1), O = Y(""), K = Y(0), j = cn({loading: !0, list: []}), J = Y(0), me = Y(!1), Be = Y(""),
            E = Y(!1), V = Y(!1), D = ge(() => s.value.locale), de = ge(() => !!o.value.token),
            ye = ge(() => au(s.value.imageUploader)), ve = z => {
                const R = c.value, W = R.selectionStart, h = R.selectionEnd || 0, d = R.scrollTop;
                i.value = R.value.substring(0, W) + z + R.value.substring(h, R.value.length), R.focus(), R.selectionStart = W + z.length, R.selectionEnd = W + z.length, R.scrollTop = d
            }, Xe = ({key: z, ctrlKey: R, metaKey: W}) => {
                E.value || (R || W) && z === "Enter" && Fe()
            }, ut = async z => {
                const R = `![${s.value.locale.uploading} ${z.name}]()`;
                ve(R), E.value = !0;
                try {
                    const W = await s.value.imageUploader(z);
                    i.value = i.value.replace(R, `\r
![${z.name}](${W})`)
                } catch (W) {
                    alert(W.message), i.value = i.value.replace(R, "")
                } finally {
                    E.value = !1
                }
            }, Jt = z => {
                var R;
                if ((R = z.dataTransfer) != null && R.items) {
                    const W = Fl(z.dataTransfer.items);
                    W && ye.value && (ut(W), z.preventDefault())
                }
            }, In = z => {
                if (z.clipboardData) {
                    const R = Fl(z.clipboardData.items);
                    R && ye.value && ut(R)
                }
            }, Pt = () => {
                const z = u.value;
                z.files && ye.value && ut(z.files[0]).then(() => {
                    z.value = ""
                })
            }, Fe = async () => {
                var z;
                const {
                    serverURL: R,
                    lang: W,
                    login: h,
                    wordLimit: d,
                    requiredMeta: m,
                    recaptchaV3Key: y,
                    turnstileKey: w
                } = s.value, v = {
                    comment: Be.value,
                    nick: l.value.nick,
                    mail: l.value.mail,
                    link: l.value.link,
                    url: s.value.path,
                    ua: await Rf()
                };
                if (!n.edit) if (o.value.token) v.nick = o.value.display_name, v.mail = o.value.email, v.link = o.value.url; else {
                    if (h === "force") return;
                    if (m.includes("nick") && !v.nick) {
                        a.value.nick.focus(), alert(D.value.nickError);
                        return
                    }
                    if (m.includes("mail") && !v.mail || v.mail && !Ko(v.mail)) {
                        a.value.mail.focus(), alert(D.value.mailError);
                        return
                    }
                    v.nick || (v.nick = D.value.anonymous)
                }
                if (!v.comment) {
                    c.value.focus();
                    return
                }
                if (!me.value) {
                    alert(D.value.wordHint.replace("$0", d[0].toString()).replace("$1", d[1].toString()).replace("$2", K.value.toString()));
                    return
                }
                v.comment = ao(v.comment, T.value.map), n.replyId && n.rootId && (v.pid = n.replyId, v.rid = n.rootId, v.at = n.replyUser), E.value = !0;
                try {
                    y && (v.recaptchaV3 = await Gf(y).execute("social")), w && (v.turnstile = await Zf(w).execute("social"));
                    const A = {serverURL: R, lang: W, token: o.value.token, comment: v},
                        S = await (n.edit ? Qt({objectId: n.edit.objectId, ...A}) : Ts(A));
                    if (E.value = !1, S.errmsg) {
                        alert(S.errmsg);
                        return
                    }
                    r("submit", S.data), i.value = "", O.value = "", await Wt(), n.replyId && r("cancelReply"), (z = n.edit) != null && z.objectId && r("cancelEdit")
                } catch (A) {
                    E.value = !1, alert(A.message)
                }
            }, Mn = z => {
                z.preventDefault();
                const {lang: R, serverURL: W} = s.value;
                Ms({serverURL: W, lang: R}).then(h => {
                    o.value = h, (h.remember ? localStorage : sessionStorage).setItem("WALINE_USER", JSON.stringify(h)), r("log")
                })
            }, _r = () => {
                o.value = {}, localStorage.setItem("WALINE_USER", "null"), sessionStorage.setItem("WALINE_USER", "null"), r("log")
            }, Pn = z => {
                z.preventDefault();
                const {lang: R, serverURL: W} = s.value, h = 800, d = 800, m = (window.innerWidth - h) / 2,
                    y = (window.innerHeight - d) / 2, w = new URLSearchParams({lng: R, token: o.value.token}),
                    v = window.open(`${W}/ui/profile?${w.toString()}`, "_blank", `width=${h},height=${d},left=${m},top=${y},scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no`);
                v == null || v.postMessage({type: "TOKEN", data: o.value.token}, "*")
            }, vt = z => {
                var R, W, h, d;
                !((R = f.value) != null && R.contains(z.target)) && !((W = p.value) != null && W.contains(z.target)) && (_.value = !1), !((h = g.value) != null && h.contains(z.target)) && !((d = x.value) != null && d.contains(z.target)) && (N.value = !1)
            }, bt = async z => {
                var R;
                const {scrollTop: W, clientHeight: h, scrollHeight: d} = z.target, m = (h + W) / d, y = s.value.search,
                    w = ((R = b.value) == null ? void 0 : R.value) ?? "";
                m < .9 || j.loading || V.value || (j.loading = !0, (y.more && j.list.length ? await y.more(w, j.list.length) : await y.search(w)).length ? j.list = [...j.list, ...y.more && j.list.length ? await y.more(w, j.list.length) : await y.search(w)] : V.value = !0, j.loading = !1, setTimeout(() => {
                    z.target.scrollTop = W
                }, 50))
            }, Ot = du(z => {
                j.list = [], V.value = !1, bt(z)
            }, 300);
        return dr("click", vt), dr("message", ({data: z}) => {
            !z || z.type !== "profile" || (o.value = {...o.value, ...z.data}, [localStorage, sessionStorage].filter(R => R.getItem("WALINE_USER")).forEach(R => {
                R.setItem("WALINE_USER", JSON.stringify(o))
            }))
        }), _n([s, K], ([z, R]) => {
            const {wordLimit: W} = z;
            W ? R < W[0] && W[0] !== 0 ? (J.value = W[0], me.value = !1) : R > W[1] ? (J.value = W[1], me.value = !1) : (J.value = W[1], me.value = !0) : (J.value = 0, me.value = !0)
        }), it(N, async z => {
            var R;
            if (!z) return;
            const W = s.value.search;
            b.value && (b.value.value = ""), j.loading = !0, j.list = await (((R = W.default) == null ? void 0 : R.call(W)) ?? W.search("")), j.loading = !1
        }), gn(() => {
            var z;
            (z = n.edit) != null && z.objectId && (i.value = n.edit.orig), _n(() => i.value, R => {
                const {highlighter: W, texRenderer: h} = s.value;
                Be.value = R, O.value = _f(R, {
                    emojiMap: T.value.map,
                    highlighter: W,
                    texRenderer: h
                }), K.value = $f(R), R ? bo(c.value) : bo.destroy(c.value)
            }), _n(() => s.value.emoji, async R => {
                T.value = await Iu(R)
            })
        }), (z, R) => {
            var W, h;
            return I(), P("div", {
                key: G(o).token,
                class: "wl-comment"
            }, [G(s).login !== "disable" && de.value && !((W = z.edit) != null && W.objectId) ? (I(), P("div", hh, [F("div", dh, [F("button", {
                type: "submit",
                class: "wl-logout-btn",
                title: D.value.logout,
                onClick: _r
            }, [oe(G(uo), {size: 14})], 8, ph), F("a", {
                href: "#",
                class: "wl-login-nick",
                "aria-label": "Profile",
                title: D.value.profile,
                onClick: Pn
            }, [F("img", {src: G(o).avatar, alt: "avatar"}, null, 8, mh)], 8, gh)]), F("a", {
                href: "#",
                class: "wl-login-nick",
                "aria-label": "Profile",
                title: D.value.profile,
                onClick: Pn,
                textContent: X(G(o).display_name)
            }, null, 8, vh)])) : Q("v-if", !0), F("div", bh, [G(s).login !== "force" && G(s).meta.length && !de.value ? (I(), P("div", {
                key: 0,
                class: pe(["wl-header", `item${G(s).meta.length}`])
            }, [(I(!0), P(ue, null, je(G(s).meta, d => (I(), P("div", {
                key: d,
                class: "wl-header-item"
            }, [F("label", {
                for: `wl-${d}`,
                textContent: X(D.value[d] + (G(s).requiredMeta.includes(d) || !G(s).requiredMeta.length ? "" : `(${D.value.optional})`))
            }, null, 8, yh), Qn(F("input", {
                id: `wl-${d}`,
                ref_for: !0,
                ref: m => {
                    m && (a.value[d] = m)
                },
                "onUpdate:modelValue": m => G(l)[d] = m,
                class: pe(["wl-input", `wl-${d}`]),
                name: d,
                type: d === "mail" ? "email" : "text"
            }, null, 10, wh), [[tu, G(l)[d]]])]))), 128))], 2)) : Q("v-if", !0), Qn(F("textarea", {
                id: "wl-edit",
                ref: "textarea",
                "onUpdate:modelValue": R[0] || (R[0] = d => we(i) ? i.value = d : null),
                class: "wl-editor",
                placeholder: z.replyUser ? `@${z.replyUser}` : D.value.placeholder,
                onKeydown: Xe,
                onDrop: Jt,
                onPaste: In
            }, null, 40, kh), [[fs, G(i)]]), Qn(F("div", xh, [R[7] || (R[7] = F("hr", null, null, -1)), F("h4", null, X(D.value.preview) + ":", 1), F("div", {
                class: "wl-content",
                innerHTML: O.value
            }, null, 8, _h)], 512), [[gl, L.value]]), F("div", Ch, [F("div", Sh, [F("a", $h, [oe(G(Mf))]), Qn(F("button", {
                ref: "emoji-button",
                type: "button",
                class: pe(["wl-action", {active: _.value}]),
                title: D.value.emoji,
                onClick: R[1] || (R[1] = d => _.value = !_.value)
            }, [oe(G(Ef))], 10, Rh), [[gl, T.value.tabs.length]]), G(s).search ? (I(), P("button", {
                key: 0,
                ref: "gif-button",
                type: "button",
                class: pe(["wl-action", {active: N.value}]),
                title: D.value.gif,
                onClick: R[2] || (R[2] = d => N.value = !N.value)
            }, [oe(G(zf))], 10, Ah)) : Q("v-if", !0), F("input", {
                id: "wl-image-upload",
                ref: "image-uploader",
                class: "upload",
                "aria-hidden": "true",
                type: "file",
                accept: ".png,.jpg,.jpeg,.webp,.bmp,.gif",
                onChange: Pt
            }, null, 544), ye.value ? (I(), P("label", {
                key: 1,
                for: "wl-image-upload",
                class: "wl-action",
                title: D.value.uploadImage,
                "aria-label": D.value.uploadImage
            }, [oe(G(Tf))], 8, Eh)) : Q("v-if", !0), F("button", {
                type: "button",
                class: pe(["wl-action", {active: L.value}]),
                title: D.value.preview,
                onClick: R[3] || (R[3] = d => L.value = !L.value)
            }, [oe(G(If))], 10, Th)]), F("div", Lh, [R[9] || (R[9] = F("div", {class: "wl-captcha-container"}, null, -1)), F("div", Ih, [ot(X(K.value) + " ", 1), G(s).wordLimit ? (I(), P("span", Mh, [R[8] || (R[8] = ot("  /  ")), F("span", {
                class: pe({illegal: !me.value}),
                textContent: X(J.value)
            }, null, 10, Ph)])) : Q("v-if", !0), ot("  " + X(D.value.word), 1)]), G(s).login !== "disable" && !de.value ? (I(), P("button", {
                key: 0,
                type: "button",
                class: "wl-btn",
                onClick: Mn,
                textContent: X(D.value.login)
            }, null, 8, Oh)) : Q("v-if", !0), G(s).login !== "force" || de.value ? (I(), P("button", {
                key: 1,
                type: "submit",
                class: "primary wl-btn",
                title: "Cmd|Ctrl + Enter",
                disabled: E.value,
                onClick: Fe
            }, [E.value ? (I(), lt(G(En), {
                key: 0,
                size: 16
            })) : (I(), P(ue, {key: 1}, [ot(X(D.value.submit), 1)], 64))], 8, jh)) : Q("v-if", !0)]), F("div", {
                ref: "gif-popup",
                class: pe(["wl-gif-popup", {display: N.value}])
            }, [F("input", {
                ref: "gif-search",
                type: "text",
                placeholder: D.value.gifSearchPlaceholder,
                onInput: R[4] || (R[4] = (...d) => G(Ot) && G(Ot)(...d))
            }, null, 40, zh), j.list.length ? (I(), lt(fh, {
                key: 0,
                items: j.list,
                "column-width": 200,
                gap: 6,
                onInsert: R[5] || (R[5] = d => ve(d)),
                onScroll: bt
            }, null, 8, ["items"])) : Q("v-if", !0), j.loading ? (I(), P("div", Fh, [oe(G(En), {size: 30})])) : Q("v-if", !0)], 2), F("div", {
                ref: "emoji-popup",
                class: pe(["wl-emoji-popup", {display: _.value}])
            }, [(I(!0), P(ue, null, je(T.value.tabs, (d, m) => (I(), P(ue, {key: d.name}, [m === k.value ? (I(), P("div", Dh, [(I(!0), P(ue, null, je(d.items, y => (I(), P("button", {
                key: y,
                type: "button",
                title: y,
                onClick: w => ve(`:${y}:`)
            }, [_.value ? (I(), P("img", {
                key: 0,
                class: "wl-emoji",
                src: T.value.map[y],
                alt: y,
                loading: "lazy",
                referrerPolicy: "no-referrer"
            }, null, 8, Uh)) : Q("v-if", !0)], 8, Hh))), 128))])) : Q("v-if", !0)], 64))), 128)), T.value.tabs.length > 1 ? (I(), P("div", Nh, [(I(!0), P(ue, null, je(T.value.tabs, (d, m) => (I(), P("button", {
                key: d.name,
                type: "button",
                class: pe(["wl-tab", {active: k.value === m}]),
                onClick: y => k.value = m
            }, [F("img", {
                class: "wl-emoji",
                src: d.icon,
                alt: d.name,
                title: d.name,
                loading: "lazy",
                referrerPolicy: "no-referrer"
            }, null, 8, Vh)], 10, Bh))), 128))])) : Q("v-if", !0)], 2)])]), z.replyId || (h = z.edit) != null && h.objectId ? (I(), P("button", {
                key: 1,
                type: "button",
                class: "wl-close",
                title: D.value.cancelReply,
                onClick: R[6] || (R[6] = d => z.replyId ? r("cancelReply") : r("cancelEdit"))
            }, [oe(G(uo), {size: 24})], 8, Wh)) : Q("v-if", !0)])
        }
    }
});
const qh = ["id"], Kh = {class: "wl-user", "aria-hidden": "true"}, Gh = ["src"], Zh = {class: "wl-card"},
    Jh = {class: "wl-head"}, Yh = ["href"], Qh = {key: 1, class: "wl-nick"}, Xh = ["textContent"], ed = ["textContent"],
    td = ["textContent"], nd = ["textContent"], rd = ["textContent"], sd = {class: "wl-comment-actions"},
    id = ["title"], ld = ["title"], od = {class: "wl-meta", "aria-hidden": "true"}, ad = ["data-value", "textContent"],
    cd = {key: 0, class: "wl-content"}, ud = {key: 0}, fd = ["href"], hd = ["innerHTML"],
    dd = {key: 1, class: "wl-admin-actions"}, pd = {class: "wl-comment-status"},
    gd = ["disabled", "onClick", "textContent"], md = {key: 3, class: "wl-quote"};
var vd = dn({
    __name: "CommentCard",
    props: {comment: {}, edit: {default: null}, rootId: {}, reply: {default: null}},
    emits: ["log", "submit", "delete", "like", "sticky", "edit", "reply", "status"],
    setup(e, {emit: t}) {
        const n = e, r = t, s = ["approved", "waiting", "spam"], i = er(zn), l = fo(), o = Su(), a = xr(),
            c = ge(() => i.value.locale), u = ge(() => {
                const {link: k} = n.comment;
                return k ? ei(k) ? k : `https://${k}` : ""
            }), f = ge(() => l.value.includes(n.comment.objectId)),
            p = ge(() => Wo(new Date(n.comment.time), o.value, c.value)),
            g = ge(() => a.value.type === "administrator"),
            x = ge(() => n.comment.user_id && a.value.objectId === n.comment.user_id), b = ge(() => {
                var k;
                return n.comment.objectId === ((k = n.reply) == null ? void 0 : k.objectId)
            }), T = ge(() => {
                var k;
                return n.comment.objectId === ((k = n.edit) == null ? void 0 : k.objectId)
            });
        return (k, _) => {
            var N;
            const L = Wa("CommentCard", !0);
            return I(), P("div", {
                id: k.comment.objectId.toString(),
                class: "wl-card-item"
            }, [F("div", Kh, [k.comment.avatar ? (I(), P("img", {
                key: 0,
                class: "wl-user-avatar",
                src: k.comment.avatar,
                alt: ""
            }, null, 8, Gh)) : Q("v-if", !0), k.comment.type ? (I(), lt(G(jf), {key: 1})) : Q("v-if", !0)]), F("div", Zh, [F("div", Jh, [u.value ? (I(), P("a", {
                key: 0,
                class: "wl-nick",
                href: u.value,
                rel: "nofollow noopener noreferrer"
            }, X(k.comment.nick), 9, Yh)) : (I(), P("span", Qh, X(k.comment.nick), 1)), k.comment.type === "administrator" ? (I(), P("span", {
                key: 2,
                class: "wl-badge",
                textContent: X(c.value.admin)
            }, null, 8, Xh)) : Q("v-if", !0), k.comment.label ? (I(), P("span", {
                key: 3,
                class: "wl-badge",
                textContent: X(k.comment.label)
            }, null, 8, ed)) : Q("v-if", !0), k.comment.sticky ? (I(), P("span", {
                key: 4,
                class: "wl-badge",
                textContent: X(c.value.sticky)
            }, null, 8, td)) : Q("v-if", !0), typeof k.comment.level == "number" ? (I(), P("span", {
                key: 5,
                class: pe(`wl-badge level${k.comment.level}`),
                textContent: X(c.value[`level${k.comment.level}`] || `Level ${k.comment.level}`)
            }, null, 10, nd)) : Q("v-if", !0), F("span", {
                class: "wl-time",
                textContent: X(p.value)
            }, null, 8, rd), F("div", sd, [g.value || x.value ? (I(), P(ue, {key: 0}, [F("button", {
                type: "button",
                class: "wl-edit",
                onClick: _[0] || (_[0] = O => r("edit", k.comment))
            }, [oe(G(Of))]), F("button", {
                type: "button",
                class: "wl-delete",
                onClick: _[1] || (_[1] = O => r("delete", k.comment))
            }, [oe(G(Af))])], 64)) : Q("v-if", !0), F("button", {
                type: "button",
                class: "wl-like",
                title: f.value ? c.value.cancelLike : c.value.like,
                onClick: _[2] || (_[2] = O => r("like", k.comment))
            }, [oe(G(Lf), {active: f.value}, null, 8, ["active"]), ot(" " + X("like" in k.comment ? k.comment.like : ""), 1)], 8, id), F("button", {
                type: "button",
                class: pe(["wl-reply", {active: b.value}]),
                title: b.value ? c.value.cancelReply : c.value.reply,
                onClick: _[3] || (_[3] = O => r("reply", b.value ? null : k.comment))
            }, [oe(G(Pf))], 10, ld)])]), F("div", od, [(I(), P(ue, null, je(["addr", "browser", "os"], O => (I(), P(ue, null, [k.comment[O] ? (I(), P("span", {
                key: O,
                class: pe(`wl-${O}`),
                "data-value": k.comment[O],
                textContent: X(k.comment[O])
            }, null, 10, ad)) : Q("v-if", !0)], 64))), 64))]), T.value ? Q("v-if", !0) : (I(), P("div", cd, ["reply_user" in k.comment && k.comment.reply_user ? (I(), P("p", ud, [F("a", {href: "#" + k.comment.pid}, "@" + X(k.comment.reply_user.nick), 9, fd), _[17] || (_[17] = F("span", null, ": ", -1))])) : Q("v-if", !0), F("div", {innerHTML: k.comment.comment}, null, 8, hd)])), g.value && !T.value ? (I(), P("div", dd, [F("span", pd, [(I(), P(ue, null, je(s, O => F("button", {
                key: O,
                type: "submit",
                class: pe(`wl-btn wl-${O}`),
                disabled: k.comment.status === O,
                onClick: K => r("status", {status: O, comment: k.comment}),
                textContent: X(c.value[O])
            }, null, 10, gd)), 64))]), g.value && !("rid" in k.comment) ? (I(), P("button", {
                key: 0,
                type: "submit",
                class: "wl-btn wl-sticky",
                onClick: _[4] || (_[4] = O => r("sticky", k.comment))
            }, X(k.comment.sticky ? c.value.unsticky : c.value.sticky), 1)) : Q("v-if", !0)])) : Q("v-if", !0), b.value || T.value ? (I(), P("div", {
                key: 2,
                class: pe({"wl-reply-wrapper": b.value, "wl-edit-wrapper": T.value})
            }, [oe(yo, {
                edit: k.edit,
                "reply-id": (N = k.reply) == null ? void 0 : N.objectId,
                "reply-user": k.comment.nick,
                "root-id": k.rootId,
                onLog: _[5] || (_[5] = O => r("log")),
                onCancelReply: _[6] || (_[6] = O => r("reply", null)),
                onCancelEdit: _[7] || (_[7] = O => r("edit", null)),
                onSubmit: _[8] || (_[8] = O => r("submit", O))
            }, null, 8, ["edit", "reply-id", "reply-user", "root-id"])], 2)) : Q("v-if", !0), "children" in k.comment ? (I(), P("div", md, [(I(!0), P(ue, null, je(k.comment.children, O => (I(), lt(L, {
                key: O.objectId,
                comment: O,
                reply: k.reply,
                edit: k.edit,
                "root-id": k.rootId,
                onLog: _[9] || (_[9] = K => r("log")),
                onDelete: _[10] || (_[10] = K => r("delete", K)),
                onEdit: _[11] || (_[11] = K => r("edit", K)),
                onLike: _[12] || (_[12] = K => r("like", K)),
                onReply: _[13] || (_[13] = K => r("reply", K)),
                onStatus: _[14] || (_[14] = K => r("status", K)),
                onSticky: _[15] || (_[15] = K => r("sticky", K)),
                onSubmit: _[16] || (_[16] = K => r("submit", K))
            }, null, 8, ["comment", "reply", "edit", "root-id"]))), 128))])) : Q("v-if", !0)])], 8, qh)
        }
    }
});
const wo = "3.5.1", bd = {"data-waline": ""}, yd = {class: "wl-meta-head"}, wd = {class: "wl-count"},
    kd = ["textContent"], xd = {class: "wl-sort"}, _d = ["onClick"], Cd = {class: "wl-cards"},
    Sd = {key: 1, class: "wl-operation"}, $d = ["textContent"], Rd = {key: 2, class: "wl-loading"},
    Ad = ["textContent"], Ed = {key: 4, class: "wl-operation"}, Td = ["textContent"], Ld = {key: 5, class: "wl-power"};
var Id = dn({
    __name: "WalineComment",
    props: {
        serverURL: {},
        path: {},
        meta: {},
        requiredMeta: {},
        wordLimit: {},
        pageSize: {},
        lang: {},
        locale: {},
        commentSorting: {},
        dark: {type: [String, Boolean]},
        login: {},
        noCopyright: {type: Boolean},
        recaptchaV3Key: {},
        turnstileKey: {},
        reaction: {},
        emoji: {},
        search: {},
        highlighter: {type: Function},
        imageUploader: {type: Function},
        texRenderer: {type: Function}
    },
    setup(e) {
        const t = e, n = xr(), r = fo(), s = Y("loading"), i = Y(0), l = Y(1), o = Y(0), a = ge(() => No(t)),
            c = Y(a.value.commentSorting), u = Y([]), f = Y(null), p = Y(null), g = ge(() => Bo(a.value.dark)),
            x = ge(() => a.value.locale);
        Au(g, {id: "waline-darkmode"});
        let b = null;
        const T = E => {
            const {serverURL: V, path: D, pageSize: de} = a.value, ye = new AbortController;
            s.value = "loading", b == null || b(), Es({
                serverURL: V,
                lang: a.value.lang,
                path: D,
                pageSize: de,
                sortBy: Ys[c.value],
                page: E,
                signal: ye.signal,
                token: n.value.token
            }).then(ve => {
                s.value = "success", i.value = ve.count, u.value.push(...ve.data), l.value = E, o.value = ve.totalPages
            }).catch(ve => {
                ve.name !== "AbortError" && (console.error(ve.message), s.value = "error")
            }), b = ye.abort.bind(ye)
        }, k = () => {
            T(l.value + 1)
        }, _ = () => {
            i.value = 0, u.value = [], T(1)
        }, N = E => {
            c.value !== E && (c.value = E, _())
        }, L = E => {
            f.value = E
        }, O = E => {
            p.value = E
        }, K = E => {
            if (p.value) p.value.comment = E.comment, p.value.orig = E.orig; else if ("rid" in E) {
                const V = u.value.find(({objectId: D}) => D === E.rid);
                if (!V) return;
                Array.isArray(V.children) || (V.children = []), V.children.push(E)
            } else u.value.unshift(E), i.value += 1
        }, j = async ({comment: E, status: V}) => {
            if (E.status === V) return;
            const {serverURL: D, lang: de} = a.value;
            await Qt({
                serverURL: D,
                lang: de,
                token: n.value.token,
                objectId: E.objectId,
                comment: {status: V}
            }), E.status = V
        }, J = async E => {
            if ("rid" in E) return;
            const {serverURL: V, lang: D} = a.value;
            await Qt({
                serverURL: V,
                lang: D,
                token: n.value.token,
                objectId: E.objectId,
                comment: {sticky: E.sticky ? 0 : 1}
            }), E.sticky = !E.sticky
        }, me = async ({objectId: E}) => {
            if (!confirm("Are you sure you want to delete this comment?")) return;
            const {serverURL: V, lang: D} = a.value;
            await Ls({
                serverURL: V,
                lang: D,
                token: n.value.token,
                objectId: E
            }), u.value.some((de, ye) => de.objectId === E ? (u.value = u.value.filter((ve, Xe) => Xe !== ye), !0) : de.children.some((ve, Xe) => ve.objectId === E ? (u.value[ye].children = de.children.filter((ut, Jt) => Jt !== Xe), !0) : !1))
        }, Be = async E => {
            const {serverURL: V, lang: D} = a.value, {objectId: de} = E, ye = r.value.includes(de);
            await Qt({
                serverURL: V,
                lang: D,
                objectId: de,
                token: n.value.token,
                comment: {like: !ye}
            }), ye ? r.value = r.value.filter(ve => ve !== de) : (r.value = [...r.value, de], r.value.length > 50 && (r.value = r.value.slice(-50))), E.like = Math.max(0, (E.like || 0) + (ye ? -1 : 1))
        };
        return Ya(zn, a), gn(() => {
            _n(() => [t.serverURL, t.path], () => {
                _()
            })
        }), Qr(() => {
            b == null || b()
        }), (E, V) => (I(), P("div", bd, [oe(lh), !f.value && !p.value ? (I(), lt(yo, {
            key: 0,
            onLog: _,
            onSubmit: K
        })) : Q("v-if", !0), F("div", yd, [F("div", wd, [i.value ? (I(), P("span", {
            key: 0,
            class: "wl-num",
            textContent: X(i.value)
        }, null, 8, kd)) : Q("v-if", !0), ot(" " + X(x.value.comment), 1)]), F("ul", xd, [(I(!0), P(ue, null, je(G(Ho), D => (I(), P("li", {
            key: D,
            class: pe([D === c.value ? "active" : ""]),
            onClick: de => N(D)
        }, X(x.value[D]), 11, _d))), 128))])]), F("div", Cd, [(I(!0), P(ue, null, je(u.value, D => (I(), lt(vd, {
            key: D.objectId,
            "root-id": D.objectId,
            comment: D,
            reply: f.value,
            edit: p.value,
            onLog: _,
            onReply: L,
            onEdit: O,
            onSubmit: K,
            onStatus: j,
            onDelete: me,
            onSticky: J,
            onLike: Be
        }, null, 8, ["root-id", "comment", "reply", "edit"]))), 128))]), s.value === "error" ? (I(), P("div", Sd, [F("button", {
            type: "button",
            class: "wl-btn",
            onClick: _,
            textContent: X(x.value.refresh)
        }, null, 8, $d)])) : s.value === "loading" ? (I(), P("div", Rd, [oe(G(En), {size: 30})])) : u.value.length ? l.value < o.value ? (I(), P("div", Ed, [F("button", {
            type: "button",
            class: "wl-btn",
            onClick: k,
            textContent: X(x.value.more)
        }, null, 8, Td)])) : Q("v-if", !0) : (I(), P("div", {
            key: 3,
            class: "wl-empty",
            textContent: X(x.value.sofa)
        }, null, 8, Ad)), a.value.noCopyright ? Q("v-if", !0) : (I(), P("div", Ld, [V[0] || (V[0] = ot(" 梔锿-iyutong-雨桐 "))]))]))
    }
});
const ko = (e, t) => {
    t.forEach((n, r) => {
        const s = e[r].time;
        typeof s == "number" && (n.innerText = s.toString())
    })
}, xo = ({
             serverURL: e,
             path: t = window.location.pathname,
             selector: n = ".waline-pageview-count",
             update: r = !0,
             lang: s = navigator.language
         }) => {
    const i = new AbortController, l = Array.from(document.querySelectorAll(n)), o = c => {
        const u = _s(c);
        return u !== null && t !== u
    }, a = c => Ps({
        serverURL: Fn(e),
        paths: c.map(u => _s(u) ?? t),
        lang: s,
        signal: i.signal
    }).then(u => ko(u, c)).catch(zl);
    if (r) {
        const c = l.filter(f => !o(f)), u = l.filter(o);
        Os({serverURL: Fn(e), path: t, lang: s}).then(f => ko(f, c)), u.length && a(u)
    } else a(l);
    return i.abort.bind(i)
}, Md = ({el: e = "#waline", path: t = window.location.pathname, comment: n = !1, pageview: r = !1, ...s}) => {
    const i = e ? ds(e) : null;
    if (e && !i) throw new Error("Option 'el' do not match any domElement!");
    if (!s.serverURL) throw new Error("Option 'serverURL' is missing!");
    const l = cn({...s}), o = cn({comment: n, pageview: r, path: t}), a = () => {
        o.comment && co({serverURL: l.serverURL, path: o.path, ...zt(o.comment) ? {selector: o.comment} : {}})
    }, c = () => {
        o.pageview && xo({serverURL: l.serverURL, path: o.path, ...zt(o.pageview) ? {selector: o.pageview} : {}})
    };
    let u = null;
    i && (u = iu(() => ne(Id, {path: o.path, ...l})), u.mount(i));
    const f = Yi(a), p = Yi(c);
    return {
        el: i, update: ({comment: g, pageview: x, path: b = window.location.pathname, ...T} = {}) => {
            Object.entries(T).forEach(([k, _]) => {
                l[k] = _
            }), o.path = b, g !== void 0 && (o.comment = g), x !== void 0 && (o.pageview = x)
        }, destroy: () => {
            u == null || u.unmount(), f(), p()
        }
    }
}, Pd = ({el: e, serverURL: t, count: n, lang: r = navigator.language}) => {
    const s = xr(), i = ds(e), l = new AbortController;
    return js({
        serverURL: t,
        count: n,
        lang: r,
        signal: l.signal,
        token: s.value.token
    }).then(o => i && o.length ? (i.innerHTML = `<ul class="wl-recent-list">${o.map(a => `<li class="wl-recent-item"><a href="${a.url}">${a.nick}</a>：${a.comment}</li>`).join("")}</ul>`, {
        comments: o,
        destroy: () => {
            l.abort(), i.innerHTML = ""
        }
    }) : {comments: o, destroy: () => l.abort()})
}, Od = ({el: e, serverURL: t, count: n, locale: r, lang: s = navigator.language, mode: i = "list"}) => {
    const l = ds(e), o = new AbortController;
    return zs({serverURL: t, pageSize: n, lang: s, signal: o.signal}).then(a => !l || !a.length ? {
        users: a,
        destroy: () => o.abort()
    } : (r = {...Zs(s), ...typeof r == "object" ? r : {}}, l.innerHTML = `<ul class="wl-user-${i}">${a.map((c, u) => [`<li class="wl-user-item" aria-label="${c.nick}">`, c.link && `<a href="${c.link}" target="_blank">`, '<div class="wl-user-avatar">', `<img src="${c.avatar}" alt="${c.nick}">`, `<span class="wl-user-badge">${u + 1}</span>`, "</div>", '<div class="wl-user-meta">', '<div class="wl-user-name">', c.nick, c.level && `<span class="wl-badge">${r ? r[`level${c.level}`] : `Level ${c.level}`}</span>`, c.label && `<span class="wl-badge">${c.label}</span>`, "</div>", c.link && c.link, "</div>", c.link && "</a>", "</li>"].filter(f => f).join("")).join("")}</ul>`, {
        users: a,
        destroy: () => {
            o.abort(), l.innerHTML = ""
        }
    }))
};
export {
    Pd as RecentComments,
    Od as UserList,
    Ts as addComment,
    co as commentCount,
    jn as defaultLocales,
    Ls as deleteComment,
    Is as fetchCommentCount,
    Cr as getArticleCounter,
    Es as getComment,
    Ps as getPageview,
    js as getRecentComment,
    zs as getUserList,
    Md as init,
    Ms as login,
    xo as pageviewCount,
    On as updateArticleCounter,
    Qt as updateComment,
    Os as updatePageview,
    wo as version
};
//# sourceMappingURL=waline.js.map
