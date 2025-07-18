'use client'

import { FormEvent, useEffect, useState } from 'react'
// Import Admin SDK
import { getDatabase, onChildAdded, push, ref } from '@firebase/database'
import { FirebaseError } from '@firebase/util'
import { NextPage } from 'next'
import { database } from '@/lib/firebase/firebase'
import Message from '@/components/chat/message'

const ChatPage: NextPage = () => {
  const [message, setMessage] = useState<string>('')
  const [chatLogs, setChatLogs] = useState<{ message: string; createdAt: string }[]>([])

  const handleSendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      // databaseを参照して取得する
      const db = database
      // 取得したdatabaseを紐付けるref(db, 'path')
      const dbRef = ref(db, 'chat')
      // pushはデータを書き込む際にユニークキーを自動で生成する
      // 今回はpush() で生成されたユニークキーを取得する
      // messageというキーに値(message)を保存する
      await push(dbRef, {
        message,
      })
      // 書き込みが成功した際はformの値をリセットする
      setMessage('')
    } catch (e) {
      if (e instanceof FirebaseError) {
        console.log(e)
      }
    }
  }

  useEffect(() => {
    try {
      // Get a database reference to our posts
      const db = getDatabase()
      const dbRef = ref(db, 'chat')
      // onChildAddedでデータの取得、監視を行う
      // onChildAddedはqueryとcallbackを引数に取り、Unsubscribeを返して、変更状態をsubscribeする関数
      return onChildAdded(dbRef, (snapshot) => {
        // Attach an asynchronous callback to read the data at our posts reference
        // データベースからのデータはsnapshotで取得する
        // snapshot.val()でany型の値を返す
        const message = String(snapshot.val()['message'] ?? '')
        setChatLogs((prev) => [...prev, { message, createdAt: new Date().toLocaleDateString() }])
      })
    } catch (e) {
      if (e instanceof FirebaseError) {
        console.error(e)
      }
      // unsubscribeする
      return
    }
  }, [])

  return (
    <>
      <h1>チャット</h1>
      {chatLogs.map((chat, index) => (
        <Message key={`ChatMessage_${index}`} message={chat.message} />
      ))}
      <form onSubmit={handleSendMessage}>
        <input value={message} onChange={(e) => setMessage(e.target.value)} />
        <button type={'submit'}>送信</button>
      </form>
    </>
  )
}
export default ChatPage
