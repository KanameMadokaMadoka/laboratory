client是前端 server是後端

在client底下

App.js(網頁前端集合點)

Siderbar.js(側邊欄元件) Submenu資料夾(放側邊欄的菜單元件) oneandone(第一欄第一個標題) oneandtwo(第一欄第二個標題) twoandone(第二欄第一個標題) 以此類頹 Topside.js(頂部欄元件)

App.js: HOOK有兩個 控制SideBar的開關 Const [state,setState] = useState(true); 控制側邊欄位的功能內容(oneandone.js) Const [content,setContent]=useState(0);

透過props傳遞Hook方法 來讓App下面的元件可以變動 App的Hook值 牽動要顯示的內容

前端使用axios跟後端node.js的express做溝通 資料庫使用 Mysql