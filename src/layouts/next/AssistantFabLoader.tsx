"use client"

import dynamic from "next/dynamic"

// Keep the interactive assistant out of the server-rendered layout.
const AssistantFab = dynamic(() => import("./AssistantFabNext"), { ssr: false })

const AssistantFabLoader = () => <AssistantFab />

export default AssistantFabLoader
