import { join } from "path";
import { app } from "electron";
import { Sequelize, DataTypes, Model, HasManyGetAssociationsMixin } from "sequelize";

export const dbPath = getDbPath();
console.log("Using database:", dbPath);

const db = new Sequelize({
    dialect: "sqlite",
    storage: dbPath,
});
  
export class Category extends Model {
    id!: number;
    title!: string;
    color!: string;
    getLinks!: HasManyGetAssociationsMixin<Link>;
}

Category.init(
    {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        color: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize: db,
        modelName: "Category",
    }
);

export class Link extends Model {
    id!: number;
    title!: string;
    url!: string;
}

Link.init(
    {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize: db,
        modelName: "Link",
    }
);

Category.hasMany(Link, {
    foreignKey: 'categoryId',
    onDelete: 'CASCADE',
});
Link.belongsTo(Category, {
    foreignKey: 'categoryId',
});

function getDbPath(): string {
    switch (process.env.NODE_ENV) {
        case "test":
            return ":memory:";
        default:
            return join(app.getPath("userData"), "db.sqlite3");
    }
}

export default db;
