import 'reflect-metadata'
import { Resp } from "@/server-lib/rest/response";
import { CandidateController } from "@/server/candidate/candidate.controller";
import { connect } from '@/server/@shared/repository/connect-db';

export async function GET(request: Request) {
    await connect()
    return CandidateController
        .make()
        .list(request, Resp.status(200))
}

export async function POST(request: Request) {
    await connect()
    return CandidateController
        .make()
        .create(request, Resp.status(201))
}