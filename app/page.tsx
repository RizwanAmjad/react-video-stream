"use client"

import { Director, Publish } from "@millicast/sdk"
import { useEffect } from "react"

export default function Home() {
  useEffect(() => {
    ;(async () => {
      const tokenGenerator = () =>
        Director.getPublisher({
          token: process.env.TOKEN || "",
          streamName: process.env.NAME || "",
        })
      const publisher = new Publish("myStreamName", tokenGenerator)

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      })

      // Publishing Options
      const broadcastOptions = {
        mediaStream: mediaStream,
      }

      // Start broadcast
      try {
        await publisher.connect(broadcastOptions)
      } catch (e) {
        console.error("Connection failed, handle error", e)
      }
    })()
  }, [])

  return "NextJS"
}
