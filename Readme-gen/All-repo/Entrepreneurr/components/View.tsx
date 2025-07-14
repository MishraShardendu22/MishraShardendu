import { client } from '@/sanity/lib/client'
import React from 'react'
import { writeClient } from "@/sanity/lib/write-client";
import { STARTUP_VIEWS_QUERY } from '@/sanity/lib/queries';

const View = async ({id} : {id : string}) => {
    const result = await client.withConfig({useCdn : false}).fetch(STARTUP_VIEWS_QUERY, {id});
    const views = result?.views ?? 0;

    const vwInc = async () => (
        await writeClient.patch(id).set({views : views + 1}).commit()
    )

    vwInc();
    return (
      <div>
        <h1>Views: {views}</h1>
      </div>
    )
}

export default View