
import { initTRPC } from '@trpc/server';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import 'dotenv/config';
import cors from 'cors';
import superjson from 'superjson';

// Import schemas and handlers
import { calculatorInputSchema } from './schema';
import { calculate } from './handlers/calculate';
import { add } from './handlers/add';
import { subtract } from './handlers/subtract';
import { multiply } from './handlers/multiply';
import { divide } from './handlers/divide';

const t = initTRPC.create({
  transformer: superjson,
});

const publicProcedure = t.procedure;
const router = t.router;

const appRouter = router({
  healthcheck: publicProcedure.query(() => {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }),
  
  // Main calculate endpoint that handles all operations
  calculate: publicProcedure
    .input(calculatorInputSchema)
    .mutation(({ input }) => calculate(input)),
    
  // Individual operation endpoints for direct access
  add: publicProcedure
    .input(calculatorInputSchema)
    .mutation(({ input }) => add(input)),
    
  subtract: publicProcedure
    .input(calculatorInputSchema)
    .mutation(({ input }) => subtract(input)),
    
  multiply: publicProcedure
    .input(calculatorInputSchema)
    .mutation(({ input }) => multiply(input)),
    
  divide: publicProcedure
    .input(calculatorInputSchema)
    .mutation(({ input }) => divide(input)),
});

export type AppRouter = typeof appRouter;

async function start() {
  const port = process.env['SERVER_PORT'] || 2022;
  const server = createHTTPServer({
    middleware: (req, res, next) => {
      cors()(req, res, next);
    },
    router: appRouter,
    createContext() {
      return {};
    },
  });
  server.listen(port);
  console.log(`Calculator TRPC server listening at port: ${port}`);
}

start();
