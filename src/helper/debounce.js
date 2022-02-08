/* 
debounce 是在 delay 時間內如果重新觸發會取消前一次並保留當下觸發的執行。
*/

export function debounce(func, delay = 500) {
  let timer = null

  return function () {
    const context = this
    const args = arguments

    clearTimeout(timer)

    timer = setTimeout(function () {
      func.apply(context, args)
    }, delay)
  }
}

/* 
使用 Event Loop 結合實際操作範例敘述 Debounce 的運作方式：

這邊將 debounce 運用在填完帳號密碼後的 submit 按鈕上，避免使用者在短時間內點擊多次造成畫面效能的阻礙。
當使用者點擊按鈕時會觸發 handleSubmit，然後裡面的函式 debounce 會被 push 到 call stack 的上方執行，然後 return 後一一的被抽離，
當執行到 setTimeout 時因為屬於 Web APIs 的範圍所以會同步執行並等到滿足了 delay 秒數後，才被丟到 callback queue 的區塊，
透過 event loop 的監控，當 call back 裡清空時，才會執行 callback queue 中依先進先出排序的任務，
因此如果使用者在 delay 秒數內連續點擊，將會一直觸發 debounce 和裡面的 clearTimeout，使傳進來的函式將被取消不被排入 callback queue 執行，
達到阻擋過度頻繁發送或打 api 的問題。
*/
