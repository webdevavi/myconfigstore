import { NextPage } from "next"
import { NextSeoProps } from "next-seo"

export type NextPageWithSEO<P = {}, IP = P> = NextPage<P, IP> & { seo?: NextSeoProps }
