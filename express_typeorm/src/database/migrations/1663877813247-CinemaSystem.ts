import {Table,
  TableForeignKey, MigrationInterface, QueryRunner } from 'typeorm';
import {
  addYears,
  format,
  subYears,
  setMonth,
  setDate,
  setHours,
} from 'date-fns';

export class CinemaSystem1663877813247 implements MigrationInterface {
  /**
   # ToDo: Create a migration that creates all tables for the following user stories

   For an example on how a UI for an api using this might look like, please try to book a show at https://in.bookmyshow.com/.
   To not introduce additional complexity, please consider only one cinema.

   Please list the tables that you would create including keys, foreign keys and attributes that are required by the user stories.

   ## User Stories

   **Movie exploration**
   * As a user I want to see which films can be watched and at what times
   * As a user I want to only see the shows which are not booked out

   **Show administration**
   * As a cinema owner I want to run different films at different times
   * As a cinema owner I want to run multiple films at the same time in different showrooms

   **Pricing**
   * As a cinema owner I want to get paid differently per show
   * As a cinema owner I want to give different seat types a percentage premium, for example 50 % more for vip seat

   **Seating**
   * As a user I want to book a seat
   * As a user I want to book a vip seat/couple seat/super vip/whatever
   * As a user I want to see which seats are still available
   * As a user I want to know where I'm sitting on my ticket
   * As a cinema owner I dont want to configure the seating for every show
   */
  public async up(queryRunner: QueryRunner): Promise<void> {
    // throw new Error('TODO: implement migration in task 4');
    await queryRunner.createTable(
      new Table({
        name: 'Moviess',
        columns: [
          {
            name: 'id',
            isPrimary: true,
            type: 'integer',
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'title', type: 'varchar' },
          { name: 'synopsis', type: 'varchar' },
          { name: 'genre', type: 'varchar' },
          { name: 'language', type: 'varchar' },
          { name: 'rating', type: 'integer' },
          { name: 'runtime', type: 'integer' },
          {
            name: 'release_date',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );

   

    await queryRunner.createTable(
      new Table({
        name: 'show_times',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'movie_id', type: 'varchar' },
          {
            name: 'start_time',
            type: 'timestamp',
          },
          {
            name: 'end_time',
            type: 'timestamp',
          },
          { name: 'showroom', type: 'varchar' },
          { name: 'available_seats', type: 'integer' },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'show_times',
      new TableForeignKey({
        columnNames: ['movies_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Movies',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'showrooms',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'name', type: 'varchar' },
          { name: 'capacity', type: 'integer' },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );


    await queryRunner.createTable(
      new Table({
        name: 'Seat_types',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'name', type: 'varchar' },
          { name: 'premium', type: 'varchar' },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'Seats',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'showroom', type: 'varchar' },
          { name: 'seat_type_id', type: 'integer' },
          { name: 'row', type: 'integer' },
          { name: 'number', type: 'integer' },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'showroom_id',
      new TableForeignKey({
        columnNames: ['showroom_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Seats',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'seat_id',
      new TableForeignKey({
        columnNames: ['seat_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Seats',
        onDelete: 'CASCADE',
      }),
    );


    await queryRunner.createTable(
      new Table({
        name: 'Tickets',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'showtime_id', type: 'integer' },
          { name: 'seat_id', type: 'integer' },
          { name: 'seat_type_id', type: 'integer' },
          { name: 'price', type: 'integer' },
          { name: 'booking_time', type: 'timestamp' },
          { name: 'is_booked', type: 'boolean' },
        ],
      }),
    );


    await queryRunner.createTable(
      new Table({
        name: 'Prices',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'showtime_id', type: 'integer' },
          { name: 'seat_type_id', type: 'integer' },
          { name: 'price', type: 'integer' },
        ],
      }),
    );
    
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
