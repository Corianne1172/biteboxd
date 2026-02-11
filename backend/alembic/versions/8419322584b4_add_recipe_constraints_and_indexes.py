"""Add recipe constraints and indexes

Revision ID: 8419322584b4
Revises: 8b9d4b45f14b
Create Date: 2025-12-30 13:35:38.888049

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '8419322584b4'
down_revision: Union[str, Sequence[str], None] = '8b9d4b45f14b'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade():
    # ---------- CHECK CONSTRAINTS ----------
    op.create_check_constraint(
        "ck_recipes_rating_range",
        "recipes",
        "(rating IS NULL) OR (rating >= 1 AND rating <= 5)",
    )

    op.create_check_constraint(
        "ck_recipes_macros_nonnegative",
        "recipes",
        "(calories IS NULL OR calories >= 0) AND "
        "(protein_g IS NULL OR protein_g >= 0) AND "
        "(carbs_g IS NULL OR carbs_g >= 0) AND "
        "(fat_g IS NULL OR fat_g >= 0)",
    )

    op.create_check_constraint(
        "ck_recipes_cook_time_nonnegative",
        "recipes",
        "(cook_time IS NULL) OR (cook_time >= 0)",
    )

    # ---------- INDEXES ----------
    # Feed filtering: public + newest
    op.create_index("ix_recipes_is_public", "recipes", ["is_public"])
    op.create_index("ix_recipes_created_at", "recipes", ["created_at"])

    # Owner queries
    op.create_index("ix_recipes_created_by", "recipes", ["created_by"])

    # Common filters
    op.create_index("ix_recipes_cuisine", "recipes", ["cuisine"])
    op.create_index("ix_recipes_rating", "recipes", ["rating"])
    op.create_index("ix_recipes_calories", "recipes", ["calories"])
    op.create_index("ix_recipes_protein_g", "recipes", ["protein_g"])


def downgrade():
    # drop indexes
    op.drop_index("ix_recipes_protein_g", table_name="recipes")
    op.drop_index("ix_recipes_calories", table_name="recipes")
    op.drop_index("ix_recipes_rating", table_name="recipes")
    op.drop_index("ix_recipes_cuisine", table_name="recipes")
    op.drop_index("ix_recipes_created_by", table_name="recipes")
    op.drop_index("ix_recipes_created_at", table_name="recipes")
    op.drop_index("ix_recipes_is_public", table_name="recipes")

    # drop constraints
    op.drop_constraint("ck_recipes_cook_time_nonnegative", "recipes", type_="check")
    op.drop_constraint("ck_recipes_macros_nonnegative", "recipes", type_="check")
    op.drop_constraint("ck_recipes_rating_range", "recipes", type_="check")