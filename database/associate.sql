CREATE INDEX "restaurants_id_idx" ON "public"."restaurants"("id");
CREATE INDEX "availibilities_restaurant_id_idx" ON "public"."availibilities"("restaurant_id");
CREATE INDEX "availibilities_time_id_idx" ON "public"."availibilities"("time_id");
