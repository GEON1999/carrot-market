import { NextApiRequest, NextApiResponse } from "next";
import withHandler from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import upload from "@libs/server/s3Multer";

export const config = {
    api: {
        bodyParser: false, // Multer가 파일 데이터를 처리할 수 있도록 bodyParser를 비활성화합니다.
    },
};

async function handler(req: any, res: NextApiResponse) {
    try {
        const file = req.file;
        const location =process.env.S3_DOMAIN + file.key;
        if (!file) {
            return res.status(400).json({ ok: false, error: "No file uploaded" });
        }

        // 업로드된 파일 정보 응답
        res.json({
            ok: true,
            id: location,
            key: file.key,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, error: "Upload failed" });
    }
}

// Multer 미들웨어를 handler에 통합
export default withApiSession(
    withHandler({
        methods: ["POST"],
        handler: async (req: any, res: NextApiResponse) => {
            await new Promise((resolve, reject) => {
                upload.single("file")(req, res, (err: any) => {
                    console.log("upload.single", req.file);
                    if (err) return reject(err);
                    resolve(null);
                });
            });

            // 실제 핸들러 호출
            await handler(req, res);
        },
    })
);
